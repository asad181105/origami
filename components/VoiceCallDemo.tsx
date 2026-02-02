'use client'

import { useState, useEffect, useCallback } from 'react'
import { Room, RoomEvent, RemoteParticipant, LocalParticipant } from 'livekit-client'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function VoiceCallDemo() {
  const [room, setRoom] = useState<Room | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [error, setError] = useState('')

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isConnected])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartCall = async () => {
    setIsConnecting(true)
    setError('')

    try {
      // Check if mediaDevices is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not available in this browser. Please use a modern browser like Chrome, Firefox, or Edge.')
      }

      // Check if we're on HTTPS (required for getUserMedia)
      if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        throw new Error('Microphone access requires HTTPS. Please access this page via HTTPS.')
      }

      // Request microphone access first
      let stream: MediaStream | null = null
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        // Stop the stream immediately - we just needed permission
        stream.getTracks().forEach(track => track.stop())
      } catch (mediaError: any) {
        if (mediaError.name === 'NotAllowedError' || mediaError.name === 'PermissionDeniedError') {
          throw new Error('Microphone access was denied. Please click the microphone icon in your browser\'s address bar and allow microphone access, then try again.')
        } else if (mediaError.name === 'NotFoundError' || mediaError.name === 'DevicesNotFoundError') {
          throw new Error('No microphone found. Please connect a microphone and try again.')
        } else {
          throw new Error(`Microphone access error: ${mediaError.message || mediaError.name}`)
        }
      }

      // Get access token from API
      const tokenResponse = await fetch('/api/livekit/token?room=voice-demo&username=user')
      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json()
        throw new Error(errorData.error || 'Failed to get access token')
      }

      const { token } = await tokenResponse.json()
      const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://voice-demo-abc123.livekit.cloud'

      // Create and connect to room
      const newRoom = new Room({
        adaptiveStream: true,
        dynacast: true,
      })

      await newRoom.connect(wsUrl, token)
      
      console.log('Connected to room:', newRoom.name)
      const remoteParticipantsCount = newRoom.remoteParticipants?.size || 0
      console.log('Remote participants:', remoteParticipantsCount)

      // Explicitly dispatch the agent into the room (required for LiveKit Agents workers)
      try {
        const dispatchRes = await fetch('/api/livekit/dispatch', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ roomName: newRoom.name, agentName: 'Casey-615' }),
        })
        if (!dispatchRes.ok) {
          const data = await dispatchRes.json().catch(() => ({}))
          console.warn('Dispatch failed:', data)
        }
      } catch (e) {
        console.warn('Dispatch request failed:', e)
      }
      
      // Set a timeout to show a helpful message if agent doesn't join
      let agentTimeout: NodeJS.Timeout | null = null
      agentTimeout = setTimeout(() => {
        if (newRoom.remoteParticipants?.size === 0) {
          console.warn('Still waiting for agent... Make sure the Python agent is running with: python agent.py dev')
        }
      }, 5000)

      // Enable microphone and publish audio track
      await newRoom.localParticipant.setMicrophoneEnabled(true)
      
      // Subscribe to all remote audio tracks (if any exist)
      if (newRoom.remoteParticipants) {
        newRoom.remoteParticipants.forEach((participant) => {
          console.log('Subscribing to participant:', participant.identity)
          if (participant.audioTrackPublications) {
            participant.audioTrackPublications.forEach((publication) => {
              if (publication.track) {
                publication.setSubscribed(true)
              } else {
                // Subscribe when track becomes available
                publication.on('subscribed', (track) => {
                  console.log('Track became available:', track.kind)
                })
              }
            })
          }
        })
      }

      // Set up event listeners
      newRoom.on(RoomEvent.Disconnected, () => {
        setIsConnected(false)
        setCallDuration(0)
        setIsMuted(false)
      })

      newRoom.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
        console.log('Participant connected:', participant.identity)
        console.log('Participant kind:', participant.kind)
        const audioTracksCount = participant.audioTrackPublications?.size || 0
        console.log('Audio track publications:', audioTracksCount)

        // Clear any timeout (will be handled by closure)
        
        // Subscribe to all audio tracks from remote participants
        if (participant.audioTrackPublications) {
          participant.audioTrackPublications.forEach((publication) => {
            console.log('Audio publication:', publication.trackSid, 'subscribed:', publication.isSubscribed)
            if (publication.track) {
              publication.setSubscribed(true)
            }
          })
        }
      })

      newRoom.on(RoomEvent.TrackPublished, (publication, participant) => {
        console.log('Track published:', publication.kind, 'from', participant.identity)
        if (publication.kind === 'audio' && participant !== newRoom.localParticipant) {
          publication.setSubscribed(true)
        }
      })

      newRoom.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
        console.log('Track subscribed:', track.kind, 'from', participant.identity)

        if (track.kind === 'audio') {
          const audioElement = document.createElement('audio')
          audioElement.autoplay = true
          audioElement.playsInline = true
          audioElement.muted = false
          audioElement.volume = 1.0
          
          // Add to DOM
          audioElement.style.display = 'none'
          document.body.appendChild(audioElement)
          
          // Attach track
          track.attach(audioElement)
          
          // Force play
          audioElement.play().then(() => {
            console.log('Audio playing successfully')
          }).catch((err) => {
            console.error('Error playing audio:', err)
          })
          
          // Monitor audio element state
          audioElement.addEventListener('playing', () => {
            console.log('Audio element is playing')
          })
          
          audioElement.addEventListener('error', (e) => {
            console.error('Audio element error:', e)
          })
          
          console.log('Audio element created and attached:', audioElement)
          
          // Clean up audio element when track is unsubscribed
          track.on('unsubscribed', () => {
            console.log('Track unsubscribed, cleaning up audio element')
            if (audioElement.parentNode) {
              audioElement.parentNode.removeChild(audioElement)
            }
          })
        }
      })

      // Subscribe to existing tracks when connecting
      if (newRoom.remoteParticipants) {
        newRoom.remoteParticipants.forEach((participant) => {
          if (participant.audioTrackPublications) {
            participant.audioTrackPublications.forEach((publication) => {
              if (publication.track) {
                publication.setSubscribed(true)
              }
            })
          }
        })
      }

      setRoom(newRoom)
      setIsConnected(true)
      setIsMuted(false)
      setIsConnecting(false)
    } catch (err: any) {
      console.error('Connection error:', err)
      setError(err.message || 'Failed to connect. Please check your LiveKit configuration.')
      setIsConnecting(false)
    }
  }

  const handleEndCall = async () => {
    if (room) {
      // Clean up all audio elements
      const audioElements = document.querySelectorAll('audio')
      audioElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
      
      await room.disconnect()
      setRoom(null)
      setIsConnected(false)
      setCallDuration(0)
    }
  }

  const handleToggleMute = async () => {
    if (room && room.localParticipant) {
      try {
        await room.localParticipant.setMicrophoneEnabled(isMuted)
        setIsMuted(!isMuted)
      } catch (err) {
        console.error('Failed to toggle mute:', err)
        setError('Failed to toggle microphone. Please try again.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Voice Agent Demo</h1>
            <p className="text-neutral-600">Experience our AI voice agent in a live call</p>
          </div>

          {/* Phone Display */}
          <div className="mb-8">
            <div className="bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-8 text-white">
              {!isConnected ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-medium mb-2">Origami AI Voice Agent</p>
                  <p className="text-neutral-400 text-sm">Ready to connect</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center relative z-10">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xl font-medium mb-2">Connected</p>
                  <p className="text-2xl font-mono font-bold mb-1">{formatDuration(callDuration)}</p>
                  <p className="text-neutral-400 text-sm">Talking with AI Agent</p>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <p className="font-semibold mb-2">Error: {error}</p>
              {error.includes('Microphone access') && (
                <div className="mt-3 text-xs space-y-1">
                  <p className="font-semibold">How to fix:</p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Look for the microphone icon in your browser's address bar</li>
                    <li>Click it and select "Allow" for microphone access</li>
                    <li>Refresh the page and try again</li>
                    <li>If you don't see the icon, check your browser's site settings</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="space-y-4">
            {!isConnected ? (
              <Button
                onClick={handleStartCall}
                variant="primary"
                className="w-full py-4 text-lg"
                disabled={isConnecting}
              >
                {isConnecting ? 'Connecting...' : 'Start Call'}
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  onClick={handleToggleMute}
                  variant={isMuted ? 'primary' : 'outline'}
                  className="flex-1 py-4"
                >
                  {isMuted ? (
                    <>
                      <svg
                        className="w-5 h-5 inline mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                      Unmute
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 inline mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      Mute
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleEndCall}
                  variant="primary"
                  className="flex-1 py-4 bg-red-600 hover:bg-red-700"
                >
                  <svg
                    className="w-5 h-5 inline mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M16 16l2 2m0 0l2 2m-2-2l-2 2m2-2l-2-2"
                    />
                  </svg>
                  End Call
                </Button>
              </div>
            )}

            <Button href="/demo" variant="outline" className="w-full">
              Back to Demos
            </Button>
          </div>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 text-center">
              This is a live demo of our AI voice agent. Speak naturally and the agent will respond
              in real-time.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

