import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookies = await cookies();
  sessionCookies.delete("SESSION_ID");
  return NextResponse.json({
    texto: "Logout realizado com sucesso!",
  });
}
