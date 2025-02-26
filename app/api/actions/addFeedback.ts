"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";



export async function addFeedback(content: string) {
  if (!content) {
    return { message: "content not found" }
  }

  const session = await getServerSession(auth)

  if (!session || !session.user?.email) {
    return { message: "unauthorized" }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!user) {
    return { message: "user not found" }
  }

  const feedback = await prisma.feedback.create({
    data: {
      userId: user.id,
      content,
    }
  })

  if (!feedback) {
    return { message: "something went wrong" }
  }

  return { message: "feedback added" }
}