import { NextRequest, NextResponse } from "next/server";
import { generateSessionValue } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const entryKey = process.env.ADMIN_ENTRY_KEY;

  // ── Session cookie check (already logged in)
  const session = req.cookies.get("admin_session");
  const sessionValid =
    session && adminEmail
      ? session.value === await generateSessionValue(adminEmail)
      : false;

  if (sessionValid) {
    return NextResponse.next();
  }

  // ── Entry key check: ?key=ADMIN_ENTRY_KEY grants access to the login page
  // This is what makes the route truly hidden — you need the key to even see the login form
  const providedKey = searchParams.get("key");
  const entryValid = entryKey && providedKey === entryKey;

  if (entryValid) {
    // Set a short-lived entry cookie so the login form stays accessible during the session
    const res = NextResponse.next();
    res.cookies.set("admin_entry", Buffer.from(entryKey).toString("base64"), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 30, // 30 minutes to complete login
      path: "/admin",
    });
    return res;
  }

  // ── Entry cookie check (already passed the key, now on the login form)
  const entryCookie = req.cookies.get("admin_entry");
  const entryViasCookie =
    entryCookie && entryKey
      ? entryCookie.value === Buffer.from(entryKey).toString("base64")
      : false;

  if (entryViasCookie) {
    return NextResponse.next();
  }

  // ── No valid session or entry key → return 404 (hides the route completely)
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
