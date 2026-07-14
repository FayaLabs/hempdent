import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, MessageCircle, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuth } from '@fayz-ai/auth'
import { useAuthModal } from '@fayz-ai/plugin-auth/website'
import { AGENDA_URL, WHATSAPP_URL } from '@/lib/links'
import Wordmark from '@/components/Wordmark'

// Sticky, translucent hemp-paper nav with backdrop blur — the brand's one
// glassmorphism moment. A hairline pine border appears once scrolled.
// "Agendar" links to the external Quaddro page; the embedded Fayz booking flow
// stays mounted at /agendar (not linked). Client-area (auth) entry is disabled
// for now — the plugin stays wired, just no visible entry. Flip to re-enable.
const SHOW_CLIENT_AREA = false

const NAV_LINKS = [
  { href: '/#como', label: 'Como funciona' },
  { href: '/#beneficios', label: 'Benefícios' },
  { href: '/#valores', label: 'Valores' },
  { to: '/blog', label: 'Blog' },
  { href: '/#faq', label: 'Dúvidas' },
] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, signOut } = useAuth()
  const { openAuthModal } = useAuthModal()
  const displayName = user?.fullName || user?.email || 'Cliente'
  const initial = displayName.charAt(0).toUpperCase()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ease-brand ${
        scrolled
          ? 'border-b border-border bg-hemp-100/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-hemp-100/70 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto flex h-[74px] items-center gap-7 px-6">
        <Link to="/" className="text-pine-900">
          <Wordmark className="text-2xl" />
        </Link>

        {/* Desktop nav */}
        <nav className="ml-2 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) =>
            'to' in l ? (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink-700 transition-colors hover:bg-pine-100 hover:text-pine-800"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink-700 transition-colors hover:bg-pine-100 hover:text-pine-800"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex-1" />

        {/* Right: auth affordance + CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {SHOW_CLIENT_AREA &&
            (isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-pine-100 px-3 py-1.5 text-sm font-semibold text-pine-800 transition-colors hover:bg-pine-200"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pine-600 text-xs font-bold text-hemp-50">
                    {initial}
                  </span>
                  <span className="max-w-[9rem] truncate">{displayName}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-card shadow-warm">
                    <Link
                      to="/painel"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-pine-100"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary" /> Meu painel
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false)
                        void signOut()
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-destructive hover:bg-pine-100"
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
                className="text-sm font-semibold text-ink-700 transition-colors hover:text-pine-800"
              >
                Área do cliente
              </button>
            ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex"
          >
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </a>
          <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="accent" size="sm">
              Agendar consulta
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-pine-900 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-border bg-hemp-100/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((l) =>
            'to' in l ? (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-xl px-2 py-2.5 text-sm font-semibold text-foreground hover:bg-pine-100"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-2 py-2.5 text-sm font-semibold text-foreground hover:bg-pine-100"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ),
          )}
          {SHOW_CLIENT_AREA &&
            (isAuthenticated ? (
              <>
                <Link
                  to="/painel"
                  className="rounded-xl px-2 py-2.5 text-sm font-semibold text-foreground hover:bg-pine-100"
                  onClick={() => setOpen(false)}
                >
                  Meu painel ({displayName})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    void signOut()
                  }}
                  className="px-2 py-2.5 text-left text-sm font-semibold text-destructive"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openAuthModal()
                }}
                className="px-2 py-2.5 text-left text-sm font-semibold text-foreground"
              >
                Área do cliente
              </button>
            ))}
          <a
            href={AGENDA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2"
          >
            <Button variant="accent" className="w-full">
              Agendar consulta
            </Button>
          </a>
        </div>
      )}
    </header>
  )
}
