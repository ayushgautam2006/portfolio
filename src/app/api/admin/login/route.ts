import { NextRequest, NextResponse } from "next/server";
import { generateMagicToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const expectedEmail = process.env.ADMIN_EMAIL;

    if (!expectedEmail) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL environment variable is not configured" },
        { status: 500 }
      );
    }

    // Normalize emails for comparison
    const formattedEmail = email?.trim().toLowerCase();
    const formattedExpected = expectedEmail.trim().toLowerCase();

    // Constant-ish time delay to prevent email discovery timing attacks
    await new Promise((r) => setTimeout(r, 400));

    if (formattedEmail !== formattedExpected) {
      return NextResponse.json(
        { error: "Unauthorized email address" },
        { status: 401 }
      );
    }

    // Generate token
    const token = await generateMagicToken(formattedEmail);
    const origin = req.nextUrl.origin;
    const magicLink = `${origin}/api/admin/verify?token=${token}`;

    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      // Production mode: Send actual email via Resend
      const emailResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Admin <onboarding@resend.dev>",
          to: formattedExpected,
          subject: "Portfolio Admin Access Link",
          html: `
            <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
              <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-bottom: 16px;">Admin Access Requested</h2>
              <p style="color: #a3a3a3; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">Click the button below to verify your identity and access the administration panel. This link will expire in 15 minutes.</p>
              <a href="${magicLink}" style="display: inline-block; padding: 12px 24px; background-color: #ffffff; color: #000000; font-weight: 600; text-decoration: none; border-radius: 8px; font-size: 14px;">Sign In to Dashboard</a>
              <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
              <p style="color: #737373; font-size: 12px;">If the button above does not work, copy and paste this URL into your browser:</p>
              <p style="color: #737373; font-size: 12px; word-break: break-all;">${magicLink}</p>
            </div>
          `,
        }),
      });

      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        console.error("Resend API Error:", errorData);
        return NextResponse.json(
          { error: "Failed to send magic link email" },
          { status: 500 }
        );
      }

      return NextResponse.json({ ok: true });
    } else {
      // Resend API key is missing. Log to terminal for local debugging, but fail the HTTP response.
      if (process.env.NODE_ENV !== "production") {
        console.log("\n==================================================================");
        console.log("🔑 [DEV MODE] PORTFOLIO ADMIN LOGIN REQUESTED");
        console.log(`Email: ${formattedEmail}`);
        console.log(`Magic Link: ${magicLink}`);
        console.log("==================================================================\n");
      }
      return NextResponse.json(
        { error: "Resend API key is not configured on the server." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
