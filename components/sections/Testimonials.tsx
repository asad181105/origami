'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

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
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent-purple-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
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
      </div>
    </section>
  )
}

