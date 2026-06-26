import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateSessionValue } from "@/lib/auth";

const DATA_PATH = path.join(process.cwd(), "src", "data", "projects.json");

function readProjects() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("admin_session");
  const expectedEmail = process.env.ADMIN_EMAIL;
  if (!session || !expectedEmail) return false;
  return session.value === await generateSessionValue(expectedEmail);
}

export async function GET(req: NextRequest) {
  try {
    const projects = readProjects();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    if (featured === "true") {
      return NextResponse.json(
        projects.filter((p: { featured: boolean }) => p.featured)
      );
    }

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to save projects" },
      { status: 500 }
    );
  }
}
