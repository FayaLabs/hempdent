import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { AGENDA_URL } from '@/lib/links'

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div
        className={`font-heading text-3xl font-extrabold tracking-tight ${
          accent ? 'text-primary' : 'text-pine-900'
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-[13px] font-medium text-muted-foreground">{label}</div>
    </div>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Resin glow blob */}
      <div className="pointer-events-none absolute -right-32 -top-44 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,theme(colors.resin.100),transparent_70%)]" />

      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 md:pb-24 md:pt-36 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="eyebrow"
          >
            Cannabis medicinal · Odontologia integrativa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="mt-4 text-[clamp(2.75rem,1.5rem+5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-pine-900"
          >
            Sua consulta canábica,{' '}
            <span className="text-primary">do conforto de casa.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mt-6 max-w-[42ch] text-lg leading-relaxed text-ink-700"
          >
            Avaliação, orientação de prescrição e acompanhamento com o Dr. Hiago
            Benevenutti — em 30 minutos, 100% online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="accent" size="lg">
                Agendar consulta
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <a href="#como">
              <Button variant="outline" size="lg">
                Como funciona
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="mt-9 flex flex-wrap gap-x-10 gap-y-5"
          >
            <Stat value="+2.500" label="Pacientes atendidos" accent />
            <Stat value="30 min" label="Duração da consulta" />
            <Stat value="R$ 220" label="Valor único" />
          </motion.div>
        </div>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl max-lg:aspect-[16/11]"
        >
          <img
            src="/images/hero-dr-hiago.png"
            alt="Dr. Hiago Benevenutti em teleconsulta"
            className="h-full w-full object-cover object-[85%_center]"
          />
          <div className="absolute inset-x-[18px] bottom-[18px] flex items-center gap-3.5 rounded-2xl bg-pine-900/75 px-4 py-3.5 text-hemp-50 backdrop-blur-md">
            <ShieldCheck className="h-6 w-6 flex-none text-resin-400" />
            <div>
              <div className="text-[15px] font-bold leading-tight">Dr. Hiago Benevenutti</div>
              <div className="text-[13px] text-hemp-200">CRO-SP 166513 · Odontologia integrativa</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
