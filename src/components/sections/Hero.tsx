import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CalendarCheck, Star } from 'lucide-react'
import { AGENDA_URL } from '@/lib/links'

// Dummy patient avatars (random users) for the hero social-proof row.
const PATIENT_AVATARS = [
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-dr-hiago-2.png"
          alt="Dr. Hiago Benevenutti — Cirurgião-Dentista especialista em Cannabis Medicinal"
          className="h-full w-full object-cover object-center"
        />
        {/* Gradient overlay — stronger on left for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d5a3d]/85 via-[#2d5a3d]/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white mb-6"
          >
            <Star className="h-3 w-3 fill-white text-white" />
            Cannabis Medicinal com excelência · CRO-SP 166513
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl font-bold leading-tight text-white mb-5"
          >
            Saúde bucal com o poder da{' '}
            <span className="text-green-200">cannabis medicinal</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/85 text-lg leading-relaxed mb-8"
          >
            Dr. Hiago Benevenutti oferece consultas canábicas online com abordagem humanizada, 
            ciência de ponta e o cuidado que você merece.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary font-semibold hover:bg-green-50 shadow-xl px-8 gap-2">
                <CalendarCheck className="h-5 w-5" />
                Agendar Consulta — R$ 220
              </Button>
            </a>
            <a href="#beneficios">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/60 px-8">
                Conhecer os benefícios
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {PATIENT_AVATARS.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <p className="text-white/80 text-xs mt-0.5">+123 pacientes satisfeitos · nota 4.8</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
