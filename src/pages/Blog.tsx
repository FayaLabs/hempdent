import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { HEMPDENT_POSTS } from '@/plugins/seeds'

function PostCard({ post, index }: { post: (typeof HEMPDENT_POSTS)[number]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-warm transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-lift"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <span className="mb-3 w-fit rounded-full bg-pine-100 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-pine-700">
            {post.tag}
          </span>
          <h2 className="mb-3 font-heading text-lg font-bold leading-snug text-pine-900 transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h2>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
            {post.date}
            <span aria-hidden>·</span>
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <p className="eyebrow">Blog</p>
          <h1 className="mt-4 text-[clamp(2rem,1.4rem+2.2vw,3rem)] leading-[1.05]">
            Conteúdo que educa e transforma
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Artigos com base científica para te ajudar a entender como a cannabis medicinal pode
            mudar sua saúde bucal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {HEMPDENT_POSTS.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
