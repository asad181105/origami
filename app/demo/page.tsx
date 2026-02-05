'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { useElevenLabs } from '@/components/ElevenLabsWidget'
import { useAuth } from '@/components/AuthProvider'
import { useDemoUsage } from '@/lib/useDemoUsage'

const agentDemos = [
  {
    id: 'voice-bot',
    name: 'Voice Bot',
    description: 'Experience our intelligent voice agent that handles customer calls with natural conversation flow. Our voice bot can answer queries, schedule appointments, provide support, and handle complex interactions seamlessly across multiple languages.',
    videoUrl: null,
    features: [
      'Natural language understanding',
      'Multi-language support',
      'Real-time call handling',
      'Seamless integration with CRM',
    ],
  },
  {
    id: 'chat-bot',
    name: 'Chat Bot',
    description: 'Meet our conversational AI chat agent that provides instant customer support 24/7. It can handle multiple conversations simultaneously, understand context, and escalate complex issues to human agents when needed.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      '24/7 availability',
      'Context-aware conversations',
      'Multi-channel support',
      'Smart escalation',
    ],
  },
  {
    id: 'crm-management',
    name: 'CRM Management',
    description: 'Watch how our AI agent automates your CRM workflows, from lead qualification to deal closure. It updates records, schedules follow-ups, generates reports, and ensures your sales team never misses an opportunity.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Automated lead qualification',
      'Smart pipeline management',
      'Auto-update records',
      'Predictive analytics',
    ],
  },
  {
    id: 'email-automation',
    name: 'Email Automation',
    description: 'See our email AI agent in action, managing your inbox, prioritizing messages, drafting responses, and ensuring important communications never get missed. It learns your communication style and handles routine emails automatically.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Smart email prioritization',
      'Auto-draft responses',
      'Calendar integration',
      'Sentiment analysis',
    ],
  },
  {
    id: 'hr-recruitment',
    name: 'HR & Recruitment',
    description: 'Discover how our HR agent streamlines recruitment, from screening candidates to scheduling interviews. It can conduct initial assessments, answer candidate questions, and help your HR team focus on high-value tasks.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Candidate screening',
      'Interview scheduling',
      'Application processing',
      'Onboarding automation',
    ],
  },
]

export default function DemoPage() {
  const elevenLabs = useElevenLabs()
  const { user, loading: authLoading } = useAuth()
  const { canUse, remaining, loading: usageLoading, recordUsage, refresh } = useDemoUsage(!!user)
  const usageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleOpenDemo = () => {
    if (!canUse) return
    elevenLabs?.openWidget()
    // Track usage every 15 seconds
    usageIntervalRef.current = setInterval(async () => {
      const stillCanUse = await recordUsage(15)
      if (!stillCanUse) {
        if (usageIntervalRef.current) {
          clearInterval(usageIntervalRef.current)
          usageIntervalRef.current = null
        }
        elevenLabs?.closeWidget()
      }
    }, 15000)
  }

  useEffect(() => {
    return () => {
      if (usageIntervalRef.current) clearInterval(usageIntervalRef.current)
    }
  }, [])

  const showDemoButton = user && canUse
  const isLoggedIn = !!user

  return (
    <div className="min-h-screen bg-background-light pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Agent Demos
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our collection of AI agents in action. See how they can transform your business workflows.
          </p>
        </motion.div>

        {/* Agent Demos */}
        <div className="space-y-24">
          {agentDemos.map((agent, index) => {
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="p-0 overflow-hidden">
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12`}>
                    {/* Description Side */}
                    <div className={`flex-1 p-8 lg:p-12 flex flex-col justify-center ${isEven ? 'lg:pr-0' : 'lg:pl-0'}`}>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        {agent.name}
                      </h2>
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                        {agent.description}
                      </p>
                      
                      {/* Features */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {agent.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-accent-purple-700 mr-2 mt-0.5 flex-shrink-0"
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
                              <span className="text-neutral-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        {agent.id !== 'voice-bot' && (
                          <Button href="/contact" variant="primary" className="w-full lg:w-auto">
                            Try Now
                          </Button>
                        )}
                        <Button href="/contact" variant="outline" className="w-full lg:w-auto">
                          Contact Us
                        </Button>
                      </div>
                    </div>

                    {/* Video / Demo Side */}
                    <div className={`flex-1 ${isEven ? 'lg:pl-0' : 'lg:pr-0'}`}>
                      {agent.id === 'voice-bot' ? (
                        <div className="rounded-lg overflow-hidden relative w-full min-h-[320px] bg-neutral-900 flex flex-col items-center justify-center gap-4 p-6">
                          {authLoading || (isLoggedIn && usageLoading) ? (
                            <p className="text-neutral-500">Loading...</p>
                          ) : !isLoggedIn ? (
                            <>
                              <p className="text-neutral-400 text-center">Sign in to try the voice demo</p>
                              <Button href="/login" variant="primary">Sign in with Google</Button>
                            </>
                          ) : !canUse ? (
                            <p className="text-neutral-500 text-center">Demo limit reached (2 min per account)</p>
                          ) : (
                            <p className="text-neutral-400 text-center">
                              Use the Talk to AI button • {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, '0')} left
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full min-h-[320px] bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden">
                          <p className="text-2xl font-semibold text-neutral-500 uppercase tracking-widest">
                            Coming Soon
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="bg-gradient-to-br from-neutral-900 to-black text-white">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Build Your Custom AI Agent?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create an AI agent tailored to your business needs.
            </p>
            <Button href="/contact" variant="secondary" className="text-lg px-10 py-5">
              Contact Us
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Talk to AI floating button - only when logged in and has demo time */}
      {showDemoButton && (
      <button
        type="button"
        onClick={handleOpenDemo}
        aria-label="Talk to AI"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          borderRadius: '50%',
          padding: '14px 16px',
          background: '#111',
          color: 'white',
          cursor: 'pointer',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>
      )}
    </div>
  )
}

