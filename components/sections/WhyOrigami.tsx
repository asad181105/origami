'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const benefits = [
  {
    title: 'No Tech Knowledge Required',
    description: "You don't need a data science team. We handle the AI, setup, and integrations end-to-end for you.",
  },
  {
    title: 'Works for Any Size of Business',
    description:
      'From small local services to fast-growing startups and large enterprises, AI voice agents adapt to your volume.',
  },
  {
    title: 'Set Up in Days, Not Months',
    description:
      'Most customers see their first AI voice agent live in days, not the months traditional call center setups take.',
  },
  {
    title: 'AI Adapts to Your Process',
    description:
      'We adapt the AI to your scripts, workflows, and tools so you do not have to rebuild your operations.',
  },
  {
    title: 'Human + AI, Not Human vs AI',
    description:
      'Agents escalate complex calls to your team with full context, so your people stay in control of customer relationships.',
  },
]

export default function WhyOrigami() {
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
            Think AI Isn&apos;t Useful for Your Business? Think Again.
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Origami AI makes AI voice agents practical for real-world businesses in India without extra complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
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

