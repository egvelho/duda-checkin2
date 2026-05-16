import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const dados = await request.json();
  return NextResponse.json({
    info: "farmei uma aurinha. moggados 67 67 67",
    dados,
  });
}

// GET POST PUT PATCH DELETE OPTIONS
