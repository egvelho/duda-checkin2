import Link from "next/link";
import { Button } from "@/components/button";
import { IfAuth } from "@/components/if-auth";
import { Auth } from "@/lib/auth";

const texts = {
  logo: {
    first: "Duda",
    second: "Checkin",
  },
  actions: {
    login: { label: "Entrar", href: "/entrar" },
    register: { label: "Criar conta", href: "/criar-conta" },
    logout: { label: "Sair", href: "/sair" },
  },
};

export async function Header() {
  const user = await Auth.getUser();
  const isAuth = user !== null;
  console.log(user, isAuth);

  const guestActions = (
    <IfAuth auth={!isAuth}>
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
    </IfAuth>
  );

  const authActions = (
    <IfAuth auth={isAuth}>
      {user?.name}
      <Link href={texts.actions.logout.href}>
        <Button variant="primary" size="md">
          {texts.actions.logout.label}
        </Button>
      </Link>
    </IfAuth>
  );

  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex items-center space-x-2 gap-2">
            {guestActions}
            {authActions}
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
