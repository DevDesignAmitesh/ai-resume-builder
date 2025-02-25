"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";


export async function getResume(id: string) {
  const session = await getServerSession(auth)

  if (!session) {
    return { message: "un authorized" }
  }

  if (!id) {
    return { message: "id not found" }
  }

  const resume = await prisma.resume.findUnique({
    where: {
      id
    },
    include: {
      content: {
        include: {
          contact: true,
          experince: true,
          education: true,
          projects: true,
          certificate: true,
        },
      },
    }
  })

  if (!resume) {
    return { message: "resume not found" }
  }

  return { message: "resume found", resume }
}