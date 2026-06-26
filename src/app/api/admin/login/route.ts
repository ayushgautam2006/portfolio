import { NextRequest, NextResponse } from "next/server";
import { generateSessionValue } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD environment variable is not configured" },
        { status: 500 }
      );
    }

    // Timing-delay simulation to prevent timing attacks
    await new Promise((r) => setTimeout(r, 400));

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });

    // Generate secure cryptographically signed session cookie
    const sessionValue = await generateSessionValue(expectedPassword);

    response.cookies.set("admin_session", sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
