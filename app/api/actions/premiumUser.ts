"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function premiumUser() {
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


  await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      isPremium: true
    }
  })

  return { message: "done" }
}