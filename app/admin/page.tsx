'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Submission {
  id: string
  name: string
  designation: string
  company: string
  email: string
  phone: string | null
  requirement: string
  created_at: string
}

interface Review {
  id: string
  user_id: string | null
  user_email: string | null
  user_name: string | null
  rating: number
  review_text: string
  created_at: string
}

type TabType = 'submissions' | 'reviews'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeTab, setActiveTab] = useState<TabType>('submissions')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
        setIsAuthenticated(true)
        sessionStorage.setItem('adminAuth', password)
        // Also fetch reviews
        fetchReviews(password)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Failed to authenticate')
    } finally {
      setLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    const authPassword = sessionStorage.getItem('adminAuth') || password

    try {
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${authPassword}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      } else if (response.status === 401) {
        setIsAuthenticated(false)
        sessionStorage.removeItem('adminAuth')
      }
    } catch (err) {
      setError('Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async (authPassword?: string) => {
    const pw = authPassword || sessionStorage.getItem('adminAuth') || password
    try {
      const response = await fetch('/api/admin/reviews', {
        headers: {
          'Authorization': `Bearer ${pw}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews)
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err)
    }
  }

  const refreshAll = async () => {
    setLoading(true)
    await Promise.all([fetchSubmissions(), fetchReviews()])
    setLoading(false)
  }

  useEffect(() => {
    // Check if already authenticated
    const savedAuth = sessionStorage.getItem('adminAuth')
    if (savedAuth) {
      setPassword(savedAuth)
      setIsAuthenticated(true)
      fetchSubmissions()
      fetchReviews(savedAuth)
    }
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
    sessionStorage.removeItem('adminAuth')
    setSubmissions([])
    setReviews([])
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        ))}
      </div>
    )
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0'

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background-light pt-32 pb-16 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Admin Login</h1>
              <p className="text-neutral-600">Enter password to access the dashboard</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-light pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">Manage submissions and reviews</p>
          </div>
          <div className="flex gap-4 items-center">
            <Button onClick={refreshAll} variant="outline" disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'submissions'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Submissions ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Stats */}
        {activeTab === 'submissions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Total Submissions</p>
                <p className="text-3xl font-bold">{submissions.length}</p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">This Month</p>
                <p className="text-3xl font-bold">
                  {submissions.filter((s) => {
                    const date = new Date(s.created_at)
                    const now = new Date()
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">With Phone</p>
                <p className="text-3xl font-bold">
                  {submissions.filter((s) => s.phone).length}
                </p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Total Reviews</p>
                <p className="text-3xl font-bold">{reviews.length}</p>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold">{avgRating}</p>
                  <svg className="w-6 h-6 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <p className="text-sm text-neutral-600 mb-1">5 Star Reviews</p>
                <p className="text-3xl font-bold">
                  {reviews.filter((r) => r.rating === 5).length}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Content */}
        {activeTab === 'submissions' && (
          <>
            {submissions.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-neutral-600">No submissions yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-heading font-bold mb-1">
                                {submission.name}
                              </h3>
                              <p className="text-neutral-600">{submission.designation}</p>
                            </div>
                            <span className="text-sm text-neutral-500">
                              {formatDate(submission.created_at)}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-neutral-500 mb-1">Company</p>
                              <p className="font-medium">{submission.company}</p>
                            </div>
                            <div>
                              <p className="text-neutral-500 mb-1">Email</p>
                              <a
                                href={`mailto:${submission.email}`}
                                className="font-medium text-accent-purple-700 hover:underline"
                              >
                                {submission.email}
                              </a>
                            </div>
                            {submission.phone && (
                              <div>
                                <p className="text-neutral-500 mb-1">Phone</p>
                                <a
                                  href={`tel:${submission.phone}`}
                                  className="font-medium text-accent-purple-700 hover:underline"
                                >
                                  {submission.phone}
                                </a>
                              </div>
                            )}
                          </div>

                          <div>
                            <p className="text-neutral-500 mb-1">Requirement</p>
                            <p className="text-neutral-700 whitespace-pre-wrap">
                              {submission.requirement}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            {reviews.length === 0 ? (
              <Card className="text-center py-12">
                <p className="text-neutral-600">No reviews yet</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-heading font-bold mb-1">
                            {review.user_name || 'Anonymous'}
                          </h3>
                          {review.user_email && (
                            <p className="text-sm text-neutral-500">{review.user_email}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="mb-1">{renderStars(review.rating)}</div>
                          <span className="text-sm text-neutral-500">
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                      </div>
                      <p className="text-neutral-700 whitespace-pre-wrap">{review.review_text}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

