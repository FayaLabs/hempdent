import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const STEPS = [
  ['Agende online', 'Escolha o motivo e um horário disponível. Confirmação imediata.'],
  ['Consulta por vídeo', '30 minutos com o Dr. Hiago para avaliar seu caso com calma.'],
  ['Prescrição & acompanhamento', 'Você recebe orientação de prescrição e segue com suporte.'],
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="como" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <p className="eyebrow">Como funciona</p>
        <h2 className="mt-4 mb-10 max-w-[18ch] text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
          Do agendamento ao tratamento, sem burocracia.
        </h2>

        <div ref={ref} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(([title, desc], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-resin-500 font-heading text-[15px] font-extrabold text-pine-900">
                {'0' + (i + 1)}
              </div>
              <h3 className="mb-2 text-xl font-bold text-pine-900">{title}</h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
