import { NextRequest, NextResponse } from "next/server";
import { generateSessionValue } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import projectsData from "@/data/projects.json";

const COLLECTION = "projects";

// ─── Types ────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
}

// ─── DB Helpers ───────────────────────────────────────────

async function readProjects(): Promise<Project[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection<Project>(COLLECTION)
      .find({}, { projection: { _id: 0 } })
      .sort({ order: 1 })
      .toArray();

    if (docs.length === 0) {
      const seeded = (projectsData as Omit<Project, "order">[]).map(
        (p, i) => ({ ...p, order: i })
      );
      await db.collection<Project>(COLLECTION).insertMany(seeded);
      return seeded;
    }

    return docs;
  } catch (err) {
    console.error("MongoDB read failed, falling back to static data:", err);
    return (projectsData as Omit<Project, "order">[]).map((p, i) => ({
      ...p,
      order: i,
    }));
  }
}

async function saveProjects(projects: Omit<Project, "order">[]): Promise<void> {
  const db = await getDb();
  const col = db.collection<Project>(COLLECTION);

  await col.deleteMany({});
  if (projects.length > 0) {
    const docs = projects.map((p, i) => ({ ...p, order: i }));
    await col.insertMany(docs);
  }
}

// ─── Auth ─────────────────────────────────────────────────

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const session = req.cookies.get("admin_session");
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!session || !expectedPassword) return false;
  return session.value === (await generateSessionValue(expectedPassword));
}

// ─── GET /api/projects ────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    const projects = await readProjects();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get("featured");

    if (featured === "true") {
      return NextResponse.json(projects.filter((p) => p.featured));
    }

    return NextResponse.json(projects);
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json(
      { error: "Failed to read projects" },
      { status: 500 }
    );
  }
}

// ─── POST /api/projects ───────────────────────────────────

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await saveProjects(body);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      {
        error:
          (err instanceof Error ? err.message : null) ??
          "Failed to save projects",
      },
      { status: 500 }
    );
  }
}

