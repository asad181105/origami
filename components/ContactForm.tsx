'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { WHATSAPP_NUMBER } from '@/lib/constants'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    useCase: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Format message for WhatsApp
    const message = `Hello! I'm interested in The Origami AI.\n\n` +
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Email: ${formData.email}\n` +
      `Use Case: ${formData.useCase}\n\n` +
      `I'd like to learn more about how AI agents can help my business.`
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    
    setIsSubmitting(false)
    setSubmitted(true)
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
        <h2 className="text-2xl font-heading font-bold mb-2">Redirecting to WhatsApp!</h2>
        <p className="text-neutral-600 mb-6">
          We've opened WhatsApp for you. If it didn't open, please click the button below to chat with us.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="primary">
            Open WhatsApp
          </Button>
          <Button href="/" variant="outline">
            Back to Home
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label htmlFor="useCase" className="block text-sm font-medium text-neutral-700 mb-2">
            Use Case *
          </label>
          <select
            id="useCase"
            name="useCase"
            required
            value={formData.useCase}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
          >
            <option value="">Select a use case</option>
            <option value="customer-support">Customer Support</option>
            <option value="sales">Sales & Lead Qualification</option>
            <option value="hr">HR & Recruitment</option>
            <option value="operations">Operations & Workflows</option>
            <option value="whatsapp">WhatsApp Agent</option>
            <option value="voice">Voice Agent</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            {isSubmitting ? 'Opening WhatsApp...' : 'Continue on WhatsApp'}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-neutral-500 mb-3">
            Or chat with us directly on WhatsApp
          </p>
          <Button href={`https://wa.me/${WHATSAPP_NUMBER}`} variant="secondary" className="w-full">
            Chat on WhatsApp Now
          </Button>
        </div>
      </form>
    </Card>
  )
}

