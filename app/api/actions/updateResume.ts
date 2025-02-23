"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/src";
import { getServerSession } from "next-auth";

function cleanSkills(skills: any) {
  return Array.isArray(skills)
    ? skills
      .filter(skill => skill.items?.length) // Remove skills with empty items
      .map(skill => ({ ...skill, items: skill.items.filter((item: any) => item) })) // Remove empty strings inside items
    : [];
}


export async function updateResume(resumeId: string, updatedData: any) {
  console.log(updatedData.skills);
  console.log(updatedData.projects);
  if (!updatedData || !resumeId) {
    return { message: "not found" }
  }

  try {
    const session = await getServerSession(auth);

    if (!session || !session.user?.email) {
      return { message: "unauthorized" };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return { message: "user not found" };
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: resumeId,
        userId: user.id,
      },
      include: {
        content: true, // Include the related Content
      },
    });

    if (!resume) {
      return { message: "resume not found" };
    }

    const cleanedSkills = cleanSkills(updatedData.skills);

    // Update the Resume and its nested Content
    await prisma.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        content: {
          update: {
            where: {
              id: resume.content[0].id, // Assuming there's only one Content per Resume
            },
            data: {
              name: updatedData.name || resume.content[0].name,
              title: updatedData.title || resume.content[0].title,
              summary: updatedData.summary || resume.content[0].summary,
              lang: cleanedSkills[0] && cleanedSkills[0].items || resume.content[0].lang,
              feSkills: cleanedSkills[1] && cleanedSkills[1].items || resume.content[0].feSkills,
              beSkills: cleanedSkills[2] && cleanedSkills[2].items || resume.content[0].beSkills,
              db: cleanedSkills[3] && cleanedSkills[3].items || resume.content[0].db,
              apiDev: cleanedSkills[4] && cleanedSkills[4].items || resume.content[0].apiDev,
              versionCon: cleanedSkills[5] && cleanedSkills[5].items || resume.content[0].versionCon,
              contact: updatedData.contact
                ? {
                  updateMany: updatedData.contact.map((contact: any) => ({
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
              experince: updatedData.experince
                ? {
                  updateMany: updatedData.experince.map((exp: any) => ({
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
              education: updatedData.education
                ? {
                  updateMany: updatedData.education.map((edu: any) => ({
                    where: { id: edu.id },
                    data: {
                      school: edu.school,
                      degree: edu.degree,
                      duration: edu.duration,
                    },
                  })),
                }
                : undefined,
              projects: updatedData.projects
                ? {
                  updateMany: updatedData.projects.map((proj: any) => ({
                    where: { id: proj.id },
                    data: {
                      name: proj.name,
                      description: proj.description,
                      tech: proj.tech,
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
    return { message: "error", error }
  }
}