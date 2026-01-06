'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const steps = [
  {
    number: '01',
    title: 'Understand Your Workflow',
    description: 'We dive deep into your business processes, pain points, and goals. No generic solutions — we build for your specific needs.',
  },
  {
    number: '02',
    title: 'Design & Fold a Custom AI Agent',
    description: 'Our team designs and develops your AI agent, trained on your data and integrated with your existing tools. Like origami, we fold complexity into simplicity.',
  },
  {
    number: '03',
    title: 'Deploy, Integrate & Scale',
    description: 'We deploy your agent, integrate it seamlessly with your systems, and help you scale. Ongoing support ensures it keeps getting better.',
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
            How It Works
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Three simple steps to transform your business
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
      </div>
    </section>
  )
}

