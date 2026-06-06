import { Auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await Auth.logout();
  return NextResponse.json({ success: true, data: { user } });
}
