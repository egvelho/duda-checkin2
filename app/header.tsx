import Link from "next/link";
import { Button } from "@/components/button";
import { prisma } from "@/lib/prisma";
import { JWT } from "@/lib/jwt";
import { cookies } from "next/headers";

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

export async function Header() {
  const sessionCookies = await cookies();
  const token = sessionCookies.get("SESSION_ID");
  const payload: any = token && (await JWT.decode(token.value));
  const user = payload
    ? await prisma.teacher.findUnique({
        where: {
          email: payload.email,
        },
      })
    : {};

  return (
    <nav className="sticky top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex items-center space-x-2">
            {!user.name && (
              <Link href={texts.actions.login.href}>
                <Button variant="ghost" size="md">
                  {texts.actions.login.label}
                </Button>
              </Link>
            )}

            {!user.name && (
              <Link href={texts.actions.register.href}>
                <Button variant="primary" size="md">
                  {texts.actions.register.label}
                </Button>
              </Link>
            )}
            {user?.name}
            {user?.name && (
              <Link href="/api/logout">
                <Button variant="primary" size="md">
                  Sair
                </Button>
              </Link>
            )}
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
