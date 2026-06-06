import { NextResponse } from "next/server";
import { Auth } from "@/lib/auth";

export type LoginApiResponse = InferNextResponse<typeof POST>;

export async function POST(request: Request) {
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
