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
import { createClient } from '@supabase/supabase-js'
import { setGlobalSupabaseClient } from '@fayz-ai/core'
import { CreditCard, MapPin, Video } from 'lucide-react'
import { createBlogPlugin, createMockBlogProvider } from '@fayz-ai/plugin-blog'
import { createMockReputationProvider, createReputationWebsite } from '@fayz-ai/plugin-reputation/public'
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
} from './seeds'

/** Where the header's "área do cliente" / "Meu painel" links point. */
export const PANEL_PATH = '/painel'

// --- Supabase (fayz-calendar project) ---------------------------------------
// Booking is UNMOCKED: services/slots/bookings come from anon-safe views/RPCs
// scoped by this tenant. The anon key + tenant UUIDs are safe in the bundle.
export const HEMPDENT_TENANT_ID = '11111111-1111-4111-8111-000000000001'
export const HEMPDENT_STAFF_ID = '11111111-1111-4111-8111-000000000101'

// Env-only: NO key material in git. The Fayz editor injects these secrets on
// deploy; local dev reads them from an untracked .env. When absent, we skip the
// global client and the safe booking provider degrades to an EMPTY catalog
// (site still renders; the booking flow shows an unavailable state).
// Industry pool: cluster-dentist-br-01 (projectRef mcbfebruhimlbvlvczsn).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
if (supabaseUrl && supabaseAnonKey) {
  setGlobalSupabaseClient(createClient(supabaseUrl, supabaseAnonKey))
} else {
  console.error(
    '[website] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — booking catalog will be unavailable.',
  )
}

// --- Auth (ONE shared mock adapter — the linchpin) -------------------------
// The same instance backs <AuthProvider> AND the booking→auth bridge below, so
// signUp() from the bridge notifies the mounted provider → header chip updates.
export const authAdapter = createMockAuthAdapter()

// --- Plugin instances (seeded; mock providers until a real backend is wired) ---

// Blog/reviews stay on the seed providers. Injected EXPLICITLY because this
// app now registers a global Supabase client (for booking) — without this,
// their safe resolvers would pick the not-yet-implemented Supabase stubs.
const blog = createBlogPlugin({
  dataProvider: createMockBlogProvider({
    seed: { posts: HEMPDENT_POSTS },
    defaultAuthor: {
      name: 'Thiago',
      role: 'Cirurgião-Dentista · Odontologia Canábica',
      avatarUrl: 'https://ksaxihqupvvhdbfqbbwx.supabase.co/storage/v1/object/public/avatars/43ebd04a-a4ff-4738-840d-544ebf4831b6.png?1704878851020',
      bio: 'Especialista em odontologia canábica, une formação técnica de excelência com uma abordagem humanizada e integrativa.',
    },
  }),
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
  dataProvider: createMockReputationProvider({ seed: { reviews: HEMPDENT_REVIEWS, summary: REVIEW_SUMMARY } }),
  seed: { reviews: HEMPDENT_REVIEWS, summary: REVIEW_SUMMARY },
  heading: 'O que os pacientes dizem',
})

// Payment provider (mock Pix; real MercadoPago gateway deferred). Injected into
// the booking plugin — agenda depends only on the core PaymentProvider interface.
const payments = createPublicPaymentPlugin({ currency: 'BRL', mock: { autoPayAfterMs: 6000 } })

const booking = createPublicBookingPlugin({
  tenantId: HEMPDENT_TENANT_ID,
  professional: { id: HEMPDENT_STAFF_ID, name: 'Dr. Hiago Benevenutti' },
  // No static `services`: the catalog comes from Supabase (v_public_services).
  // Dr. Hiago atende segunda a sábado, à tarde.
  workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6], start: '13:00', end: '19:00' },
  brand: {
    name: 'HempDent · Consulta Canábica',
    tagline: 'Agendamento online seguro · CRO-SP 166513',
    serviceIcon: Video,
    serviceMeta: 'Online',
    featuredBadge: 'Mais procurado',
    highlights: [
      { icon: Video, text: 'Consulta 100% online' },
      { icon: MapPin, text: 'Atende todo o Brasil' },
      { icon: CreditCard, text: 'Aceitamos Pix' },
    ],
  },
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
 * Site chrome shared by plugin detail/flow routes. The site Header is fixed +
 * translucent hemp-paper with dark text (see Header.tsx), so subpages just need
 * top padding equal to the 74px header height so content clears it.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-[74px]">{children}</main>
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
