// One-off: copy content from the old SQLite file (prisma/graphene.db) into the Postgres DB in DATABASE_URL.
// Run after `npx prisma migrate deploy`: npx tsx prisma/copy-sqlite-to-postgres.ts
// @ts-ignore -- @types/node 20 predates node:sqlite (runtime is Node 22+)
import { DatabaseSync } from "node:sqlite";
import { PrismaClient, Prisma } from "@prisma/client";

const sqlite = new DatabaseSync("prisma/graphene.db", { readOnly: true });
const prisma = new PrismaClient();

// Parents before children. Sessions are skipped: admins just log in again.
const MODELS = [
  "User", "HomepageContent", "AboutContent", "Service", "PortfolioProject", "GalleryItem",
  "Testimonial", "Faq", "ContactInfo", "SeoSettings", "WebsiteSettings",
];

async function main() {
  for (const name of MODELS) {
    const model = Prisma.dmmf.datamodel.models.find((m) => m.name === name)!;
    const delegate = (prisma as any)[name[0].toLowerCase() + name.slice(1)];

    if ((await delegate.count()) > 0) {
      throw new Error(`${name} already has rows in Postgres; refusing to overwrite. Use an empty database.`);
    }

    const rows = sqlite.prepare(`SELECT * FROM "${name}"`).all() as Record<string, any>[];
    // SQLite stores DateTime as epoch ms and Boolean as 0/1.
    const data = rows.map((row) => {
      const out: Record<string, any> = {};
      for (const f of model.fields) {
        if (f.kind !== "scalar" || !(f.name in row)) continue;
        const v = row[f.name];
        out[f.name] = v === null ? null : f.type === "DateTime" ? new Date(v) : f.type === "Boolean" ? Boolean(v) : v;
      }
      return out;
    });

    if (data.length) await delegate.createMany({ data });

    // Explicit ids were inserted, so move the autoincrement sequence past them.
    const idField = model.fields.find((f) => f.isId)!;
    if (idField.type === "Int") {
      await prisma.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"${name}"', 'id'), COALESCE((SELECT MAX(id) FROM "${name}"), 0) + 1, false)`
      );
    }

    const copied = await delegate.count();
    if (copied !== rows.length) throw new Error(`${name}: expected ${rows.length} rows, found ${copied}`);
    console.log(`${name}: ${copied} rows`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
