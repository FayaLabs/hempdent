import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { useReviews, useReviewSummary, type Review } from '@fayz-ai/plugin-reputation/public'

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-warm"
    >
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-resin-500 text-resin-500" />
        ))}
      </div>
      <p className="mb-5 flex-1 font-serif text-[17px] italic leading-relaxed text-ink-700">
        “{review.text}”
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pine-100 text-sm font-bold text-pine-700">
            {review.author[0]}
          </div>
          <span className="text-sm font-semibold text-pine-900">{review.author}</span>
        </div>
        <span className="text-xs text-muted-foreground">{review.date}</span>
      </div>
    </motion.div>
  )
}

export default function SocialProof() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  // Reviews + aggregate come from the Fayz reputation plugin (seeded).
  const { reviews } = useReviews({ limit: 3 })
  const { summary } = useReviewSummary()

  return (
    <section id="sobre" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <p className="eyebrow justify-center [&]:flex">Avaliações</p>
          <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
            O que os pacientes dizem
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-resin-500 text-resin-500" />
              ))}
            </div>
            <span className="text-lg font-bold text-pine-900">{summary?.average ?? '—'}</span>
            <span className="text-sm text-muted-foreground">· {summary?.count ?? 0} avaliações</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
