import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Auth } from "./lib/auth";
import * as jose from "jose";

const publicRoutes = ["/", "/entrar", "/criar-conta"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/sair") {
    return NextResponse.next();
  }

  try {
    var user = await Auth.getUser();
  } catch (error) {
    if (
      error instanceof jose.errors.JWTExpired ||
      error instanceof jose.errors.JWSSignatureVerificationFailed ||
      error instanceof jose.errors.JWTInvalid
    ) {
      return NextResponse.redirect(new URL("/sair", request.url));
    } else {
      console.error(error);
      return NextResponse.next();
    }
  }

  const isAuthenticated = user !== null;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/area-do-professor", request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sair", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
