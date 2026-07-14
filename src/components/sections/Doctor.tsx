import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const DR_PHOTO =
  'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-heading text-2xl font-extrabold tracking-tight text-hemp-50">{value}</div>
      <div className="mt-1 text-[13px] text-pine-200">{label}</div>
    </div>
  )
}

export default function Doctor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="doutor" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 overflow-hidden rounded-3xl bg-pine-800 text-hemp-100 md:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="relative min-h-[300px] md:min-h-[420px]">
            <img
              src={DR_PHOTO}
              alt="Dr. Hiago Benevenutti"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-[clamp(2rem,4vw,3.5rem)]">
            <p className="eyebrow eyebrow-light">O doutor</p>
            <h2 className="mt-4 text-[clamp(1.8rem,1.2rem+2vw,2.7rem)] leading-tight text-hemp-50">
              Dr. Hiago Benevenutti
            </h2>
            <blockquote className="my-6 border-l-[3px] border-resin-500 pl-[18px] font-serif text-xl italic leading-relaxed text-hemp-50">
              “Trato a pessoa, não só o sintoma. A cannabis medicinal é uma ferramenta séria
              dentro de uma odontologia integrativa.”
            </blockquote>
            <p className="max-w-[50ch] text-base leading-relaxed text-pine-100">
              Cirurgião-dentista com atuação em odontologia integrativa e cannabis medicinal,
              conduzindo cada teleconsulta com escuta, ética e base clínica.
            </p>
            <div className="mt-8 flex gap-10">
              <Stat value="CRO-SP" label="166513" />
              <Stat value="+8 anos" label="De experiência clínica" />
              <Stat value="100%" label="Atendimento online" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
