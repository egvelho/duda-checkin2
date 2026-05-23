import { NextResponse } from "next/server";
import { z } from "zod";
import { createAccountSchema as baseCreateAccountSchema } from "@/schemas/create-account-schema";
import { prisma } from "@/lib/prisma";

const createAccountSchema = baseCreateAccountSchema.strict();

export async function POST(request: Request) {
  const rawForm = await request.json();
  const result = createAccountSchema.safeParse(rawForm);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: z.treeifyError(result.error),
      },
      { status: 422 },
    );
  }

  const formData = result.data;

  return NextResponse.json({
    info: "farmei uma aurinha. moggados 67 67 67",
    dados: formData,
  });
}
