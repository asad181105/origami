import WhatWeDo from '@/components/sections/WhatWeDo'
import WhyOrigami from '@/components/sections/WhyOrigami'
import Industries from '@/components/sections/Industries'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'What We Do | The Origami AI',
  description: 'Custom AI agents for every part of your business - sales, support, HR, operations, and more.',
}

export default function WhatWeDoPage() {
  return (
    <div className="pt-20">
      <WhatWeDo />
      <WhyOrigami />
      <Industries />
      <CTASection />
    </div>
  )
}

