'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const useCases = [
  {
    title: 'AI Customer Support Agent',
    description:
      'Handles FAQs, complaints, and basic queries so your human team can focus on complex issues — not repetitive calls.',
  },
  {
    title: 'AI Lead Qualification Agent',
    description:
      'Calls leads, asks qualifying questions, tags them in your system, and hands over only high-intent leads to sales.',
  },
  {
    title: 'AI Booking Agent',
    description:
      'Manages appointments, gas bookings, maintenance visits, and more — available 24/7 in multiple Indian languages.',
  },
  {
    title: 'AI Follow-Up Agent',
    description:
      'Automates payment reminders, feedback calls, renewals, and follow-ups so nothing slips through the cracks.',
  },
]

export default function WhatWeDo() {

  return (
    <section id="what-we-do" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            AI Agents Built for Every Customer Interaction
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            From first call to final follow-up, Origami AI builds voice agents for every step of your customer journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                hover={false}
                className="h-full transition-all duration-300 bg-gradient-to-br from-neutral-50 to-white"
              >
                <h3 className="text-xl font-heading font-bold mb-3">{useCase.title}</h3>
                <p className="text-neutral-600">
                  {useCase.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/demo" variant="primary" className="px-8 py-3">
            Demo
          </Button>
          <Button href="/contact" variant="outline" className="px-8 py-3">
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

