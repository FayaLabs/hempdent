import { Link } from 'react-router-dom'
import { AGENDA_URL, WHATSAPP_URL, WHATSAPP_PHONE_DISPLAY } from '@/lib/links'
import Wordmark from '@/components/Wordmark'

const NAV = [
  { href: '/#como', label: 'Como funciona' },
  { href: '/#beneficios', label: 'Benefícios' },
  { href: '/#doutor', label: 'O doutor' },
  { href: '/#valores', label: 'Valores' },
  { href: '/#faq', label: 'Dúvidas' },
]

export default function Footer() {
  return (
    <footer className="bg-pine-900 text-pine-100">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="text-hemp-50">
            <Wordmark className="text-2xl" />
          </Link>
          <p className="mt-3.5 max-w-[34ch] text-[15px] leading-relaxed text-pine-200">
            Odontologia integrativa com cannabis medicinal. Teleconsulta com o Dr. Hiago
            Benevenutti — CRO-SP 166513.
          </p>
        </div>

        <div>
          <h5 className="mb-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-resin-400">
            Navegar
          </h5>
          <nav className="flex flex-col">
            {NAV.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/blog"
              className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div>
          <h5 className="mb-3.5 font-body text-xs font-bold uppercase tracking-[0.14em] text-resin-400">
            Contato
          </h5>
          <nav className="flex flex-col">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
            >
              WhatsApp · {WHATSAPP_PHONE_DISPLAY}
            </a>
            <a
              href="mailto:contato@hempdent.com.br"
              className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
            >
              contato@hempdent.com.br
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
            >
              Instagram
            </a>
            <a
              href={AGENDA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 text-[15px] text-pine-100 transition-colors hover:text-hemp-50"
            >
              Agendar consulta
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-pine-700">
        <div className="container mx-auto flex flex-wrap justify-between gap-4 px-6 py-5 text-[13px] text-pine-200">
          <span>© {new Date().getFullYear()} Hemp Dent · Todos os direitos reservados</span>
          <span>Responsável técnico: Dr. Hiago Benevenutti · CRO-SP 166513</span>
        </div>
      </div>
    </footer>
  )
}
