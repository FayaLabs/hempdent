// ---------------------------------------------------------------------------
// Website plugin registry (host-owned glue).
//
// This is the thin integration layer that lets curated Fayz plugins power a
// bespoke marketing site while the site keeps its own layout/theme:
//   • each plugin is a { manifest, Provider } bundle
//   • WebsitePluginProvider mounts every plugin's context at the app root, so
//     the host's own sections can call plugin hooks (useBlogPosts, useReviews…)
//   • getWebsitePluginRoutes() mounts each plugin's guard:'public' routes inside
//     the host chrome (Header/Footer via <SiteChrome/>)
// ---------------------------------------------------------------------------
import type { ReactNode } from 'react'
import { Route } from 'react-router-dom'
import { createBlogPlugin } from '@fayz-ai/plugin-blog'
import { createReputationWebsite } from '@fayz-ai/plugin-reputation/public'
import { createPublicBookingPlugin } from '@fayz-ai/plugin-agenda/public'
import { createPublicPaymentPlugin } from '@fayz-ai/plugin-payments/public'
import { AuthProvider, createMockAuthAdapter } from '@fayz-ai/auth'
import { AuthModalProvider, phoneToEmail } from '@fayz-ai/plugin-auth/website'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  HEMPDENT_POSTS,
  HEMPDENT_REVIEWS,
  REVIEW_SUMMARY,
  HEMPDENT_SERVICES,
  DR_HIAGO,
} from './seeds'

/** Where the header's "área do cliente" / "Meu painel" links point. */
export const PANEL_PATH = '/painel'

// --- Auth (ONE shared mock adapter — the linchpin) -------------------------
// The same instance backs <AuthProvider> AND the booking→auth bridge below, so
// signUp() from the bridge notifies the mounted provider → header chip updates.
export const authAdapter = createMockAuthAdapter()

// --- Plugin instances (seeded; mock providers until a real backend is wired) ---

const blog = createBlogPlugin({
  seed: { posts: HEMPDENT_POSTS },
  // Default byline author (Medium-inspired) — applied to posts without their own.
  defaultAuthor: {
    name: 'Thiago',
    role: 'Cirurgião-Dentista · Odontologia Canábica',
    avatarUrl: 'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020',
    bio: 'Especialista em odontologia canábica, une formação técnica de excelência com uma abordagem humanizada e integrativa.',
  },
  labels: { listTitle: 'Blog', listSubtitle: 'Conteúdo que educa e transforma' },
})

const reputation = createReputationWebsite({
  seed: { reviews: HEMPDENT_REVIEWS, summary: REVIEW_SUMMARY },
  heading: 'O que os pacientes dizem',
})

// Payment provider (mock Pix; real MercadoPago gateway deferred). Injected into
// the booking plugin — agenda depends only on the core PaymentProvider interface.
const payments = createPublicPaymentPlugin({ currency: 'BRL', mock: { autoPayAfterMs: 6000 } })

const booking = createPublicBookingPlugin({
  professional: DR_HIAGO,
  services: HEMPDENT_SERVICES,
  // Dr. Hiago atende segunda a sábado, à tarde.
  workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6], start: '13:00', end: '19:00' },
  window: { minAdvanceHours: 2, maxAdvanceDays: 21, slotInterval: 30 },
  // Final Pagamento step (Pix). Toggle/tune at instantiation.
  payment: { enabled: true, reservationFeePercent: 100, method: 'pix' },
  paymentProvider: payments.paymentProvider,
  // Booking→auth bridge: phone-verify / details submit signs the user in.
  // Uses the SAME phoneToEmail as the login modal so both map to one account.
  onIdentityVerified: ({ name, phone }) => {
    void authAdapter.signUp(phoneToEmail(phone), phone, name || 'Cliente')
  },
  labels: {
    title: 'Agende sua consulta canábica',
    serviceStep: 'Escolha o serviço',
    dateStep: 'Escolha o melhor dia',
    contactStep: 'Seus dados de contato',
    confirmCta: 'Confirmar agendamento',
    successTitle: 'Consulta agendada!',
    successBody: 'Você receberá a confirmação e o link da consulta em breve. 💚',
  },
  currency: 'BRL',
  locale: 'pt-BR',
})

/** Every website plugin the host mounts. Order = provider nesting order. */
export const websitePlugins = [blog, reputation, payments, booking]

// --- Host glue -------------------------------------------------------------

/** Wrap the app root with auth + every plugin's context provider. */
export function WebsitePluginProvider({ children }: { children: ReactNode }) {
  const tree = websitePlugins.reduceRight<ReactNode>((acc, plugin) => {
    const Provider = plugin.Provider
    return <Provider>{acc}</Provider>
  }, children)
  return (
    <AuthProvider adapter={authAdapter}>
      <AuthModalProvider phoneAuth config={{ brand: 'HempDent', title: 'Acessar sua conta' }}>
        {tree}
      </AuthModalProvider>
    </AuthProvider>
  )
}

/**
 * Site chrome shared by plugin detail/flow routes. The site Header is absolute +
 * white-text (designed to overlay the home's dark hero), so on light subpages we
 * seat it on a brand-green band — keeps it readable and stops it overlapping
 * content.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative bg-primary h-20 shrink-0">
        <Header />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

/**
 * All public routes contributed by the website plugins, wrapped in site chrome.
 * Mounted in App's <Routes> ABOVE the "/*" catch-all (static/param paths outrank
 * the splat, so /blog, /blog/:slug, /reviews, /agendar win over Index).
 */
export function getWebsitePluginRoutes() {
  return websitePlugins.flatMap((plugin) =>
    plugin.manifest.routes
      .filter((route) => route.guard === 'public' && route.component)
      .map((route) => {
        const Component = route.component!
        return (
          <Route
            key={`${plugin.manifest.id}:${route.path}`}
            path={route.path}
            element={
              <SiteChrome>
                <Component />
              </SiteChrome>
            }
          />
        )
      }),
  )
}
