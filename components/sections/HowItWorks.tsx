'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const steps = [
  {
    number: '01',
    title: 'Understand Your Workflow',
    description:
      'We map your customer journey, call flows, and tools so the AI voice agent fits into your existing process.',
  },
  {
    number: '02',
    title: 'Build & Train Your AI Agent',
    description:
      'We design, configure, and train your AI voice agent on your scripts, FAQs, and data and connect it to your systems.',
  },
  {
    number: '03',
    title: 'Deploy, Monitor & Scale',
    description:
      'We go live on your phone numbers, monitor performance, refine conversations, and help you scale to thousands of calls.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            How Origami AI Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            A simple 3-step process to launch AI voice agents for your customer care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full relative">
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent-purple-800 to-accent-purple-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {step.number}
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{step.description}</p>
                </div>
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

