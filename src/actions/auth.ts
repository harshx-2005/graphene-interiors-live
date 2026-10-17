"use server";

import { z } from "zod";
import { createSession, destroySession, verifyAuth, verifyPassword, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function loginAction(prevState: any, formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  console.log("Login Attempt:", { email, passwordLength: password?.length });

  const validatedFields = loginSchema.safeParse({ email, password });
  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.format());
    return { success: false, error: "Invalid email or password format." };
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: "Invalid email or password." };
    }

    await createSession(user.id);
    return { success: true };
  } catch (error: any) {
    console.error("Login action error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}

export async function logoutAction() {
  await destroySession();
  return { success: true };
}

export async function changePasswordAction(prevState: any, formData: FormData) {
  const user = await verifyAuth();
  if (!user) {
    return { success: false, error: "Unauthorized." };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword) {
    return { success: false, error: "All fields are required." };
  }

  if (newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters." };
  }

  try {
    const currentUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!currentUser) {
      return { success: false, error: "User not found." };
    }

    const isValid = await verifyPassword(currentPassword, currentUser.passwordHash);
    if (!isValid) {
      return { success: false, error: "Incorrect current password." };
    }

    const passwordHash = await hashPassword(newPassword);
    await db.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return { success: true, message: "Password updated successfully." };
  } catch (error: any) {
    console.error("Change password action error:", error);
    return { success: false, error: error.message || "Failed to change password." };
  }
}
