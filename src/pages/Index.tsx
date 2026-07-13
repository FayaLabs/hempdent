import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Benefits from '@/components/sections/Benefits'
import Blog from '@/components/sections/Blog'
import SocialProof from '@/components/sections/SocialProof'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Blog />
        <SocialProof />
      </main>
      <Footer />
    </div>
  )
}

export default Index
