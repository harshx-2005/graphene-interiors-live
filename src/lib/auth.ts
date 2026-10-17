import { cookies } from "next/headers";
import * as bcrypt from "bcryptjs";
import { randomBytes } from "crypto";
import { db } from "./db";

// Hash password helper
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verify password helper
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Generate random session token
function generateToken(): string {
  return randomBytes(32).toString("hex");
}

// Create a database session and set httpOnly cookie
export async function createSession(userId: number): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  await db.session.create({
    data: {
      id: token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set("graphene_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return token;
}

// Get and validate current session
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("graphene_session")?.value;

  if (!token) return null;

  const session = await db.session.findUnique({
    where: { id: token },
    include: { user: true },
  });

  if (!session) return null;

  // Check if session has expired
  if (new Date() > session.expiresAt) {
    await db.session.delete({ where: { id: token } });
    return null;
  }

  return session;
}

// Verify auth on server side (redirect or return user)
export async function verifyAuth() {
  const session = await getSession();
  if (!session) return null;
  return session.user;
}

// Delete session and clear cookie
export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("graphene_session")?.value;

  if (token) {
    await db.session.deleteMany({
      where: { id: token },
    });
  }

  cookieStore.set("graphene_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
}
