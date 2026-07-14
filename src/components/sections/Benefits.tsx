import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Zap, Heart, Moon, Smile, Leaf } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Ação anti-inflamatória',
    description:
      'Os canabinoides reduzem inflamações gengivais e pós-operatórias com eficácia comprovada clinicamente.',
  },
  {
    icon: Zap,
    title: 'Alívio da dor',
    description:
      'CBD e outros compostos agem no sistema endocanabinoide para controle natural da dor orofacial crônica.',
  },
  {
    icon: Heart,
    title: 'Saúde periodontal',
    description:
      'Estudos demonstram melhora significativa em casos de periodontite com uso de canabinoides tópicos.',
  },
  {
    icon: Moon,
    title: 'Bruxismo e ansiedade',
    description:
      'O tratamento canábico auxilia no relaxamento muscular e reduz o impacto do bruxismo durante o sono.',
  },
  {
    icon: Smile,
    title: 'Pós-operatório humanizado',
    description:
      'Recuperações mais confortáveis com menor necessidade de analgésicos convencionais e opioides.',
  },
  {
    icon: Leaf,
    title: 'Tratamento integrativo',
    description:
      'Abordagem que une odontologia convencional e medicina canábica para resultados mais completos.',
  },
]

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = benefit.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group rounded-2xl border border-border bg-card p-6 transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-warm"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-pine-100 text-pine-700">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-pine-900">{benefit.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
    </motion.div>
  )
}

export default function Benefits() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="beneficios" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow">Benefícios do tratamento</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
            O que a cannabis medicinal pode fazer pela sua saúde
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Uma abordagem que une ciência e cuidado para transformar a sua experiência odontológica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
