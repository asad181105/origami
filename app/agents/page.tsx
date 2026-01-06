import OurAgents from '@/components/sections/OurAgents'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Our Agents | The Origami AI',
  description: 'Explore our pre-built AI agents or request a custom agent for your business needs.',
}

export default function AgentsPage() {
  return (
    <div className="pt-20">
      <OurAgents />
      <CTASection />
    </div>
  )
}

