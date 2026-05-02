const texts = {
  brand: "DudaCheckin",
  copyright: `© ${new Date().getFullYear()}`,
  rights:
    "Todos os direitos reservad...AHUEAHUEAHUAE. Vibe codei esse negócio pra parecer mais profissional. Esses links não apontam pra nada.",
  links: [
    { label: "Privacidade ( ͡° ͜ʖ ͡°)", href: "/?privacidade" },
    { label: "Termos de desuso", href: "/?termos" },
    { label: "Contatinhos", href: "/?contato" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm text-center md:text-left">
            {texts.copyright}{" "}
            <span className="font-semibold text-primary">{texts.brand}</span>.{" "}
            {texts.rights}
          </div>
          <nav className="flex space-x-6">
            {texts.links.map((link) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

function NavLink({ href, children }: NavLinkProps) {
  return (
    <span className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
      {children}
    </span>
  );
}
