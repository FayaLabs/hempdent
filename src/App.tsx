import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import Painel from '@/pages/Painel'
import { WebsitePluginProvider, getWebsitePluginRoutes, SiteChrome } from './plugins.generated'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    // Let the browser handle in-page anchors (/#sobre); only reset scroll on real
    // page changes so section links keep working from any route.
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <TooltipProvider>
        {/* Fayz website plugins (blog / reviews / booking) — provider at the app
            root so the home sections can call plugin hooks too. */}
        <WebsitePluginProvider>
          <Routes>
            {/* Plugin public routes (/blog, /blog/:slug, /reviews, /agendar) render
                inside the site chrome and outrank the "/*" splat below. */}
            {getWebsitePluginRoutes()}
            {/* Host route: área do cliente stub, inside the site chrome. */}
            <Route path="/painel" element={<SiteChrome><Painel /></SiteChrome>} />
            <Route path="/*" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WebsitePluginProvider>
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </BrowserRouter>
  )
}
