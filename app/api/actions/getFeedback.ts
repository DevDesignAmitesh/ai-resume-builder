"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";



export async function getFeedback() {
  const session = await getServerSession(auth)

  if (!session || !session.user?.email) {
    return { message: "unauthorized" }
  }

  const feedback = await prisma.feedback.findMany({
    include: {
      User: true
    }
  })

  return { message: "feedback found", feedback }
}