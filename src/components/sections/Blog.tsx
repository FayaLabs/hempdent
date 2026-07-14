import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBlogPosts, type BlogPost } from '@fayz-ai/plugin-blog'

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
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
          <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-pine-900 transition-colors duration-200 group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-2.5 border-t border-border pt-4">
            {post.author.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                loading="lazy"
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pine-100 text-xs font-bold text-pine-700">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-pine-900">{post.author.name}</p>
              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                {post.date}
                <span aria-hidden>·</span>
                <Clock className="h-3 w-3" />
                {post.readTime}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Blog() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  // Content comes from the Fayz blog plugin (seeded mock provider for now).
  const { posts } = useBlogPosts({ limit: 3 })

  return (
    <section id="blog" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
              Conteúdo que educa e transforma
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Artigos com base científica para te ajudar a entender como a cannabis medicinal pode
            mudar sua saúde bucal.
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline">
            <Link to="/blog">
              Ver todos os artigos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
