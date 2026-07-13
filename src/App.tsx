import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <TooltipProvider>
        <Routes>
          <Route path="/*" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
      </TooltipProvider>
    </BrowserRouter>
  )
}
