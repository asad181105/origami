'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const agents = [
  {
    name: 'AI Customer Support Voice Agent',
    automates: 'Handles customer support calls end-to-end — FAQs, complaints, status checks — in English, Hindi, and regional languages.',
    channels: ['Voice', 'Phone'],
  },
  {
    name: 'AI Lead Qualification Agent',
    automates: 'Calls, qualifies, and tags leads in your CRM so sales only speaks to high-intent prospects.',
    channels: ['Voice', 'CRM'],
  },
  {
    name: 'AI Booking Agent',
    automates: 'Books appointments, service visits, and recurring slots — without needing a human receptionist.',
    channels: ['Voice', 'Phone', 'IVR'],
  },
  {
    name: 'AI Follow-Up Agent',
    automates: 'Automates payment reminders, feedback calls, and renewals, so your team doesn’t have to chase.',
    channels: ['Voice', 'Phone'],
  },
  {
    name: 'AI Collections Agent',
    automates: 'Handles polite, consistent payment collection calls with proper scripting and escalation.',
    channels: ['Voice', 'Phone'],
  },
  {
    name: 'AI Internal Helpdesk Agent',
    automates: 'Answers internal queries from teams (IT, HR, ops) so employees get instant support.',
    channels: ['Voice', 'Internal Lines'],
  },
]

export default function OurAgents() {
  const [primaryAgent, ...comingSoonAgents] = agents

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
            Voice Customer Support Agent
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Start with our production-ready AI Voice Agent for customer care — deployed on your existing phone numbers
            and call flows.
          </p>
        </motion.div>

        {/* Primary agent */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full flex flex-col">
              <h3 className="text-2xl font-heading font-bold mb-3">{primaryAgent.name}</h3>
              <p className="text-neutral-600 mb-4 flex-grow">{primaryAgent.automates}</p>

              <div className="mb-4">
                <p className="text-sm font-semibold text-neutral-700 mb-2">Channels:</p>
                <div className="flex flex-wrap gap-2">
                  {primaryAgent.channels.map((channel, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              <Button href="/contact" variant="primary" className="w-full">
                Talk About Voice Support
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Coming soon agents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
            More AI Agents Coming Soon
          </h3>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We&apos;re actively building specialized agents for sales, operations, collections, and internal workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoonAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
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
                  Coming Soon – Talk to Us
                </Button>
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

