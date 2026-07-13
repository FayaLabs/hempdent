import { Button } from '@/components/ui/button'
import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

const AGENDA_URL = 'https://pro.quaddro.co/drhiago/agendar/servicos/cxeCtz'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-lg font-semibold text-white drop-shadow-sm">HempDent</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#beneficios" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Benefícios</a>
          <a href="#blog" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Blog</a>
          <a href="#sobre" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Sobre</a>
          <a href="#contato" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Contato</a>
        </nav>

        <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block">
          <Button className="bg-white text-primary font-semibold hover:bg-white/90 shadow-md px-5">
            Agendar Consulta
          </Button>
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-lg">
          <a href="#beneficios" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Benefícios</a>
          <a href="#blog" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Blog</a>
          <a href="#sobre" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Sobre</a>
          <a href="#contato" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Contato</a>
          <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
            <Button className="w-full">Agendar Consulta</Button>
          </a>
        </div>
      )}
    </header>
  )
}
