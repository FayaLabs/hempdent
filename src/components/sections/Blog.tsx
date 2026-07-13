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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col flex-1">
        <div className="overflow-hidden h-48">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col flex-1 p-6">
          <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-primary mb-3 w-fit">
            {post.tag}
          </span>
          <h3 className="font-heading text-lg font-semibold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-2.5 pt-4 border-t border-border">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.name} loading="lazy" className="h-7 w-7 shrink-0 rounded-full object-cover" />
            ) : (
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-primary">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">{post.author.name}</p>
              <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                {post.date}<span aria-hidden>·</span><Clock className="h-3 w-3" />{post.readTime}
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
  // Content now comes from the Fayz blog plugin (seeded mock provider for now).
  const { posts } = useBlogPosts({ limit: 3 })

  return (
    <section id="blog" className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4"
        >
          <div>
            <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
              Blog
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
              Conteúdo que<br />educa e transforma
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
            Artigos escritos com base científica para te ajudar a entender como a cannabis medicinal pode mudar sua saúde bucal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="gap-2 border-primary text-primary hover:bg-accent">
            <Link to="/blog">
              Ver todos os artigos <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
