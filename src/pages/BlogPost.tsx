import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HEMPDENT_POSTS } from '@/plugins/seeds'

export default function BlogPost() {
  const { slug } = useParams()
  const post = HEMPDENT_POSTS.find((p) => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  return (
    <article className="py-[clamp(2.5rem,6vw,5rem)]">
      <div className="container mx-auto max-w-3xl px-6">
        <Button asChild variant="ghost" className="mb-8 -ml-4">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4" /> Voltar para o blog
          </Link>
        </Button>

        <span className="mb-3 inline-block w-fit rounded-full bg-pine-100 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-pine-700">
          {post.tag}
        </span>
        <h1 className="mb-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">{post.title}</h1>
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          {post.date}
          <span aria-hidden>·</span>
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl">
          <img src={post.image} alt={post.title} className="h-auto w-full object-cover" />
        </div>

        <div className="prose prose-lg max-w-none space-y-5 font-serif text-base leading-relaxed text-foreground">
          {post.body.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
