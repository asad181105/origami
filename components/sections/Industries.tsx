'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const industries = [
  { name: 'Healthcare', description: 'Patient support, appointment scheduling, medical inquiries' },
  { name: 'Real Estate', description: 'Property inquiries, lead qualification, virtual tours' },
  { name: 'E-commerce', description: 'Customer support, order tracking, product recommendations' },
  { name: 'Education', description: 'Student inquiries, enrollment, course information' },
  { name: 'Logistics', description: 'Tracking, delivery updates, customer service' },
  { name: 'Finance', description: 'Account inquiries, transaction support, compliance' },
  { name: 'SMEs', description: 'Multi-purpose agents for growing businesses' },
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
            Industries We Serve
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Custom AI agents for every industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full text-center">
                <h3 className="text-xl font-heading font-bold mb-2">{industry.name}</h3>
                <p className="text-sm text-neutral-600">{industry.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

