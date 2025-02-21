"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

export async function deleteResume(id: string) {
  const session = await getServerSession(auth);

  if (!session || !session.user?.email) {
    return { message: "unauthorized" };
  }

  const resume = await prisma.resume.findUnique({
    where: { id, }
  });

  if (!resume) {
    return { message: "user not found" };
  }

  await prisma.resume.delete({
    where: {
      id: resume.id
    }
  })

  return { message: "deleted" }
}