import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { AGENDA_URL, WHATSAPP_URL } from '@/lib/links'

const FEATURE = [
  'Teleconsulta por vídeo com o Dr. Hiago',
  'Avaliação clínica individual',
  'Orientação de prescrição',
  'Retorno de acompanhamento incluso',
]

const FOLLOWUP = [
  'Reavaliação do quadro clínico',
  'Ajuste de conduta e prescrição',
  'Suporte por mensagem entre consultas',
]

export default function Pricing() {
  return (
    <section id="valores" className="bg-hemp-200/60 py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <p className="eyebrow">Valores</p>
        <h2 className="mb-9 mt-4 text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
          Simples e transparente
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* Feature — pine */}
          <div className="flex flex-col rounded-3xl bg-pine-900 p-[clamp(1.8rem,3vw,2.6rem)] text-hemp-100 shadow-xl">
            <Badge className="w-fit border-transparent bg-resin-500 text-pine-900 hover:bg-resin-500">
              Mais escolhido
            </Badge>
            <h3 className="mt-4 text-2xl font-bold text-hemp-50">Consulta canábica</h3>
            <div className="mt-2 font-heading text-[56px] font-extrabold leading-none tracking-[-0.03em] text-hemp-50">
              R$&nbsp;220
            </div>
            <p className="mt-1 text-pine-100">Pagamento único · 30 minutos</p>
            <ul className="my-7 flex flex-col gap-3">
              {FEATURE.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-resin-400" />
                  {t}
                </li>
              ))}
            </ul>
            <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" className="mt-auto">
              <Button variant="accent" size="lg" className="w-full">
                Agendar agora
              </Button>
            </a>
          </div>

          {/* Follow-up — light */}
          <div className="flex flex-col rounded-3xl border border-border bg-card p-[clamp(1.8rem,3vw,2.6rem)] shadow-warm">
            <h3 className="text-[22px] font-bold text-pine-900">Acompanhamento</h3>
            <div className="mt-2 font-heading text-[56px] font-extrabold leading-none tracking-[-0.03em] text-pine-900">
              R$&nbsp;160
              <small className="text-lg font-semibold text-muted-foreground"> /retorno</small>
            </div>
            <p className="mt-1 text-muted-foreground">Para quem já iniciou o tratamento</p>
            <ul className="my-7 flex flex-col gap-3">
              {FOLLOWUP.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <Check className="mt-0.5 h-[18px] w-[18px] flex-none text-resin-600" />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button variant="outline" size="lg" className="w-full">
                Falar com a equipe
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
