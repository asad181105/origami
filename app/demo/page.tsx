'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const agentDemos = [
  {
    id: 'voice-bot',
    name: 'Voice Bot',
    description: 'Experience our intelligent voice agent that handles customer calls with natural conversation flow. Our voice bot can answer queries, schedule appointments, provide support, and handle complex interactions seamlessly across multiple languages.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Natural language understanding',
      'Multi-language support',
      'Real-time call handling',
      'Seamless integration with CRM',
    ],
  },
  {
    id: 'chat-bot',
    name: 'Chat Bot',
    description: 'Meet our conversational AI chat agent that provides instant customer support 24/7. It can handle multiple conversations simultaneously, understand context, and escalate complex issues to human agents when needed.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      '24/7 availability',
      'Context-aware conversations',
      'Multi-channel support',
      'Smart escalation',
    ],
  },
  {
    id: 'crm-management',
    name: 'CRM Management',
    description: 'Watch how our AI agent automates your CRM workflows, from lead qualification to deal closure. It updates records, schedules follow-ups, generates reports, and ensures your sales team never misses an opportunity.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Automated lead qualification',
      'Smart pipeline management',
      'Auto-update records',
      'Predictive analytics',
    ],
  },
  {
    id: 'email-automation',
    name: 'Email Automation',
    description: 'See our email AI agent in action, managing your inbox, prioritizing messages, drafting responses, and ensuring important communications never get missed. It learns your communication style and handles routine emails automatically.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Smart email prioritization',
      'Auto-draft responses',
      'Calendar integration',
      'Sentiment analysis',
    ],
  },
  {
    id: 'hr-recruitment',
    name: 'HR & Recruitment',
    description: 'Discover how our HR agent streamlines recruitment, from screening candidates to scheduling interviews. It can conduct initial assessments, answer candidate questions, and help your HR team focus on high-value tasks.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    features: [
      'Candidate screening',
      'Interview scheduling',
      'Application processing',
      'Onboarding automation',
    ],
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background-light pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Agent Demos
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Explore our collection of AI agents in action. See how they can transform your business workflows.
          </p>
        </motion.div>

        {/* Agent Demos */}
        <div className="space-y-24">
          {agentDemos.map((agent, index) => {
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full"
              >
                <Card className="p-0 overflow-hidden">
                  <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12`}>
                    {/* Description Side */}
                    <div className={`flex-1 p-8 lg:p-12 flex flex-col justify-center ${isEven ? 'lg:pr-0' : 'lg:pl-0'}`}>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                        {agent.name}
                      </h2>
                      <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                        {agent.description}
                      </p>
                      
                      {/* Features */}
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold text-neutral-700 mb-3 uppercase tracking-wide">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {agent.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="w-5 h-5 text-accent-purple-700 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-neutral-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <Button href="/contact" variant="primary" className="w-full lg:w-auto">
                        Contact Us
                      </Button>
                    </div>

                    {/* Video Side */}
                    <div className={`flex-1 ${isEven ? 'lg:pl-0' : 'lg:pr-0'}`}>
                      <div className="relative w-full h-0 pb-[56.25%] bg-neutral-900 rounded-lg overflow-hidden">
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={agent.videoUrl}
                          title={agent.name}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center"
        >
          <Card className="bg-gradient-to-br from-neutral-900 to-black text-white">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready to Build Your Custom AI Agent?
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can create an AI agent tailored to your business needs.
            </p>
            <Button href="/contact" variant="secondary" className="text-lg px-10 py-5">
              Contact Us
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

