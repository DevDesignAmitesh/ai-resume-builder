"use server";

import { auth } from "@/lib/auth";
import { FormData } from "@/pages/Index";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

export async function createResume(data: FormData) {
  const session = await getServerSession(auth);

  if (!session || !session.user?.email) {
    return { message: "unauthorized" };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });

  if (!user) {
    return { message: "user not found" };
  }

  try {
    // 1️⃣ Create Resume
    const resume = await prisma.resume.create({
      data: {
        userId: user.id
      }
    });

    // 2️⃣ Create Content
    const content = await prisma.content.create({
      data: {
        resumeId: resume.id,
        name: data.content.name,
        title: data.content.title,
        summary: data.content.summary,
        feSkills: data.content.feSkills ?? [],
        beSkills: data.content.beSkills ?? [],
        db: data.content.db ?? [],
        apiDev: data.content.apiDev ?? [],
        lang: data.content.lang ?? [],
        versionCon: data.content.versionCon ?? [],
      }
    });

    // 3️⃣ Create Contact (email & phone)
    await prisma.contact.create({
      data: {
        contentId: content.id,
        email: data.content.contact.email,
        phone: data.content.contact.phone,
        linkedin: data.content.contact.linkedin,
        github: data.content.contact.github,
      }
    });

    // 4️⃣ Create Experience entries
    data.content.experience.length > 0 && await prisma.experience.createMany({
      data: data.content.experience.map(exp => ({
        contentId: content.id,
        company: exp.company,
        position: exp.position,
        duration: exp.duration,
        description: exp.description
      }))
    });

    // 5️⃣ Create Education entries
    data.content.education.length > 0 && await prisma.education.createMany({
      data: data.content.education.map(edu => ({
        contentId: content.id,
        school: edu.school,
        degree: edu.degree,
        duration: edu.duration
      }))
    });

    // 6️⃣ Create Project entries
    data.content.projects.length > 0 && await prisma.projects.createMany({
      data: data.content.projects.map(proj => ({
        contentId: content.id,
        name: proj.name,
        description: proj.description,
        tech: proj.tech,
        liveLink: proj.liveLink,
      }))
    });

    return { message: "resume created successfully", resume };

  } catch (error) {
    console.error("Error creating resume:", error);
    return { message: "error occurred while creating resume" };
  }
}
