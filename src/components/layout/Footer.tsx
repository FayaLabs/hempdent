export default function Footer() {
  return (
    <footer className="bg-foreground py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src="/images/hempdent-logo-2.svg" alt="HempDent" className="h-8 w-auto brightness-0 invert" />
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <a href="#beneficios" className="hover:text-white transition-colors">Benefícios</a>
            <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#sobre" className="hover:text-white transition-colors">Sobre</a>
            <a href="#contato" className="hover:text-white transition-colors">Contato</a>
            <a href="https://pro.quaddro.co/drhiago/agendar/servicos/cxeCtz" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Agendar</a>
          </nav>

          <p className="text-white/40 text-xs text-center">
            © {new Date().getFullYear()} HempDent · CRO-SP 166513 · Cannabis Medicinal com excelência
          </p>
        </div>
      </div>
    </footer>
  )
}
