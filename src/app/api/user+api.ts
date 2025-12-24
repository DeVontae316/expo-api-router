import { createHash } from "crypto";

function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export async function GET() {
  return Response.json(
    {
      ok: true,
      hasDatabaseUrl: Boolean(
        process.env.DATABASE_URL || process.env.NEON_DB_URL || process.env.NEON_DEV_DB
      ),
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL && !process.env.NEON_DB_URL && !process.env.NEON_DEV_DB) {
    return Response.json(
      { ok: false, error: "DATABASE_URL is not set" },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email =
    typeof (body as any)?.email === "string" ? (body as any).email.trim() : "";
  const password =
    typeof (body as any)?.password === "string"
      ? (body as any).password.trim()
      : "";

  if (!email || !email.includes("@")) {
    return Response.json(
      { ok: false, error: "Email is required" },
      { status: 400 }
    );
  }
  if (!password || password.length < 8) {
    return Response.json(
      { ok: false, error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const salt = process.env.PASSWORD_SALT ?? "dev-only-salt";
  const passwordHash = sha256(`${salt}:${password}`);

  try {
    const { db, schema } = await import("../../db");
    const [user] = await db
      .insert(schema.users)
      .values({
        email,
        passwordHash,
      })
      .returning({
        id: schema.users.id,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
      });

    return Response.json({ ok: true, user }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const isConflict = /duplicate key|unique constraint/i.test(message);
    return Response.json(
      { ok: false, error: message },
      { status: isConflict ? 409 : 500 }
    );
  }
}
