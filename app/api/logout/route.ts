import { Auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { endpoint } from "@/lib/endpoint";

export const POST = endpoint(async () => {
  await Auth.logout();
  return NextResponse.json({ success: true, data: null });
});
