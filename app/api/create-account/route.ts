import { NextResponse } from "next/server";
import { z } from "zod";
import { createAccountSchema as baseCreateAccountSchema } from "@/schemas/create-account-schema";
import { prisma, Prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const createAccountSchema = baseCreateAccountSchema.strict();

export type CreateAccountApiResponse = ApiResponse<
  { user: Prisma.TeacherModel },
  InferZodError<typeof createAccountSchema>
>;

export async function POST(
  request: Request,
): Promise<NextResponse<CreateAccountApiResponse>> {
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
  const userExists = await prisma.teacher.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (userExists !== null) {
    return NextResponse.json({
      success: false,
      errors: {
        errors: [],
        properties: {
          email: {
            errors: ["Este email já está cadastrado no banco de dados"],
          },
        },
      },
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(formData.password, salt);
  const user = await prisma.teacher.create({
    data: { ...formData, password: passwordHash },
  });

  return NextResponse.json({
    success: true,
    data: { user },
  });
}
