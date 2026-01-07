'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const agents = [
  {
    name: 'Sales Pro Agent',
    automates: 'Lead qualification, meeting scheduling, follow-ups, and deal pipeline management',
    channels: ['Web', 'Email', 'WhatsApp'],
  },
  {
    name: 'Support Hero Agent',
    automates: 'Customer inquiries, ticket routing, FAQ responses, and issue resolution',
    channels: ['Web', 'WhatsApp', 'Voice', 'Email'],
  },
  {
    name: 'HR Recruiter Agent',
    automates: 'Candidate screening, interview scheduling, application processing, and onboarding',
    channels: ['Web', 'Email'],
  },
  {
    name: 'Ops Coordinator Agent',
    automates: 'Task management, workflow coordination, internal queries, and process automation',
    channels: ['Web', 'Email', 'Slack'],
  },
  {
    name: 'WhatsApp Commerce Agent',
    automates: 'Product inquiries, order tracking, customer support, and sales on WhatsApp',
    channels: ['WhatsApp', 'Voice'],
  },
  {
    name: 'Voice Assistant Agent',
    automates: 'Phone-based customer service, appointment booking, and voice interactions',
    channels: ['Voice', 'Phone'],
  },
]

export default function OurAgents() {
  return (
    <section id="agents" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Our Agents
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Pre-built agents ready to customize, or we'll build one from scratch
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <h3 className="text-xl font-heading font-bold mb-3">{agent.name}</h3>
                <p className="text-neutral-600 mb-4 flex-grow">{agent.automates}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-semibold text-neutral-700 mb-2">Channels:</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.channels.map((channel, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                      >
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>

                <Button href="/contact" variant="outline" className="w-full">
                  Contact Us
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

