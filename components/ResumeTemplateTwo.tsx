"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Github, Linkedin, Plus, Trash } from "lucide-react";
import { Phone, Mail, Globe } from "lucide-react"; // Adding icons to match the image
import { deleteSkills } from "@/app/api/actions/deleteSkills";

interface Resume {
  content: {
    id: string;
    resumeId: string;
    name: string;
    title: string;
    summary: string;
    skills: {
      id: string;
      category: string;
      items: string[];
    }[];
    contact: {
      email: string;
      phone: string;
      linkedin: string;
      github: string;
    }[];
    experince: {
      company: string;
      position: string;
      duration: string;
      description: string[];
    }[];
    education: {
      school: string;
      degree: string;
      duration: string;
    }[];
    projects: {
      name: string;
      description: string;
      tech: string[];
      liveLink: string;
    }[];
    achievements: string[];
    certificate: {
      name?: string;
      date?: string;
    }[];
  }[];
}

const ResumeTemplateTwo = ({
  resume,
  isEditing,
  setData,
}: {
  resume: Resume;
  isEditing: boolean;
  setData: any;
}) => {
  const data = resume?.content?.[0];

  if (!data)
    return (
      <p className="text-center text-muted-foreground">
        No resume data available
      </p>
    );

  const [formData, setFormData] = useState({
    name: data.name || "John Smith",
    title: data.title || "Software Developer",
    summary:
      data.summary ||
      "Summarise your top skills relevant to the career you're applying to and 1-2 of your best accomplishments here. Example – Graduated passionate about software programming and skilled at Python development. Completed a 6-month Python certification in 2 months and completed 5 freelance development projects.",
    skills: data.skills || [
      {
        id: "1",
        category: "Tool / Technology",
        items: ["Skill 1", "Skill 2", "Skill 3"],
      },
    ],
    contact: data.contact || [
      {
        email: "john@gmail.com",
        phone: "123-456-78912",
        linkedin: "www.john.com",
        github: "",
      },
    ],
    experience: data.experince || [
      {
        company: "Company, City",
        position: "Title",
        duration: "Present",
        description: [
          "Depending on the job you're applying for write relevant experience only.",
          "Example – If you're applying for a Business Development role, internships in marketing, digital marketing, etc. could be relevant.",
          "Example – Selected as 1 of 300 candidates to assist in the corporate-sponsored pharmaceutical study, performing laboratory work.",
        ],
      },
    ],
    education: data.education || [
      {
        school: "",
        degree: "Degree: Field of Study",
        duration: "Present",
      },
    ],
    projects: data.projects || [
      {
        name: "Project Name",
        description:
          "Mention all projects: academic, competitions, internships, freelance or by your own initiative relevant to the job you’re applying to. Example – For the role of mechanical engineering Achieved 18% greater efficiency by redesigning the engine specifications on AutoCAD.",
        tech: [],
        liveLink: "",
      },
    ],
    achievements: data.achievements || [
      "Great chance to show off your extra-curricular activities.",
      "Examples – Elected Captain of Cricket team, Organised Placement Drive with a participation of 257 companies, a 30% increase from the previous year, Volunteered at Old-Age Home as part of The Art of Living.",
    ],
    certifications: data.certificate || [],
  });

  const handleInputChange = (
    field: string,
    value: any,
    index?: number,
    subField?: string
  ) => {
    setFormData((prev: any) => {
      if (index !== undefined && subField) {
        const updatedArray = [...prev[field as keyof typeof prev]];
        updatedArray[index] = { ...updatedArray[index], [subField]: value };

        return { ...prev, [field]: updatedArray };
      }

      if (field === "contact") {
        return {
          ...prev,
          contact: [{ ...prev.contact[0], [subField!]: value }],
        };
      }

      if (Array.isArray(prev[field as keyof typeof prev])) {
        let updatedValue;

        if (typeof value === "string") {
          updatedValue = value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

          if (updatedValue.length === 0) {
            updatedValue = [];
          }
        } else if (Array.isArray(value)) {
          updatedValue = value.filter((item) => item !== "");
        } else {
          updatedValue = [];
        }

        return { ...prev, [field]: updatedValue };
      }

      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    setData(formData);
  }, [formData, setData]);

  const removeSkill = async (id: string) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((name) => name.id !== id),
    }));
    await deleteSkills(id);
  };

  return (
    <div className="w-full rounded-md px-3 py-2 bg-white text-black">
      {/* Header Section - Name and Title on Left Top */}
      {isEditing ? (
        <div className="p-4 flex flex-col justify-center items-start gap-2 text-left">
          <input
            className="border border-black/50 p-2 rounded-sm text-3xl font-bold"
            type="text"
            placeholder="Your Name"
            value={formData.name}
          />
          <input
            className="border border-black/50 p-2 rounded-sm text-xl"
            type="text"
            placeholder="Job Title"
            value={formData.title}
          />
        </div>
      ) : (
        <header className="p-4 text-left">
          <h1 className="text-3xl font-bold">{formData.name}</h1>
          <h2 className="text-xl">{formData.title}</h2>
        </header>
      )}

      {/* Main Content - Two-Column Layout (Left Dots, Right Content) */}
      <div className="flex p-6 gap-4">
        {/* Right Column - Resume Content */}
        <div className="w-11/12 space-y-6">
          {/* Contact Section */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">CONTACT</h3>
            {formData.contact && formData.contact.length > 0 && (
              <div className="flex flex-col gap-2 text-gray-700 text-sm">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <input
                        className="border rounded p-2 w-full"
                        value={formData.contact[0].phone}
                        onChange={(e) =>
                          handleInputChange(
                            "contact",
                            e.target.value,
                            undefined,
                            "phone"
                          )
                        }
                        placeholder="Phone"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <input
                        className="border rounded p-2 w-full"
                        value={formData.contact[0].email}
                        onChange={(e) =>
                          handleInputChange(
                            "contact",
                            e.target.value,
                            undefined,
                            "email"
                          )
                        }
                        placeholder="Email"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <input
                        className="border rounded p-2 w-full"
                        value={formData.contact[0].linkedin}
                        onChange={(e) =>
                          handleInputChange(
                            "contact",
                            e.target.value,
                            undefined,
                            "linkedin"
                          )
                        }
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <input
                        className="border rounded p-2 w-full"
                        value={formData.contact[0].github}
                        onChange={(e) =>
                          handleInputChange(
                            "contact",
                            e.target.value,
                            undefined,
                            "github"
                          )
                        }
                        placeholder="Github URL"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {formData.contact[0].phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-700" />
                        <p>{formData.contact[0].phone}</p>
                      </div>
                    )}
                    {formData.contact[0].email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-700" />
                        <p>{formData.contact[0].email}</p>
                      </div>
                    )}
                    {formData.contact[0].linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-gray-700" />
                        <Link
                          href={formData.contact[0].linkedin}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                        >
                          {formData.contact[0].linkedin}
                        </Link>
                      </div>
                    )}
                    {formData.contact[0].github && (
                      <div className="flex items-center gap-2">
                        <Github className="w-4 h-4 text-gray-700" />
                        <Link
                          href={formData.contact[0].github}
                          className="text-blue-600 hover:underline"
                          target="_blank"
                        >
                          {formData.contact[0].github}
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>

          {/* Summary Section */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">SUMMARY</h3>
            {isEditing ? (
              <textarea
                className="text-gray-800 leading-relaxed border rounded p-2 w-full"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                rows={4}
              />
            ) : (
              formData.summary && (
                <p className="text-gray-800 leading-[1.5]">
                  {formData.summary}
                </p>
              )
            )}
          </section>

          {/* Skills Section */}
          {formData.skills && formData.skills.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">SKILLS</h3>
              {isEditing
                ? formData.skills.map((skillCategory, index) => (
                    <div
                      key={index}
                      className="mb-4 flex flex-row-reverse justify-between items-start"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeSkill(skillCategory.id)}
                        className="p-2 ml-5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                      <div className="w-full flex flex-col">
                        <input
                          type="text"
                          className="border rounded p-2 text-gray-700 font-semibold"
                          value={skillCategory.category}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index].category = e.target.value;
                            handleInputChange("skills", updatedSkills);
                          }}
                          placeholder="Category Name"
                        />
                        <input
                          type="text"
                          className="border rounded p-2 text-gray-700 mt-2"
                          value={skillCategory.items.join(", ")}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index].items = e.target.value
                              .split(",")
                              .map((item) => item.trim());
                            handleInputChange("skills", updatedSkills);
                          }}
                          placeholder={`Skills for ${skillCategory.category} (comma-separated)`}
                        />
                      </div>
                    </div>
                  ))
                : (() => {
                    const visibleSkills = formData.skills.filter(
                      (skillCategory) =>
                        skillCategory.category && skillCategory.items.length > 0
                    );

                    return visibleSkills.length > 0 ? (
                      <div>
                        {visibleSkills.map((skillCategory, index) => (
                          <div
                            key={index}
                            className="flex justify-start items-start mb-2"
                          >
                            <ul className="list-disc pl-5 w-[30%]">
                              <li className="font-semibold">
                                {skillCategory.category}
                              </li>
                            </ul>
                            <div className="w-[70%] flex flex-wrap gap-1">
                              {skillCategory.items.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="text-sm leading-tight"
                                >
                                  {skill}
                                  {skillIndex !==
                                    skillCategory.items.length - 1 && ","}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}
            </section>
          )}

          {/* Education Section */}
          {formData.education && formData.education.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">EDUCATION</h3>
              {isEditing
                ? formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start"
                    >
                      <div className="w-full">
                        <input
                          className="font-medium text-gray-900 border rounded p-2"
                          value={edu.school}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              e.target.value,
                              index,
                              "school"
                            )
                          }
                          placeholder="School"
                        />
                        <input
                          className="text-gray-600 border rounded p-2"
                          value={edu.degree}
                          onChange={(e) =>
                            handleInputChange(
                              "education",
                              e.target.value,
                              index,
                              "degree"
                            )
                          }
                          placeholder="Degree"
                        />
                      </div>
                      <input
                        className="text-sm text-gray-600 border rounded p-2 w-24"
                        value={edu.duration}
                        onChange={(e) =>
                          handleInputChange(
                            "education",
                            e.target.value,
                            index,
                            "duration"
                          )
                        }
                        placeholder="Duration"
                      />
                    </div>
                  ))
                : (() => {
                    const validEducation = formData.education.filter(
                      (edu) => edu.school && edu.degree
                    );

                    return validEducation.length > 0 ? (
                      <>
                        {validEducation.map((edu, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-start"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {edu.school}
                              </h4>
                              <p className="text-gray-600">{edu.degree}</p>
                            </div>
                            {edu.duration && (
                              <span className="text-sm text-gray-600">
                                {edu.duration}
                              </span>
                            )}
                          </div>
                        ))}
                      </>
                    ) : null;
                  })()}
            </section>
          )}

          {/* Experience Section */}
          {formData.experience && formData.experience.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">EXPERIENCE</h3>
              {isEditing
                ? formData.experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <input
                            className="font-medium text-gray-900 border rounded p-2"
                            value={exp.position}
                            onChange={(e) =>
                              handleInputChange(
                                "experience",
                                e.target.value,
                                index,
                                "position"
                              )
                            }
                            placeholder="Position"
                          />
                          <input
                            className="text-gray-600 border rounded p-2"
                            value={exp.company}
                            onChange={(e) =>
                              handleInputChange(
                                "experience",
                                e.target.value,
                                index,
                                "company"
                              )
                            }
                            placeholder="Company"
                          />
                        </div>
                        <input
                          className="text-sm text-gray-600 border rounded p-2 w-24"
                          value={exp.duration}
                          onChange={(e) =>
                            handleInputChange(
                              "experience",
                              e.target.value,
                              index,
                              "duration"
                            )
                          }
                          placeholder="Duration"
                        />
                      </div>
                      <textarea
                        className="text-gray-700 border rounded p-2 w-full"
                        value={exp.description.join("\n")}
                        onChange={(e) =>
                          handleInputChange(
                            "experience",
                            e.target.value.split("\n"),
                            index,
                            "description"
                          )
                        }
                        placeholder="Description (one per line)"
                        rows={4}
                      />
                    </div>
                  ))
                : (() => {
                    const validExperiences = formData.experience.filter(
                      (exp) => exp.position && exp.company
                    );

                    return validExperiences.length > 0 ? (
                      <>
                        {validExperiences.map((exp, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {exp.position}
                                </h4>
                                <p className="text-gray-600">{exp.company}</p>
                              </div>
                              <span className="text-sm text-gray-600">
                                {exp.duration}
                              </span>
                            </div>
                            {exp.description.length > 0 && (
                              <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {exp.description.map((desc, i) => (
                                  <li key={i}>{desc}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </>
                    ) : null;
                  })()}
            </section>
          )}

          {/* Projects Section */}
          {formData.projects && formData.projects.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-lg font-semibold">PROJECTS</h3>
              {isEditing
                ? formData.projects.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <input
                        className="font-medium text-gray-900 border rounded p-2"
                        value={project.name}
                        onChange={(e) =>
                          handleInputChange(
                            "projects",
                            e.target.value,
                            index,
                            "name"
                          )
                        }
                        placeholder="Project Name"
                      />
                      <textarea
                        className="text-gray-700 border rounded p-2 w-full"
                        value={project.description}
                        onChange={(e) =>
                          handleInputChange(
                            "projects",
                            e.target.value,
                            index,
                            "description"
                          )
                        }
                        placeholder="Description"
                        rows={4}
                      />
                      <input
                        className="font-medium text-gray-900 border rounded p-2"
                        value={project.liveLink}
                        onChange={(e) =>
                          handleInputChange(
                            "projects",
                            e.target.value,
                            index,
                            "liveLink"
                          )
                        }
                        placeholder="Project's Live Link"
                      />
                      <input
                        className="text-xs text-gray-600 border rounded p-2"
                        value={project.tech.join(", ")}
                        onChange={(e) =>
                          handleInputChange(
                            "projects",
                            e.target.value.split(", "),
                            index,
                            "tech"
                          )
                        }
                        placeholder="Technologies (comma-separated)"
                      />
                    </div>
                  ))
                : (() => {
                    const validProjects = formData.projects.filter(
                      (project) => project.name && project.description
                    );

                    return validProjects.length > 0 ? (
                      <>
                        {validProjects.map((project, index) => (
                          <div key={index} className="space-y-2">
                            <h4 className="font-medium text-gray-900">
                              {project.name}
                            </h4>
                            <p className="text-gray-700">
                              {project.description}
                            </p>
                            {project.liveLink && (
                              <Link
                                href={project.liveLink}
                                target="_blank"
                                className="font-medium text-gray-900 underline"
                              >
                                {project.liveLink}
                              </Link>
                            )}
                            {project.tech && project.tech.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {project.tech.map((tech, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="text-xs text-gray-600 border-gray-300"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </>
                    ) : null;
                  })()}
            </section>
          )}

          {/* Achievements Section */}
          <section className="space-y-2">
            <h3 className="text-lg font-semibold">ACHIEVEMENTS</h3>
            {isEditing ? (
              <textarea
                className="text-gray-700 border rounded p-2 w-full"
                value={(formData.achievements || []).join("\n")}
                onChange={(e) => {
                  const lines = e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);
                  handleInputChange("achievements", lines);
                }}
                placeholder="Achievements (one per line)"
                rows={5}
              />
            ) : (
              (() => {
                const validAchievements = (formData.achievements || []).filter(
                  (achievement) => achievement.trim().length > 0
                );

                return validAchievements.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {validAchievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                ) : null;
              })()
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplateTwo;
