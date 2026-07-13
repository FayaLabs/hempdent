import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star, CalendarCheck, MapPin, Clock, CreditCard, Instagram } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AGENDA_URL = 'https://pro.quaddro.co/drhiago/agendar/servicos/cxeCtz'

const reviews = [
  {
    name: 'Águida M.',
    rating: 5,
    text: 'Atendimento incrível! Dr. Hiago é muito atencioso e explica tudo com muita clareza. Me sinto muito mais segura com o tratamento.',
    date: 'Janeiro 2025',
  },
  {
    name: 'Fernanda R.',
    rating: 5,
    text: 'Nunca imaginei que a cannabis medicinal poderia me ajudar com a dor crônica que sentia. A consulta online foi super prática e eficiente.',
    date: 'Dezembro 2024',
  },
  {
    name: 'Marcos L.',
    rating: 5,
    text: 'Profissional extremamente qualificado. A abordagem humanizada e o conhecimento técnico fazem toda a diferença no tratamento.',
    date: 'Novembro 2024',
  },
]

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl bg-white border border-border p-6 shadow-sm"
    >
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-foreground text-sm leading-relaxed mb-4">"{review.text}"</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-primary font-semibold text-sm">
            {review.name[0]}
          </div>
          <span className="text-sm font-medium text-foreground">{review.name}</span>
        </div>
        <span className="text-xs text-muted-foreground">{review.date}</span>
      </div>
    </motion.div>
  )
}

export default function SocialProof() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <>
      {/* Reviews */}
      <section id="sobre" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 24 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Avaliações
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
              O que os pacientes dizem
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-foreground font-semibold text-lg">4.8</span>
              <span className="text-muted-foreground text-sm">· 123 avaliações</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {reviews.map((review, index) => (
              <ReviewCard key={review.name} review={review} index={index} />
            ))}
          </div>

          {/* Doctor info */}
          <div className="rounded-3xl bg-muted border border-border overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-5">
                  Sobre o especialista
                </span>
                <h3 className="font-heading text-3xl font-bold text-foreground mb-2">Dr. Hiago Benevenutti</h3>
                <p className="text-primary font-medium mb-4">Cirurgião-Dentista · CRO-SP 166513</p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Especialista em odontologia canábica, Dr. Hiago une formação técnica de excelência com uma abordagem humanizada e integrativa. 
                  Oferece consultas online para pacientes de todo o Brasil com foco em resultados reais e qualidade de vida.
                </p>
                <div className="flex flex-col gap-3 text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Segunda a Sábado — 13h às 12h45</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Atendimento 100% online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Aceitamos Pix</span>
                  </div>
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-0">
                <img
                  src="https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020"
                  alt="Dr. Hiago Benevenutti"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white mb-6">
              Consulta Canábica Online
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Pronto para transformar sua saúde bucal?
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Agende sua consulta online agora. 30 minutos, R$ 220,00 e o cuidado humanizado que você merece. Aceita Pix.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary font-semibold hover:bg-green-50 shadow-xl px-8 gap-2">
                  <CalendarCheck className="h-5 w-5" />
                  Agendar agora — R$ 220
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 px-8 gap-2">
                  <Instagram className="h-5 w-5" />
                  Instagram
                </Button>
              </a>
            </div>
            <p className="text-white/60 text-xs mt-6">
              Remarcações com até 72h de antecedência · Tolerância de 5 min para atrasos
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
