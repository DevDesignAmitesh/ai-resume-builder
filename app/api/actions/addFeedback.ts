"use server";

import { auth, rateLimit } from "@/lib/auth";
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

  const rateLimitCount = 1;
  const rateLimitInterval = 60 * 1000 * 5;

  const isAllowed = rateLimit(
    user.email,
    rateLimitCount,
    rateLimitInterval
  );

  if (!isAllowed) {
    return {message: "try after 5 minutes"};
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