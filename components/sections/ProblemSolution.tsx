'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function ProblemSolution() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Customer Support Is Expensive, Slow &amp; Hard to Scale
          </h2>
          <p className="text-neutral-600 mb-6">
            Most businesses struggle to keep up with rising customer expectations while managing costs.
          </p>

          <Card className="space-y-3">
            <ul className="space-y-2 text-neutral-700">
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple-700" />
                <span>Missed calls = lost customers</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple-700" />
                <span>High hiring &amp; training costs</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple-700" />
                <span>Inconsistent customer experience</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-accent-purple-700" />
                <span>24/7 support is impractical for most teams</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="h-full bg-neutral-50">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Origami AI Voice Agents: Your Always-On Support Team
            </h3>
            <p className="text-neutral-700 mb-4">
              Origami AI Voice Agents handle unlimited calls, instantly, 24/7 — in multiple Indian languages.
            </p>
            <p className="text-neutral-700 mb-4">
              They can answer questions, route calls, book appointments, qualify leads, and follow up automatically —
              while your human team focuses on high-value conversations.
            </p>
            <p className="text-neutral-600">
              No more missed calls, long wait times, or stressed support teams. Just consistent, reliable customer care
              at scale.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Section CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button href="/demo" variant="primary" className="px-8 py-3">
          Demo
        </Button>
        <Button href="/contact" variant="outline" className="px-8 py-3">
          Contact Us
        </Button>
      </motion.div>
    </section>
  )
}


