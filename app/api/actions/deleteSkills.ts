"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

export async function deleteSkills(id: string) {
  if (!id) {
    return { message: "id not found" };
  }
  const session = await getServerSession(auth);

  if (!session || !session.user?.email) {
    return { message: "unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      resume: {
        include: {
          content: true,
        },
      },
    },
  });

  if (!user) {
    return { message: "user not found" };
  }

  const skill = await prisma.skills.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    return { message: "skill not found" };
  }

  const deletedSkill = await prisma.skills.delete({
    where: {
      id,
    },
  });

  if (!deletedSkill) {
    return { message: "something went wrong" };
  }

  return { message: "deleted" };
}
