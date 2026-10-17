// Replaces ALL admin users with one account (also logs everyone out).
// Usage: npx tsx prisma/reset-admin.ts you@example.com
// The password is prompted for, so it never lands in shell history.
import { createInterface } from "node:readline/promises";
import * as bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2]?.trim();
  if (!email || !email.includes("@")) throw new Error("Usage: npx tsx prisma/reset-admin.ts you@example.com");

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const password = await rl.question("New admin password (min 12 chars): ");
  rl.close();
  if (password.length < 12) throw new Error("Password must be at least 12 characters.");

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.$transaction([prisma.user.deleteMany(), prisma.user.create({ data: { email, passwordHash } })]);
  console.log(`Admin is now ${email}. All other admin accounts and sessions were removed.`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
