import { NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const user = await verifyAuth();
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
    }

    const { url, category, type } = await request.json();
    if (!url || !category || !type) {
      return NextResponse.json({ success: false, error: "Missing required parameters." }, { status: 400 });
    }

    const item = await db.galleryItem.create({
      data: {
        url,
        category,
        type,
        order: 0,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error: any) {
    console.error("Gallery item api error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create gallery item." }, { status: 500 });
  }
}
