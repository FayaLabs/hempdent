import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Moon, Activity, Brain, Bone } from 'lucide-react'

const CONDS = [
  { icon: Moon, title: 'Insônia', desc: 'Dificuldade para iniciar ou manter o sono.' },
  { icon: Activity, title: 'Dor crônica', desc: 'Dores orofaciais e disfunções persistentes.' },
  { icon: Brain, title: 'Ansiedade', desc: 'Tensão que impacta sono, foco e qualidade de vida.' },
  { icon: Bone, title: 'Bruxismo & ATM', desc: 'Apertamento, ranger de dentes e dor na articulação.' },
]

export default function Conditions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="condicoes" className="bg-hemp-200/60 py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Quando pode ajudar</p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
              Condições avaliadas em consulta
            </h2>
          </div>
          <p className="max-w-[34ch] text-muted-foreground">
            Cada caso é único. A indicação é sempre individual e baseada em avaliação clínica.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONDS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3.5 rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-200 ease-brand hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-pine-100 text-pine-700">
                <Icon className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-pine-900">{title}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
