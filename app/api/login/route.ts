import { NextResponse } from "next/server";
import { Auth } from "@/lib/auth";
import type { Prisma } from "@/lib/prisma";

export type LoginApiResponse = ApiResponse<
  { user: Prisma.TeacherModel },
  InferZodError<[]>
>;

export async function POST(
  request: Request,
): Promise<NextResponse<LoginApiResponse>> {
  const form = await request.json();
  const user = await Auth.login(form.email, form.password);

  if (user === null) {
    return NextResponse.json({
      success: false,
      errors: [],
    });
  }

  return NextResponse.json({
    success: true,
    data: { user },
  });
}
