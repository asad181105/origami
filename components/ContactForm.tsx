'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    email: '',
    phone: '',
    requirement: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      console.error('Form submission error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <Card className="text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl font-heading font-bold mb-2">Thank You!</h2>
        <p className="text-neutral-600 mb-6">
          We've received your message and will get back to you soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/demo" variant="outline">
            View Demos
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-neutral-700 mb-2">
            Designation *
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            placeholder="CEO, Manager, etc."
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            placeholder="Your Company"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            placeholder="john@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label htmlFor="requirement" className="block text-sm font-medium text-neutral-700 mb-2">
            Requirement *
          </label>
          <textarea
            id="requirement"
            name="requirement"
            required
            value={formData.requirement}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your requirements and how we can help..."
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

