'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const points = [
  {
    title: 'Call Recordings',
    description: 'Listen to any call to understand exactly how customers interact with your AI voice agent.',
  },
  {
    title: 'AI Call Summaries',
    description: 'Get crisp summaries of every conversation without scrubbing through long recordings.',
  },
  {
    title: 'Call Classification',
    description: 'Automatically tag calls by intent such as support, sales, complaints, renewals, and feedback.',
  },
  {
    title: 'Customer Intent Detection',
    description: 'See why customers are calling and what they care about most, in real time.',
  },
  {
    title: 'Performance Dashboards',
    description: 'Monitor volumes, resolution rates, call outcomes, and agent performance from a single view.',
  },
]

export default function AnalyticsInsights() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Every Call. Every Insight.
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Go beyond automation with analytics that show you exactly what customers are saying and how your AI is
            performing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <h3 className="text-xl font-heading font-bold mb-3">{point.title}</h3>
                <p className="text-neutral-600">{point.description}</p>
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


