"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Resume {
  content: {
    id: string;
    resumeId: string;
    name: string;
    title: string;
    summary: string;
    feSkills: string[];
    beSkills: string[];
    db: string[];
    lang: string[];
    apiDev: string[];
    versionCon: string[];
    skills: {
      category: string;
      items: string[];
    }[]; // Modified skills structure
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

const ResumeTemplateOne = ({ resume, isEditing, setData }: { resume: Resume, isEditing: boolean, setData: any }) => {
  const data = resume?.content?.[0];

  if (!data) return <p className="text-center text-muted-foreground">No resume data available</p>;
  console.log(data)
  // Initialize formData with the modified skills structure
  const [formData, setFormData] = useState({
    name: data.name || "",
    title: data.title || "",
    summary: data.summary || "",
    skills: data.skills || [],
    contact: data.contact || [],
    experience: data.experince || [],
    education: data.education || [],
    projects: data.projects || [],
    achievements: data.achievements || [],
    certifications: data.certificate || [],
  });


  const handleInputChange = (field: string, value: any, index?: number, subField?: string) => {
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
            .map((item) => item.trim()) // Trim spaces
            .filter((item) => item.length > 0); // Remove empty strings

          // Convert [""] to []
          if (updatedValue.length === 0) {
            updatedValue = [];
          }
        } else if (Array.isArray(value)) {
          updatedValue = value.filter((item) => item !== ""); // Ensure empty strings are removed
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

  return (
    <div className="w-full mx-auto bg-white text-black p-8 rounded-xl space-y-6">
      {/* Header Section */}
      <header className="text-center w-full space-y-2">
        {isEditing ? (
          <input
            className="text-3xl font-bold w-full text-center"
            value={formData.name}
            placeholder="Your Name"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-bold">{formData.name}</h1>
        )}
        {isEditing ? (
          <input
            className="text-xl text-gray-600 w-full text-center"
            value={formData.title}
            placeholder="Job Title"
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        ) : (
          <h2 className="text-xl text-gray-600">{formData.title}</h2>
        )}

        {formData.contact && formData.contact.length > 0 && (
          <div className="flex justify-center w-full items-center gap-4 text-sm text-gray-700">
            {isEditing ? (
              <>
                <input
                  className="text-sm w-full text-gray-700"
                  value={formData.contact[0].email}
                  onChange={(e) => handleInputChange("contact", e.target.value, undefined, "email")}
                  placeholder="Email"
                />
                <input
                  className="text-sm w-full text-gray-700"
                  value={formData.contact[0].phone}
                  onChange={(e) => handleInputChange("contact", e.target.value, undefined, "phone")}
                  placeholder="Phone"
                />
                <input
                  className="text-sm w-full underline text-gray-700"
                  value={formData.contact[0].linkedin}
                  onChange={(e) => handleInputChange("contact", e.target.value, undefined, "linkedin")}
                  placeholder="LinkedIn URL"
                />
                <input
                  className="text-sm w-full underline text-gray-700"
                  value={formData.contact[0].github}
                  onChange={(e) => handleInputChange("contact", e.target.value, undefined, "github")}
                  placeholder="GitHub URL"
                />
              </>
            ) : (
              <>
                {formData.contact[0].email && <span>{formData.contact[0].email}</span>}
                {formData.contact[0].phone && <span>{formData.contact[0].phone}</span>}
                {formData.contact[0].linkedin && (
                  <Link href={formData.contact[0].linkedin} className="text-blue-600 hover:underline" target="_blank">
                    LinkedIn
                  </Link>
                )}
                {formData.contact[0].github && (
                  <Link href={formData.contact[0].github} className="text-blue-600 hover:underline" target="_blank">
                    GitHub
                  </Link>
                )}
              </>
            )}
          </div>
        )}
        <hr />
      </header>

      {/* Summary Section */}
      <>
        <section className="space-y-1">
          {formData.summary && !isEditing && <h3 className="text-xl font-semibold">Professional Summary</h3>}
          {isEditing ? (
            <>
              <h3 className="text-xl font-semibold">Professional Summary</h3>
              <textarea
                className="text-gray-800 leading-relaxed w-full"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
              />
              <hr />
            </>
          ) : (
            formData.summary && <>
              <p className="text-gray-800 leading-[1.5]">{formData.summary}</p>
              <hr />
            </>
          )}
        </section>
      </>

      {/* Skills Section */}
      {formData.skills && formData.skills.length > 0 && (
        <section className="space-y-2">
          {/* Editing Mode */}
          {isEditing ? (
            <>
              <h3 className="text-xl font-semibold">Skills</h3>
              <div>
                {formData.skills.map((skillCategory, index) => (
                  skillCategory.category && (
                    <div key={index} className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        {skillCategory.category}
                      </label>
                      <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  )
                ))}
              </div>
              <hr />
            </>
          ) : (
            // Non-Editing Mode
            (() => {
              // Filter out categories with empty `items`
              const visibleSkills = formData.skills.filter(
                (skillCategory) => skillCategory.category && skillCategory.items.length > 0
              );

              return visibleSkills.length > 0 ? (
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-1">Skills</h3>
                  <div className="w-full mb-3">
                    {visibleSkills.map((skillCategory, index) => (
                      <div key={index} className="flex justify-center items-center w-full">
                        <ul className="list-disc pl-5 w-[50%] min-w-fit">
                          <li className="font-semibold">{skillCategory.category}</li>
                        </ul>
                        <div className="w-full flex flex-wrap gap-2">
                          {skillCategory.items.map((skill, skillIndex) => (
                            <span key={skillIndex} className="text-sm">
                              {skill}
                              {skillIndex !== skillCategory.items.length - 1 && ","}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr />
                </div>
              ) : null;
            })()
          )}
        </section>
      )}


      {/* Experience Section */}
      {formData.experience && formData.experience.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xl font-semibold">Experience</h3>

          {isEditing ? (
            // Editing Mode - Show All Experiences
            formData.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between w-full items-start">
                  <div>
                    <input
                      className="font-medium text-gray-900 w-full"
                      value={exp.position}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value, index, "position")
                      }
                      placeholder="Position"
                    />
                    <input
                      className="text-gray-600 w-full"
                      value={exp.company}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value, index, "company")
                      }
                      placeholder="Company"
                    />
                  </div>
                  <input
                    className="text-sm text-gray-600"
                    value={exp.duration}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value, index, "duration")
                    }
                    placeholder="Duration"
                  />
                </div>
                <textarea
                  className="text-gray-700 w-full"
                  value={exp.description.join("\n")}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value.split("\n"), index, "description")
                  }
                  placeholder="Description (one per line)"
                />
                <hr />
              </div>
            ))
          ) : (
            // Non-Editing Mode - Filter Empty Entries
            (() => {
              const validExperiences = formData.experience.filter(
                (exp) => exp.position && exp.company
              );

              return validExperiences.length > 0 ? (
                <>
                  {validExperiences.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between w-full items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{exp.position}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-600">{exp.duration}</span>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {exp.description.map((desc, i) => (
                            <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      )}
                      <hr />
                    </div>
                  ))}
                </>
              ) : null;
            })()
          )}
        </section>
      )}


      {/* Projects Section */}
      {formData.projects && formData.projects.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Projects</h3>

            {isEditing ? (
              // Editing Mode - Show All Projects
              formData.projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <input
                    className="font-medium text-gray-900 w-full"
                    value={project.name}
                    onChange={(e) =>
                      handleInputChange("projects", e.target.value, index, "name")
                    }
                    placeholder="Project Name"
                  />
                  <textarea
                    className="text-gray-700 w-full"
                    value={project.description}
                    onChange={(e) =>
                      handleInputChange("projects", e.target.value, index, "description")
                    }
                    placeholder="Description"
                  />
                  <input
                    className="font-medium text-gray-900 w-full"
                    value={project.liveLink}
                    onChange={(e) =>
                      handleInputChange("projects", e.target.value, index, "liveLink")
                    }
                    placeholder="Project's Live Link"
                  />
                  <input
                    className="text-xs text-gray-600 w-full"
                    value={project.tech.join(", ")}
                    onChange={(e) =>
                      handleInputChange("projects", e.target.value.split(", "), index, "tech")
                    }
                    placeholder="Technologies (comma-separated)"
                  />
                </div>
              ))
            ) : (
              // Non-Editing Mode - Filter Empty Projects
              (() => {
                const validProjects = formData.projects.filter(
                  (project) => project.name && project.description
                );

                return validProjects.length > 0 ? (
                  <>
                    {validProjects.map((project, index) => (
                      <div key={index} className="">
                        <li>
                          <ul className="font-medium mb-1 text-gray-900 inline-block ml-[-8px]">
                            {project.name}
                          </ul>
                        </li>
                        <p className="text-gray-700 mb-2">{project.description}</p>
                        {project.liveLink && (
                          <Link
                            href={project.liveLink}
                            target="_blank"
                            className="font-medium text-gray-900"
                          >
                            Live Demo: <span className="underline">{project.name}</span>
                          </Link>
                        )}
                        {project.tech && project.tech.length > 0 && (
                          <div className="flex flex-wrap mt-2 gap-2">
                            {project.tech.map((tech, i) => (
                              <Badge key={i} variant="outline" className="text-xs text-gray-600">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ) : null;
              })()
            )}
          </section>
          <hr />
        </>
      )}


      {/* Achievements Section */}
      <>
        <section className="space-y-2">
          {isEditing ? (
            <>
              <h3 className="text-xl font-semibold">Achievements</h3>
              <textarea
                className="text-gray-700 w-full"
                value={(formData.achievements || []).join("\n")}
                onChange={(e) => {
                  const lines = e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);
                  handleInputChange("achievements", lines);
                }}
                placeholder="Achievements (one per line)"
                rows={5} // Ensures enough visible rows for multiline input
              />
              <hr />
            </>
          ) : (
            (() => {
              const validAchievements = (formData.achievements || []).filter(
                (achievement) => achievement.trim().length > 0
              );

              return validAchievements.length > 0 ? (
                <>
                  <h3 className="text-xl font-semibold">Achievements</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {validAchievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                  <hr />
                </>
              ) : null;
            })()
          )}
        </section>
      </>


      {/* Certifications Section */}
      {formData.certifications && formData.certifications.length > 0 && (
        <section className="space-y-2 w-full">
          {/* Editing Mode */}
          {isEditing ? (
            <>
              <h3 className="text-xl font-semibold">Certifications</h3>
              <div>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex w-full justify-between items-start">
                    <input
                      className="font-medium text-gray-900 w-full"
                      value={cert.name || ""}
                      onChange={(e) => handleInputChange("certifications", e.target.value, index, "name")}
                      placeholder="Certification Name"
                    />
                    <input
                      className="text-sm text-gray-600"
                      value={cert.date || ""}
                      onChange={(e) => handleInputChange("certifications", e.target.value, index, "date")}
                      placeholder="Date"
                    />
                  </div>
                ))}
              </div>
              <hr />
            </>
          ) : (
            // Non-Editing Mode
            (() => {
              // Filter out certifications with empty `name` or `date`
              const visibleCertifications = formData.certifications.filter(
                (cert) => cert.name?.trim() !== "" && cert.date?.trim() !== ""
              );

              return visibleCertifications.length > 0 ? (
                <div className="w-full">
                  <h3 className="text-xl font-semibold mb-1">Certifications</h3>
                  <div className="w-full mb-3">
                    {visibleCertifications.map((cert, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">{cert.name}</h4>
                        <span className="text-sm text-gray-600">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                  <hr />
                </div>
              ) : null;
            })()
          )}
        </section>
      )}



      {/* Education Section */}
      {formData.education && formData.education.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Education</h3>

            {isEditing ? (
              // Editing Mode - Show All Fields
              formData.education.map((edu, index) => (
                <div key={index} className="flex w-full justify-between items-start">
                  <div className="w-full">
                    <input
                      className="font-medium text-gray-900 w-full"
                      value={edu.school}
                      onChange={(e) =>
                        handleInputChange("education", e.target.value, index, "school")
                      }
                      placeholder="School"
                    />
                    <input
                      className="text-gray-600 w-full"
                      value={edu.degree}
                      onChange={(e) =>
                        handleInputChange("education", e.target.value, index, "degree")
                      }
                      placeholder="Degree"
                    />
                  </div>
                  <input
                    className="text-sm text-gray-600 w-[120px]"
                    value={edu.duration}
                    onChange={(e) =>
                      handleInputChange("education", e.target.value, index, "duration")
                    }
                    placeholder="Duration"
                  />
                </div>
              ))
            ) : (
              // Non-Editing Mode - Filter Empty Entries
              (() => {
                const validEducation = formData.education.filter(
                  (edu) => edu.school && edu.degree
                );

                return validEducation.length > 0 ? (
                  <>
                    {validEducation.map((edu, index) => (
                      <div key={index} className="flex w-full justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{edu.school}</h4>
                          <p className="text-gray-600">{edu.degree}</p>
                        </div>
                        {edu.duration && (
                          <span className="text-sm text-gray-600">{edu.duration}</span>
                        )}
                      </div>
                    ))}
                  </>
                ) : null;
              })()
            )}
          </section>
        </>
      )}

    </div>
  );
};

export default ResumeTemplateOne;