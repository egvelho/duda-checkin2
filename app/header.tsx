import Link from "next/link";
import { Button } from "@/components/button";

const texts = {
  logo: {
    first: "Duda",
    second: "Checkin",
  },
  actions: {
    login: { label: "Entrar", href: "/entrar" },
    register: { label: "Criar conta", href: "/criar-conta" },
  },
};

export function Header() {
  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex items-center space-x-2">
            <Link href={texts.actions.login.href}>
              <Button variant="ghost" size="md">
                {texts.actions.login.label}
              </Button>
            </Link>

            <Link href={texts.actions.register.href}>
              <Button variant="primary" size="md">
                {texts.actions.register.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
    >
      {texts.logo.first}
      <span className="text-primary">{texts.logo.second}</span>
    </Link>
  );
}
