'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const points = [
  {
    title: 'English',
    description: 'Fluent, natural-sounding conversations for modern, urban customers and global teams.',
  },
  {
    title: 'Hindi',
    description: 'Serve the largest segment of Indian customers with native Hindi support.',
  },
  {
    title: 'Regional Languages',
    description: 'Support for Telugu, Tamil, Kannada, Marathi, Gujarati, Bengali, Urdu and more (based on your needs).',
  },
  {
    title: 'Mixed-Language Calls',
    description: 'Handle code-switching between English, Hindi, and regional languages in the same call.',
  },
]

export default function Industries() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Built for India. Ready for the World.
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            AI voice agents that understand your customers in the languages they actually speak.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full text-center">
                <h3 className="text-xl font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
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

