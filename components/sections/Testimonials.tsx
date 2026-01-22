'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const testimonials = [
  {
    quote: 'The Origami AI transformed our customer support. Response times dropped by 80%, and our team can focus on complex issues.',
    author: 'Sarah Chen',
    role: 'Head of Operations',
    company: 'TechFlow Inc.',
  },
  {
    quote: 'Our sales agent handles lead qualification perfectly. We closed 40% more deals in the first quarter after deployment.',
    author: 'Michael Rodriguez',
    role: 'Sales Director',
    company: 'GrowthCo',
  },
  {
    quote: 'Custom-built for our workflow, not a generic solution. The Origami AI team understood our needs from day one.',
    author: 'Emma Thompson',
    role: 'CEO',
    company: 'StartupHub',
  },
]

export default function Testimonials() {
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
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <p className="text-neutral-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-neutral-900">{testimonial.author}</p>
                  <p className="text-sm text-neutral-600">{testimonial.role}, {testimonial.company}</p>
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

