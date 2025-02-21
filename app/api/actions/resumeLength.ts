"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

export async function canCreateResume() {
  const session = await getServerSession(auth);
  if (!session?.user?.email) return false; // Not authenticated

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, isPremium: true }, // Fetch isPremium status
  });

  if (!user) return false; // User not found

  if (user.isPremium) return true; // Premium users have no limit

  const resumeCount = await prisma.resume.count({
    where: { userId: user.id },
  });

  return resumeCount < 3; // Non-premium users can create up to 3 resumes
}
