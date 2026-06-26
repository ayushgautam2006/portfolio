import { NextRequest, NextResponse } from "next/server";
import { generateSessionValue } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("admin_session");
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!session || !expectedPassword) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const expectedValue = await generateSessionValue(expectedPassword);

  if (session.value !== expectedValue) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
