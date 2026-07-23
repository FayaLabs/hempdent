// Seed data lifted from the original hardcoded sections (Blog.tsx / SocialProof.tsx).
// This is the POC data source; a real backend (Supabase/CMS/ERP) swaps in later
// via each plugin's provider with no change to the sections or this file's shape.

import type { Review, ReviewSummary } from '@fayz-ai/plugin-reputation/public'
import type { PublicService } from '@fayz-ai/plugin-agenda/public'

export interface BlogPost {
  slug: string
  tag: string
  title: string
  excerpt: string
  readTime: string
  date: string
  publishedAt: string
  image: string
  body: string
}

export const HEMPDENT_POSTS: BlogPost[] = [
  {
    slug: 'cbd-pos-operatorio-dor-extracoes',
    tag: 'Cannabis & Odontologia',
    title: 'CBD no pós-operatório: como os canabinoides reduzem a dor após extrações',
    excerpt:
      'Entenda como o canabidiol age no sistema nervoso para controlar dores e acelerar a recuperação após procedimentos odontológicos.',
    readTime: '5 min',
    date: 'Janeiro 2025',
    publishedAt: '2025-01-15',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80',
    body: `O período pós-operatório é uma das fases mais sensíveis de qualquer procedimento odontológico. A dor, o inchaço e a inflamação são respostas naturais do organismo — mas isso não significa que o paciente precise sofrer com elas.

Os canabinoides, em especial o canabidiol (CBD), atuam no sistema endocanabinoide, um conjunto de receptores presentes no sistema nervoso e no tecido gengival. Ao modular esses receptores, o CBD ajuda a reduzir a percepção da dor e a controlar a resposta inflamatória.

Na prática clínica, protocolos com canabinoides têm mostrado recuperação mais confortável após extrações, especialmente de terceiros molares. É sempre um tratamento individualizado, conduzido por um profissional habilitado.`,
  },
  {
    slug: 'cannabis-medicinal-doenca-periodontal',
    tag: 'Periodontia',
    title: 'Cannabis medicinal no tratamento da doença periodontal: o que a ciência diz',
    excerpt:
      'Novos estudos revelam o potencial anti-inflamatório dos canabinoides no controle da periodontite e saúde gengival.',
    readTime: '7 min',
    date: 'Dezembro 2024',
    publishedAt: '2024-12-10',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80',
    body: `A doença periodontal é uma inflamação crônica que afeta os tecidos de suporte dos dentes. Quando não tratada, pode levar à perda dentária e está associada a condições sistêmicas como diabetes e doenças cardiovasculares.

Pesquisas recentes investigam o papel anti-inflamatório dos canabinoides no controle da periodontite. O CBD, por sua ação sobre a resposta imune local, aparece como um coadjuvante promissor ao tratamento periodontal convencional.

Vale reforçar: a cannabis medicinal complementa — não substitui — a higiene bucal adequada e o acompanhamento profissional regular.`,
  },
  {
    slug: 'bruxismo-e-cannabis-tratamento-canabico',
    tag: 'Bruxismo',
    title: 'Bruxismo e cannabis: como o tratamento canábico alivia o hábito de ranger os dentes',
    excerpt:
      'O bruxismo afeta milhões de brasileiros. Veja como a abordagem canábica pode ser uma alternativa eficaz e humanizada.',
    readTime: '6 min',
    date: 'Novembro 2024',
    publishedAt: '2024-11-20',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80',
    body: `O bruxismo — o hábito involuntário de ranger ou apertar os dentes — atinge milhões de brasileiros e frequentemente está ligado à ansiedade e ao estresse. Suas consequências vão do desgaste dentário às dores de cabeça e na articulação da mandíbula.

A abordagem canábica atua em duas frentes: o efeito ansiolítico e relaxante muscular dos canabinoides ajuda a reduzir a tensão que dispara o bruxismo, principalmente o noturno.

Combinada a placas de proteção e ao manejo do estresse, a terapia canábica oferece uma alternativa humanizada para quem busca qualidade de sono e de vida.`,
  },
]

export const HEMPDENT_REVIEWS: Review[] = [
  {
    id: 'aguida-m',
    author: 'Águida M.',
    rating: 5,
    source: 'Google',
    text: 'Atendimento incrível! Dr. Hiago é muito atencioso e explica tudo com muita clareza. Me sinto muito mais segura com o tratamento.',
    date: 'Janeiro 2025',
  },
  {
    id: 'fernanda-r',
    author: 'Fernanda R.',
    rating: 5,
    source: 'Google',
    text: 'Nunca imaginei que a cannabis medicinal poderia me ajudar com a dor crônica que sentia. A consulta online foi super prática e eficiente.',
    date: 'Dezembro 2024',
  },
  {
    id: 'marcos-l',
    author: 'Marcos L.',
    rating: 5,
    source: 'Google',
    text: 'Profissional extremamente qualificado. A abordagem humanizada e o conhecimento técnico fazem toda a diferença no tratamento.',
    date: 'Novembro 2024',
  },
]

export const REVIEW_SUMMARY: ReviewSummary = { average: 4.8, count: 123 }

export const HEMPDENT_SERVICES: PublicService[] = [
  {
    id: 'consulta-inicial',
    name: 'Consulta Canábica Online',
    durationMinutes: 30,
    price: 220,
    description: 'Primeira avaliação · 100% online · Aceita Pix',
  },
  {
    id: 'retorno',
    name: 'Retorno / Acompanhamento',
    durationMinutes: 20,
    price: 150,
    description: 'Reavaliação de tratamento em andamento',
  },
]

export const DR_HIAGO = { id: 'dr-hiago', name: 'Dr. Hiago Benevenutti' }
