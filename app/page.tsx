import Hero from '@/components/sections/Hero'
import ProblemSolution from '@/components/sections/ProblemSolution'
import WhatWeDo from '@/components/sections/WhatWeDo'
import HowItWorks from '@/components/sections/HowItWorks'
import OurAgents from '@/components/sections/OurAgents'
import WhyOrigami from '@/components/sections/WhyOrigami'
import Industries from '@/components/sections/Industries'
import AnalyticsInsights from '@/components/sections/AnalyticsInsights'
import CTASection from '@/components/sections/CTASection'
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <WhatWeDo />
      <HowItWorks />
      <OurAgents />
      <WhyOrigami />
      <Industries />
      <AnalyticsInsights />
      <Testimonials />
      <CTASection />
    </>
  )
}

