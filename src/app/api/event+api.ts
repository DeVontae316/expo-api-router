export async function GET() {
  const hasDatabaseUrl = Boolean(
    process.env.DATABASE_URL || process.env.NEON_DB_URL || process.env.NEON_DEV_DB,
  );

  if (!hasDatabaseUrl) {
    return Response.json(
      {
        ok: true,
        message: 'Set DATABASE_URL in EAS to enable Drizzle + Neon.',
      },
      { status: 200 },
    );
  }

  try {
    const { db } = await import('../../db');
    void db;
    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
