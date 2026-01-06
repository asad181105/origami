import HowItWorks from '@/components/sections/HowItWorks'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'How It Works | The Origami AI',
  description: 'Three simple steps to transform your business with custom AI agents.',
}

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      <HowItWorks />
      <CTASection />
    </div>
  )
}

