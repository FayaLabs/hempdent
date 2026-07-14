import { Video, FileText, CalendarCheck, Lock } from 'lucide-react'

const ITEMS = [
  { icon: Video, label: 'Teleconsulta por vídeo' },
  { icon: FileText, label: 'Prescrição orientada' },
  { icon: CalendarCheck, label: 'Acompanhamento incluso' },
  { icon: Lock, label: 'Sigilo e ética profissional' },
]

export default function TrustBar() {
  return (
    <div className="bg-pine-900 text-hemp-100">
      <div className="container mx-auto flex flex-wrap justify-between gap-6 px-6 py-7">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-[15px] font-medium">
            <Icon className="h-5 w-5 flex-none text-resin-400" />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
