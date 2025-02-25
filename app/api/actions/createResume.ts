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

    // 2️⃣ Create Content (always create, even if some fields are empty)
    const content = await prisma.content.create({
      data: {
        resumeId: resume.id,
        name: data.content.name || "",
        title: data.content.title || "",
        summary: data.content.summary || "",
        feSkills: data.content.feSkills ?? [],
        beSkills: data.content.beSkills ?? [],
        db: data.content.db ?? [],
        apiDev: data.content.apiDev ?? [],
        lang: data.content.lang ?? [],
        versionCon: data.content.versionCon ?? [],
        achievements: data.content.achievements ?? [],
      }
    });

    // 3️⃣ Create Contact (email & phone) only if there’s data
    const contactData = {
      contentId: content.id,
      email: data.content.contact.email || "",
      phone: data.content.contact.phone || "",
      linkedin: data.content.contact.linkedin || "",
      github: data.content.contact.github || "",
    };

    if (Object.values(contactData).some(value => 
      typeof value === "string" && value.trim().length > 0
    )) {
      await prisma.contact.create({
        data: contactData
      });
    }

    // 4️⃣ Create Experience entries only if there’s data
    if (data.content.experience && data.content.experience.length > 0) {
      const experienceData = data.content.experience.filter(exp => 
        exp.company.trim().length > 0 || 
        exp.position.trim().length > 0 || 
        exp.duration.trim().length > 0 || 
        (exp.description && exp.description.length > 0)
      );

      if (experienceData.length > 0) {
        await prisma.experience.createMany({
          data: experienceData.map(exp => ({
            contentId: content.id,
            company: exp.company,
            position: exp.position,
            duration: exp.duration,
            description: exp.description || []
          }))
        });
      }
    }

    // 5️⃣ Create Education entries only if there’s data
    if (data.content.education && data.content.education.length > 0) {
      const educationData = data.content.education.filter(edu => 
        edu.school.trim().length > 0 || 
        edu.degree.trim().length > 0 || 
        edu.duration.trim().length > 0
      );

      if (educationData.length > 0) {
        await prisma.education.createMany({
          data: educationData.map(edu => ({
            contentId: content.id,
            school: edu.school,
            degree: edu.degree,
            duration: edu.duration
          }))
        });
      }
    }

    // 6️⃣ Create Project entries only if there’s data
    if (data.content.projects && data.content.projects.length > 0) {
      const projectData = data.content.projects.filter(proj => 
        proj.name.trim().length > 0 || 
        proj.description.trim().length > 0 || 
        (proj.tech && proj.tech.length > 0) || 
        proj.liveLink.trim().length > 0
      );

      if (projectData.length > 0) {
        await prisma.projects.createMany({
          data: projectData.map(proj => ({
            contentId: content.id,
            name: proj.name,
            description: proj.description,
            tech: proj.tech || [],
            liveLink: proj.liveLink || ""
          }))
        });
      }
    }

    // 7️⃣ Create Certificate entries only if there’s data
    if (data.content.certificates && data.content.certificates.length > 0) {
      const certificateData = data.content.certificates.filter(cer => 
        cer.name.trim().length > 0 || 
        cer.date.trim().length > 0
      );

      if (certificateData.length > 0) {
        await prisma.certificate.createMany({
          data: certificateData.map(cer => ({
            contentId: content.id,
            name: cer.name,
            date: cer.date
          }))
        });
      }
    }

    return { message: "resume created successfully", resume };

  } catch (error) {
    console.error("Error creating resume:", error);
    return { message: "error occurred while creating resume" };
  }
}