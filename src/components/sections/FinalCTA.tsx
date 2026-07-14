import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AGENDA_URL } from '@/lib/links'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contato" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-resin-500 p-[clamp(2.5rem,5vw,4.5rem)] text-center"
        >
          <h2 className="text-[clamp(2rem,1.4rem+2.5vw,3.4rem)] leading-[1.05] text-pine-900">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-3.5 max-w-[46ch] text-[17px] text-pine-800">
            Agende sua consulta canábica e dê o primeiro passo com acompanhamento profissional.
          </p>
          <div className="mt-7 flex justify-center">
            <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-pine-900 text-hemp-50 shadow-lift hover:bg-pine-800"
              >
                Agendar consulta · R$ 220
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
