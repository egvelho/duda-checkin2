import { NextResponse } from "next/server";
import { Auth } from "@/lib/auth";
import type { Prisma } from "@/lib/prisma";
import { endpoint } from "@/lib/endpoint";
import { loginSchema } from "@/schemas/login-schema";

export type LoginApiResponse = ApiResponse<
  { user: Prisma.TeacherModel },
  InferZodError<[]>
>;

export const POST = endpoint<LoginApiResponse>(async (request) => {
  const rawForm = await request.json();
  const form = loginSchema.parse(rawForm);
  const user = await Auth.login(form.email, form.password);

  if (user === null) {
    return NextResponse.json(
      {
        success: false,
        errors: [],
      },
      { status: 403 },
    );
  }

  return NextResponse.json({
    success: true,
    data: { user },
  });
});
