"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

export async function getUser() {
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

  return { message: "user found", user }
}