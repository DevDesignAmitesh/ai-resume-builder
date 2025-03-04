"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

function cleanString(value: any): string | "" {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : "";
  }
  return "";
}

function cleanArray(arr: any[] | null): any[] {
  if (!Array.isArray(arr)) return [];
  return arr
    .map((item) =>
      typeof item === "string" ? cleanString(item) : cleanObject(item)
    ) // Recursively clean objects inside the array
    .filter((item) => item !== ""); // Remove empty strings
}

function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    return cleanArray(obj);
  } else if (typeof obj === "object" && obj !== null) {
    const cleanedObject: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cleanedObject[key] = cleanData(obj[key]); // Recursively clean all properties
      }
    }
    return cleanedObject;
  }
  return obj;
}

function cleanData(data: any): any {
  if (Array.isArray(data)) {
    return cleanArray(data);
  }
  if (typeof data === "object" && data !== null) {
    return cleanObject(data);
  }
  return cleanString(data);
}

export async function updateResume(resumeId: string, updatedDatas: any) {
  if (!updatedDatas || !resumeId) {
    return { message: "not found" };
  }

  console.log(updatedDatas.skills);
  console.log(
    "---------------------------------------------------------------------"
  );

  const cleanedData = cleanData(updatedDatas);

  console.log(cleanedData.skills);

  try {
    const session = await getServerSession(auth);
    if (!session || !session.user?.email) {
      return { message: "unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return { message: "user not found" };
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId, userId: user.id },
      include: {
        content: true,
      },
    });
    if (!resume) {
      return { message: "resume not found" };
    }

    // Update the Resume and its nested Content
    await prisma.resume.update({
      where: { id: resume.id },
      data: {
        content: {
          update: {
            where: { id: resume.content[0].id },
            data: {
              name: cleanedData.name || "",
              title: cleanedData.title || "",
              summary: cleanedData.summary || "",
              skills: cleanedData.skills
                ? {
                    updateMany: cleanedData.skills.map((skill: any) => ({
                      where: { id: skill.id },
                      data: {
                        category: skill.category,
                        items: skill.items,
                      },
                    })),
                  }
                : undefined,
              contact: cleanedData.contact
                ? {
                    updateMany: cleanedData.contact.map((contact: any) => ({
                      where: { id: contact.id },
                      data: {
                        email: contact.email,
                        phone: contact.phone,
                        linkedin: contact.linkedin,
                        github: contact.github,
                      },
                    })),
                  }
                : undefined,
              experince: cleanedData.experience
                ? {
                    updateMany: cleanedData.experience.map((exp: any) => ({
                      where: { id: exp.id },
                      data: {
                        company: exp.company,
                        position: exp.position,
                        duration: exp.duration,
                        description: exp.description,
                      },
                    })),
                  }
                : undefined,
              education: cleanedData.education
                ? {
                    updateMany: cleanedData.education.map((edu: any) => ({
                      where: { id: edu.id },
                      data: {
                        school: edu.school,
                        degree: edu.degree,
                        duration: edu.duration,
                      },
                    })),
                  }
                : undefined,
              projects: cleanedData.projects
                ? {
                    updateMany: cleanedData.projects.map((proj: any) => ({
                      where: { id: proj.id },
                      data: {
                        name: proj.name,
                        description: proj.description,
                        tech: proj.tech,
                      },
                    })),
                  }
                : undefined,
              achievements: cleanedData.achievements,
              certificate: cleanedData.certifications
                ? {
                    updateMany: cleanedData.certifications.map((cer: any) => ({
                      where: { id: cer.id },
                      data: {
                        name: cer.name,
                        date: cer.date,
                      },
                    })),
                  }
                : undefined,
            },
          },
        },
      },
    });

    return { message: "Resume updated successfully" };
  } catch (error) {
    return { message: "error", error };
  }
}
