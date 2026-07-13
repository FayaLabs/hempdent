import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@fayz-ai/auth'
import { useAuthModal } from '@fayz-ai/plugin-auth/website'
import { AGENDA_URL } from '@/lib/links'

// "Agendar" links to the external Quaddro page; the embedded Fayz booking flow
// stays mounted at /agendar (not linked). Auth state comes from the shared mock
// adapter mounted in src/plugins/website.tsx.

export default function Header() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, signOut } = useAuth()
  const { openAuthModal } = useAuthModal()
  const displayName = user?.fullName || user?.email || 'Cliente'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/images/hempdent-logo.svg" alt="HempDent" className="h-10 w-auto" />
          <span className="font-heading font-bold text-white leading-none text-sm tracking-widest">
            HEMP<br />DENT
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="/#beneficios" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Benefícios</a>
          <Link to="/blog" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Blog</Link>
          <a href="/#sobre" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Sobre</a>
          <a href="/#contato" className="text-sm font-medium text-white/90 transition-colors hover:text-white">Contato</a>
        </nav>

        {/* Right: auth affordance + CTA */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">{initial}</span>
                <span className="max-w-[9rem] truncate">{displayName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  <Link
                    to="/painel"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4 text-primary" /> Meu painel
                  </Link>
                  <button
                    type="button"
                    onClick={() => { setMenuOpen(false); void signOut() }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-destructive hover:bg-muted"
                  >
                    <LogOut className="h-4 w-4" /> Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Acessar área do cliente
            </button>
          )}
          <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-primary font-semibold hover:bg-white/90 shadow-md px-5">Agendar Consulta</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 shadow-lg">
          <a href="/#beneficios" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Benefícios</a>
          <Link to="/blog" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Blog</Link>
          <a href="/#sobre" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Sobre</a>
          <a href="/#contato" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Contato</a>
          {isAuthenticated ? (
            <>
              <Link to="/painel" className="text-sm font-medium text-foreground" onClick={() => setOpen(false)}>Meu painel ({displayName})</Link>
              <button type="button" onClick={() => { setOpen(false); void signOut() }} className="text-left text-sm font-medium text-destructive">Sair</button>
            </>
          ) : (
            <button type="button" onClick={() => { setOpen(false); openAuthModal() }} className="text-left text-sm font-medium text-foreground">Acessar área do cliente</button>
          )}
          <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <Button className="w-full">Agendar Consulta</Button>
          </a>
        </div>
      )}
    </header>
  )
}
