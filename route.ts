import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  // 1. Get the session using the request headers
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Check if the session exists
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Access user data via session.user
  return NextResponse.json({
    message: "This is protected data",
    user: session.user,
    secretCode: "SkillSphere-2024",
  });
}