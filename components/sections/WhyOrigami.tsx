'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

const benefits = [
  {
    title: 'Fully Customized',
    description: 'Not generic bots. Every agent is built specifically for your business, your workflows, and your goals.',
    icon: '🎯',
  },
  {
    title: 'Secure & Private',
    description: 'Your data stays yours. Private deployments, enterprise-grade security, and full compliance control.',
    icon: '🔒',
  },
  {
    title: 'Easy Integration',
    description: 'Works with your existing tools. CRM, helpdesk, databases — we integrate with what you already use.',
    icon: '🔌',
  },
  {
    title: 'Multilingual & Omnichannel',
    description: 'Deploy on web, WhatsApp, voice, email. Support multiple languages. One agent, everywhere.',
    icon: '🌍',
  },
  {
    title: 'Built for Scale',
    description: 'From SMEs to enterprises. Start small, scale fast. Our agents grow with your business.',
    icon: '📈',
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
            Why The Origami AI
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            We don't just build AI agents. We fold complexity into simplicity.
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
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-heading font-bold mb-3">{benefit.title}</h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

