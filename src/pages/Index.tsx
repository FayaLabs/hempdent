import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import HowItWorks from '@/components/sections/HowItWorks'
import Conditions from '@/components/sections/Conditions'
import Doctor from '@/components/sections/Doctor'
import SocialProof from '@/components/sections/SocialProof'
import Pricing from '@/components/sections/Pricing'
import Blog from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Conditions />
        <Doctor />
        <SocialProof />
        <Pricing />
        <Blog />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default Index
