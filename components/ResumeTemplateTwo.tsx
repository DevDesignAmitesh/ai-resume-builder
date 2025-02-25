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
    achievements?: string[];
    certificate?: {
      name?: string;
      date?: string;
    }[];
  }[];
}

const ResumeTemplateTwo = ({ resume, isEditing, setData }: { resume: Resume, isEditing: boolean, setData: any }) => {
  const data = resume?.content?.[0];

  if (!data) return <p className="text-center text-muted-foreground">No resume data available</p>;
  // Initialize formData with data from props where available, using dummy data for missing fields
  const [formData, setFormData] = useState({
    name: data.name || "John Doe",
    title: data.title || "Software Engineer",
    skills: [ // Default skills data in the desired structure
      {
        category: data.lang.length > 0 && "Programming Languages",
        items: data.lang ?? [],
      },
      {
        category: data.feSkills.length > 0 && "Frontend Skills",
        items: data.feSkills ?? [],
      },
      {
        category: data.beSkills.length > 0 && "Backend Skills",
        items: data.beSkills ?? [],
      },
      {
        category: data.db.length > 0 && "Database",
        items: data.db ?? [],
      },
      {
        category: data.apiDev.length > 0 && "Api Development",
        items: data.apiDev ?? [],
      },
      {
        category: data.versionCon.length > 0 && "Version Control",
        items: data.versionCon ?? [],
      }
    ],
    contact: data.contact && data.contact.length > 0 ? data.contact : [
      {
        email: "example@email.com",
        phone: "",
        linkedin: "",
        github: "github.com/username",
      },
    ],
    experience: data.experince || [
      {
        company: "Company Name",
        position: "Software Developer",
        duration: "Jan 2023 - Present",
        description: ["Developed web applications using modern frameworks.", "Collaborated with cross-functional teams."],
      },
    ],
    education: data.education || [
      {
        school: "University Name",
        degree: "Bachelor of Technology - Computer Science",
        duration: "Aug 2019 - May 2023",
      },
    ],
    projects: data.projects || [
      {
        name: "Project Name",
        description: "Developed a web application using React and Node.js.",
        tech: ["React", "Node.js", "MySQL"],
        liveLink: "",
      },
    ],
    achievements: data.achievements || [
      "Achieved top 10% in coding competition.",
      "Published a technical blog on modern development practices.",
    ],
    certifications: data.certificate || [
      {
        name: "Certified Developer - Framework",
        date: "January 2024",
      },
    ],
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
          // Handle comma-separated fields (e.g., skills, tech)
          if (field === "feSkills" || field === "beSkills" || field === "db" || field === "apiDev" || field === "versionCon" || field === "lang") {
            updatedValue = value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item.length > 0);
          } else {
            // Handle multiline fields (e.g., achievements) – split by newlines or use as-is
            updatedValue = value
              .split("\n")
              .map((item) => item.trim())
              .filter((item) => item.length > 0);
          }
        } else if (Array.isArray(value)) {
          // If value is already an array (e.g., from achievements), use it directly, filtering empty strings
          updatedValue = value.filter((item) => item !== "");
        } else {
          updatedValue = [];
        }

        // Ensure updatedValue is never empty for multiline fields like achievements
        if (field === "achievements" && updatedValue.length === 0) {
          updatedValue = [""]; // Default to an empty string to allow users to start typing
        }

        return { ...prev, [field]: updatedValue };
      }

      return { ...prev, [field]: value };
    });

    // Use the updated state from setFormData to ensure consistency
    setFormData((prev) => prev); // This ensures setData gets the latest state
    setData(formData); // Update external data with the latest formData
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
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-bold">{formData.name}</h1>
        )}
        {isEditing ? (
          <input
            className="text-xl text-gray-600 w-full text-center"
            value={formData.title}
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
      </header>

      <hr />

      {/* Skills Section */}
      {formData.skills && formData.skills.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Skills</h3>
            {isEditing ? (
              <div>
                {formData.skills.map((skillCategory, index) => (
                  skillCategory.category &&
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-bold mb-2">{skillCategory.category}</label>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={skillCategory.items.join(', ')}
                      onChange={(e) => {
                        const updatedSkills = [...formData.skills];
                        updatedSkills[index].items = e.target.value.split(',').map(item => item.trim());
                        handleInputChange("skills", updatedSkills);
                      }}
                      placeholder={`Skills for ${skillCategory.category} (comma-separated)`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full">
                {formData.skills.map((skillCategory, index) => (
                  <div key={index} className="flex justify-center items-center w-full">
                    {skillCategory.category &&
                      <ul className="list-disc pl-5 w-[50%] min-w-fit">
                        <li className="font-semibold">{skillCategory.category}</li>
                      </ul>}
                    <div className="w-full flex flex-wrap gap-2">
                      {skillCategory?.items?.map((skill, skillIndex) => (
                        <span key={skillIndex} className="text-sm">
                          {skill}
                          {skillIndex !== skillCategory.items.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Experience Section */}
      {formData.experience && formData.experience.length > 0 && (
        <>
          <hr />
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between w-full items-start">
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          className="font-medium text-gray-900 w-full"
                          value={exp.position || ""}
                          onChange={(e) => handleInputChange("experience", e.target.value, index, "position")}
                          placeholder="Position"
                        />
                        <input
                          className="text-gray-600 w-full"
                          value={exp.company || ""}
                          onChange={(e) => handleInputChange("experience", e.target.value, index, "company")}
                          placeholder="Company"
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium text-gray-900">{exp.position}</h4>
                        <p className="text-gray-600">{exp.company}</p>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      className="text-sm text-gray-600"
                      value={exp.duration || ""}
                      onChange={(e) => handleInputChange("experience", e.target.value, index, "duration")}
                      placeholder="Duration"
                    />
                  ) : (
                    <span className="text-sm text-gray-600">{exp.duration}</span>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    className="text-gray-700 w-full"
                    value={(exp.description || []).join("\n")}
                    onChange={(e: any) => handleInputChange("experience", e.target.value.split("\n"), index, "description")}
                    placeholder="Description (one per line)"
                  />
                ) : (
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {(exp.description || []).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <hr />
        </>
      )}

      {/* Projects Section */}
      {formData.projects && formData.projects.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-1">
                {isEditing ? (
                  <input
                    className="font-medium text-gray-900 w-full"
                    value={project.name || ""}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "name")}
                    placeholder="Project Name"
                  />
                ) : (
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                )}
                {isEditing ? (
                  <textarea
                    className="text-gray-700 w-full"
                    value={project.description || ""}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "description")}
                    placeholder="Description"
                  />
                ) : (
                  <p className="text-gray-700">{project.description}</p>
                )}
                {isEditing ? (
                  <input
                    className="font-medium text-gray-900 w-full"
                    value={project.liveLink || ""}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "liveLink")}
                    placeholder="Project's Live Link"
                  />
                ) : (
                  <Link href={project.liveLink || "#"} target="_blank" className="font-medium mb-1 text-gray-900">Live Demo: <span className="underline">{project.name}</span></Link>
                )}
                {project.tech && project.tech.length > 0 && (
                  isEditing ? (
                    <input
                      className="text-xs text-gray-600 w-full"
                      value={(project.tech || []).join(", ")}
                      onChange={(e: any) => handleInputChange("projects", e.target.value.split(", "), index, "tech")}
                      placeholder="Technologies (comma-separated)"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(project.tech || []).map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs text-gray-600">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </section>
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
                  const lines = e.target.value.split("\n").map(line => line.trim()).filter(line => line.length > 0);
                  handleInputChange("achievements", lines);
                }}
                placeholder="Achievements (one per line)"
                rows={5} // Optional: Ensure enough visible rows for multiline input
              />
            </>
          ) : (
            formData.achievements && formData.achievements.length > 0 &&
            <>
              <hr />
              <h3 className="text-xl font-semibold">Achievements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {(formData.achievements || []).map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </>
          )}
        </section>
        <hr />
      </>

      {/* Certifications Section */}
      {formData.certifications && formData.certifications.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Certifications</h3>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="flex w-full justify-between items-start">
                {isEditing ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                    <span className="text-sm text-gray-600">{cert.date}</span>
                  </>
                )}
              </div>
            ))}
          </section>
          <hr />
        </>
      )}

      {/* Education Section */}
      {formData.education && formData.education.length > 0 && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex w-full justify-between items-start">
                <div>
                  {isEditing ? (
                    <>
                      <input
                        className="font-medium text-gray-900 w-full"
                        value={edu.school || ""}
                        onChange={(e) => handleInputChange("education", e.target.value, index, "school")}
                        placeholder="School"
                      />
                      <input
                        className="text-gray-600 w-full"
                        value={edu.degree || ""}
                        onChange={(e) => handleInputChange("education", e.target.value, index, "degree")}
                        placeholder="Degree"
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium text-gray-900">{edu.school}</h4>
                      <p className="text-gray-600">{edu.degree}</p>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <input
                    className="text-sm text-gray-600"
                    value={edu.duration || ""}
                    onChange={(e) => handleInputChange("education", e.target.value, index, "duration")}
                    placeholder="Duration"
                  />
                ) : (
                  edu.duration && <span className="text-sm text-gray-600">{edu.duration}</span>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default ResumeTemplateTwo;