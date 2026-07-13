import { useAuth } from '@fayz-ai/auth'
import { Link } from 'react-router-dom'
import { LogOut, CalendarCheck, User } from 'lucide-react'

/**
 * Área do cliente — POC stub. Greets the signed-in user; the real portal
 * (@fayz-ai/portal AccountPage + booking history) is deferred. Rendered inside
 * SiteChrome (Header/Footer) via a host route in App.tsx.
 */
export default function Painel() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto max-w-2xl px-6">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
                {(user.fullName || user.email || '?').charAt(0).toUpperCase()}
              </span>
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground">Olá, {user.fullName || 'cliente'}</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                <CalendarCheck className="h-5 w-5 text-primary" /> Meus agendamentos
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Em breve você verá aqui o histórico das suas consultas. (Área do cliente — versão de demonstração.)
              </p>
              <Link to="/agendar" className="mt-4 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Agendar nova consulta
              </Link>
            </div>

            <button
              type="button"
              onClick={() => void signOut()}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <LogOut className="h-4 w-4" /> Sair da conta
            </button>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
              <User className="h-7 w-7" />
            </span>
            <h1 className="font-heading text-2xl font-bold text-foreground">Área do cliente</h1>
            <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
              Faça um agendamento e confirme seu telefone para acessar sua conta e acompanhar suas consultas.
            </p>
            <Link to="/agendar" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
              Agendar consulta
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
