import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Zap, Heart, Moon, Smile, Leaf } from 'lucide-react'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Ação Anti-inflamatória',
    description: 'Os canabinoides reduzem inflamações gengivais e pós-operatórias com eficácia comprovada clinicamente.',
  },
  {
    icon: Zap,
    title: 'Alívio da Dor',
    description: 'CBD e outros compostos agem no sistema endocanabinoide para controle natural da dor orofacial crônica.',
  },
  {
    icon: Heart,
    title: 'Saúde Periodontal',
    description: 'Estudos demonstram melhora significativa em casos de periodontite com uso de canabinoides tópicos.',
  },
  {
    icon: Moon,
    title: 'Bruxismo e Ansiedade',
    description: 'O tratamento canábico auxilia no relaxamento muscular e reduz o impacto do bruxismo durante o sono.',
  },
  {
    icon: Smile,
    title: 'Pós-operatório Humanizado',
    description: 'Recuperações mais confortáveis com menor necessidade de analgésicos convencionais e opioides.',
  },
  {
    icon: Leaf,
    title: 'Tratamento Integrativo',
    description: 'Abordagem que une odontologia convencional e medicina canábica para resultados mais completos.',
  },
]

function BenefitCard({ benefit, index }: { benefit: typeof benefits[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = benefit.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
    </motion.div>
  )
}

export default function Benefits() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section id="beneficios" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Benefícios do Tratamento
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            O que a cannabis medicinal<br />pode fazer pela sua saúde
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uma abordagem inovadora que une ciência e cuidado para transformar a sua experiência odontológica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
