import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const posts = [
  {
    tag: 'Cannabis & Odontologia',
    title: 'CBD no pós-operatório: como os canabinoides reduzem a dor após extrações',
    excerpt: 'Entenda como o canabidiol age no sistema nervoso para controlar dores e acelerar a recuperação após procedimentos odontológicos.',
    readTime: '5 min',
    date: 'Janeiro 2025',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
  },
  {
    tag: 'Periodontia',
    title: 'Cannabis medicinal no tratamento da doença periodontal: o que a ciência diz',
    excerpt: 'Novos estudos revelam o potencial anti-inflamatório dos canabinoides no controle da periodontite e saúde gengival.',
    readTime: '7 min',
    date: 'Dezembro 2024',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
  },
  {
    tag: 'Bruxismo',
    title: 'Bruxismo e cannabis: como o tratamento canábico alivia o hábito de ranger os dentes',
    excerpt: 'O bruxismo afeta milhões de brasileiros. Veja como a abordagem canábica pode ser uma alternativa eficaz e humanizada.',
    readTime: '6 min',
    date: 'Novembro 2024',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
  },
]

function PostCard({ post, index }: { post: typeof posts[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <div className="overflow-hidden h-48">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <span className="inline-block rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-primary mb-3">
          {post.tag}
        </span>
        <h3 className="font-heading text-lg font-semibold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
          <span>{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} de leitura</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

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
            <PostCard key={post.title} post={post} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-accent">
            Ver todos os artigos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
