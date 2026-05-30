import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { JWT } from "@/lib/jwt";

export async function POST(request: Request) {
  const form = await request.json();

  const user = await prisma.teacher.findUnique({
    where: {
      email: form.email,
      password: form.password,
    },
  });

  if (user === null) {
    return NextResponse.json({
      texto: "Email ou senha inválidos",
    });
  }

  const payload = {
    name: user.name,
    email: user.email,
  };
  const jwt = await JWT.encode(payload);

  const requestCookies = await cookies();
  requestCookies.set("SESSION_ID", jwt);

  return NextResponse.json({
    texto: "Login realizado com sucesso!",
  });
}
