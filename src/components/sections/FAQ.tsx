import { useState } from 'react'
import { Plus } from 'lucide-react'

const QS = [
  [
    'A consulta é realmente online?',
    'Sim. Todo o atendimento é por vídeo, de onde você estiver. Você recebe o link por e-mail após agendar.',
  ],
  [
    'A cannabis medicinal é legalizada no Brasil?',
    'O uso medicinal é regulamentado. A prescrição é individual e feita conforme avaliação clínica e as normas vigentes.',
  ],
  [
    'Preciso levar exames?',
    'Se tiver exames ou laudos recentes, tenha-os à mão — ajuda na avaliação. Não é obrigatório para a primeira consulta.',
  ],
  [
    'Como funciona o pagamento?',
    'Pagamento único de R$ 220 no agendamento. O retorno de acompanhamento já está incluso. Aceitamos Pix.',
  ],
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-[clamp(3.5rem,7vw,6.5rem)]">
      <div className="container mx-auto px-6">
        <p className="eyebrow justify-center [&]:flex">Dúvidas frequentes</p>
        <h2 className="mb-10 mt-4 text-center text-[clamp(1.9rem,1.3rem+2vw,2.8rem)] leading-[1.05]">
          Perguntas comuns
        </h2>

        <div className="mx-auto max-w-[780px]">
          {QS.map(([q, a], i) => {
            const isOpen = open === i
            return (
              <div key={q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left font-heading text-[19px] font-bold text-pine-900"
                >
                  {q}
                  <Plus
                    className={`h-[22px] w-[22px] flex-none text-pine-600 transition-transform duration-300 ease-brand ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-brand"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="min-h-0">
                    <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-muted-foreground">
                      {a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
