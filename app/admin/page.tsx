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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [submissions, setSubmissions] = useState<Submission[]>([])
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
        // Store auth in sessionStorage
        sessionStorage.setItem('adminAuth', password)
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

  useEffect(() => {
    // Check if already authenticated
    const savedAuth = sessionStorage.getItem('adminAuth')
    if (savedAuth) {
      setPassword(savedAuth)
      setIsAuthenticated(true)
      fetchSubmissions()
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
  }

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
            <p className="text-neutral-600">Contact form submissions</p>
          </div>
          <div className="flex gap-4 items-center">
            <Button onClick={fetchSubmissions} variant="outline" disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
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

        {/* Submissions Table */}
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
      </div>
    </div>
  )
}

