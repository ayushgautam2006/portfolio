import { NextRequest, NextResponse } from "next/server";
import { generateSessionValue } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  const expectedEmail = process.env.ADMIN_EMAIL;

  if (!session || !expectedEmail) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const expectedValue = await generateSessionValue(expectedEmail);

  if (session.value !== expectedValue) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
