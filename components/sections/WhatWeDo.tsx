'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { useState } from 'react'

const useCases = [
  {
    title: 'AI Sales Agents',
    description: 'Qualify leads, schedule meetings, and close deals automatically. Your sales team focuses on what matters.',
    icon: '💼',
  },
  {
    title: 'AI Support Agents',
    description: 'Handle customer inquiries 24/7 across all channels. Resolve issues faster, improve satisfaction.',
    icon: '🤝',
  },
  {
    title: 'AI HR Agents',
    description: 'Screen candidates, schedule interviews, answer employee questions. Streamline your hiring process.',
    icon: '👥',
  },
  {
    title: 'AI Ops Agents',
    description: 'Automate internal workflows, manage tasks, coordinate teams. Reduce manual work, increase efficiency.',
    icon: '⚙️',
  },
  {
    title: 'WhatsApp & Voice Agents',
    description: 'Deploy AI agents on WhatsApp, voice calls, and messaging platforms. Meet customers where they are.',
    icon: '📱',
  },
]

export default function WhatWeDo() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            What We Do
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Custom AI agents for every part of your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                hover={false}
                className={`h-full transition-all duration-300 ${
                  hoveredIndex === index ? 'bg-gradient-to-br from-neutral-50 to-white' : ''
                }`}
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-heading font-bold mb-3">{useCase.title}</h3>
                <motion.p
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.7,
                  }}
                  className="text-neutral-600"
                >
                  {useCase.description}
                </motion.p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

