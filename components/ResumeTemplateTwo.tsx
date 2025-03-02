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
    skills: { category: string; items: string[] }[];
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
    education: { school: string; degree: string; duration: string }[];
    projects: {
      name: string;
      description: string;
      tech: string[];
      liveLink: string;
    }[];
    achievements: string[];
    certificate: { name?: string; date?: string }[];
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
    name: data.name || "",
    title: data.title || "",
    summary: data.summary || "",
    skills: data.skills || [],
    contact: data.contact || [],
    education: data.education || [],
    projects: data.projects || [],
    achievements: data.achievements || [],
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
        const updatedValue =
          typeof value === "string"
            ? value
                .split(",")
                .map((item) => item.trim())
                .filter((item) => item.length > 0)
            : Array.isArray(value)
            ? value.filter((item) => item !== "")
            : [];
        return { ...prev, [field]: updatedValue };
      }

      return { ...prev, [field]: value };
    });
  };

  useEffect(() => {
    setData(formData);
  }, [formData, setData]);

  return (
    <div className="w-full mx-auto bg-white text-black p-8 rounded-xl grid grid-cols-10 gap-6">
      {/* Left Column - 30% */}
      <div className="col-span-3 border-r-[1px] border-black space-y-6">
        {/* Name */}
        <div className="space-y-2">
          {isEditing ? (
            <input
              className="text-2xl font-bold w-full"
              value={formData.name}
              placeholder="Your Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          ) : (
            <h1 className="text-2xl font-bold">{formData.name}</h1>
          )}
          {isEditing ? (
            <input
              className="text-lg text-gray-600 w-full"
              value={formData.title}
              placeholder="Job Title"
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          ) : (
            <h2 className="text-lg text-gray-600">{formData.title}</h2>
          )}
        </div>

        <hr />

        {/* Contact Info */}
        {formData.contact && formData.contact.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  className="text-sm w-full text-gray-700"
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
                <input
                  className="text-sm w-full text-gray-700"
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
                <input
                  className="text-sm w-full text-gray-700"
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
                <input
                  className="text-sm w-full text-gray-700"
                  value={formData.contact[0].github}
                  onChange={(e) =>
                    handleInputChange(
                      "contact",
                      e.target.value,
                      undefined,
                      "github"
                    )
                  }
                  placeholder="GitHub URL"
                />
              </div>
            ) : (
              <div className="space-y-1 text-sm text-gray-700">
                {formData.contact[0].email && (
                  <p>{formData.contact[0].email}</p>
                )}
                {formData.contact[0].phone && (
                  <p>{formData.contact[0].phone}</p>
                )}
                {formData.contact[0].linkedin && (
                  <Link
                    href={formData.contact[0].linkedin}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                )}
                {formData.contact[0].github && (
                  <Link
                    href={formData.contact[0].github}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                  >
                    GitHub
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {formData.contact && formData.contact.length > 0 && <hr />}

        {/* Skills */}
        {formData.skills && formData.skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Skills</h3>
            {isEditing
              ? formData.skills.map(
                  (skillCategory, index) =>
                    skillCategory.category && (
                      <div key={index} className="space-y-1">
                        <label className="text-sm font-semibold">
                          {skillCategory.category}
                        </label>
                        <input
                          type="text"
                          className="w-full text-sm border rounded p-1"
                          value={skillCategory.items.join(", ")}
                          onChange={(e) => {
                            const updatedSkills = [...formData.skills];
                            updatedSkills[index].items = e.target.value
                              .split(",")
                              .map((item) => item.trim());
                            handleInputChange("skills", updatedSkills);
                          }}
                          placeholder={`Skills (comma-separated)`}
                        />
                      </div>
                    )
                )
              : formData.skills
                  .filter((skill) => skill.items.length > 0)
                  .map((skillCategory, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-semibold text-sm">
                        {skillCategory.category}
                      </p>
                      <p className="text-sm text-gray-700">
                        {skillCategory.items.join(", ")}
                      </p>
                    </div>
                  ))}
          </div>
        )}
        {formData.skills && formData.skills.length > 0 && <hr />}
        {/* Certifications */}
        {formData.certifications && formData.certifications.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Certifications</h3>
            {isEditing
              ? formData.certifications.map((cert, index) => (
                  <div key={index} className="space-y-1">
                    <input
                      className="text-sm w-full"
                      value={cert.name || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "certifications",
                          e.target.value,
                          index,
                          "name"
                        )
                      }
                      placeholder="Certification Name"
                    />
                    <input
                      className="text-sm w-full text-gray-600"
                      value={cert.date || ""}
                      onChange={(e) =>
                        handleInputChange(
                          "certifications",
                          e.target.value,
                          index,
                          "date"
                        )
                      }
                      placeholder="Date"
                    />
                  </div>
                ))
              : formData.certifications
                  .filter((cert) => cert.name && cert.date)
                  .map((cert, index) => (
                    <div key={index}>
                      <p className="text-sm font-medium">{cert.name}</p>
                      <p className="text-xs text-gray-600">{cert.date}</p>
                    </div>
                  ))}
          </div>
        )}
        {formData.certifications && formData.certifications.length > 0 && (
          <hr />
        )}
      </div>

      {/* Right Column - 70% */}
      <div className="col-span-7 space-y-6">
        {/* Professional Summary */}
        {formData.summary && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Professional Summary</h3>
            {isEditing ? (
              <textarea
                className="text-gray-800 w-full border rounded p-2"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                rows={4}
              />
            ) : (
              <p className="text-gray-800 leading-relaxed">
                {formData.summary}
              </p>
            )}
          </div>
        )}
        {formData.summary && <hr />}

        {/* Projects */}
        {formData.projects && formData.projects.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Projects</h3>
            {isEditing
              ? formData.projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <input
                      className="font-medium w-full"
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
                      className="text-gray-700 w-full border rounded p-2"
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
                    />
                    <input
                      className="w-full text-sm"
                      value={project.liveLink}
                      onChange={(e) =>
                        handleInputChange(
                          "projects",
                          e.target.value,
                          index,
                          "liveLink"
                        )
                      }
                      placeholder="Live Link"
                    />
                    <input
                      className="text-sm w-full text-gray-600"
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
              : formData.projects
                  .filter((project) => project.name && project.description)
                  .map((project, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium text-gray-900">
                        {project.name}
                      </h4>
                      <p className="text-gray-700">{project.description}</p>
                      {project.liveLink && (
                        <Link
                          href={project.liveLink}
                          target="_blank"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Live Demo
                        </Link>
                      )}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs text-gray-600"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
          </div>
        )}
        {formData.projects && formData.projects.length > 0 && <hr />}

        {/* Achievements */}
        {formData.achievements && formData.achievements.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Achievements</h3>
            {isEditing ? (
              <textarea
                className="text-gray-700 w-full border rounded p-2"
                value={formData.achievements.join("\n")}
                onChange={(e) =>
                  handleInputChange(
                    "achievements",
                    e.target.value.split("\n").filter((line) => line.trim())
                  )
                }
                placeholder="Achievements (one per line)"
                rows={4}
              />
            ) : (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {formData.achievements
                  .filter((achievement) => achievement.trim())
                  .map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
              </ul>
            )}
          </div>
        )}
        {formData.achievements && formData.achievements.length > 0 && <hr />}

        {/* Education */}
        {formData.education && formData.education.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Education</h3>
            {isEditing
              ? formData.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <input
                      className="font-medium w-full"
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
                      className="text-gray-600 w-full"
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
                    <input
                      className="text-sm text-gray-600 w-full"
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
              : formData.education
                  .filter((edu) => edu.school && edu.degree)
                  .map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium text-gray-900">
                        {edu.school}
                      </h4>
                      <p className="text-gray-600">{edu.degree}</p>
                      {edu.duration && (
                        <p className="text-sm text-gray-600">{edu.duration}</p>
                      )}
                    </div>
                  ))}
          </div>
        )}
        {formData.education && formData.education.length > 0 && <hr />}
      </div>
    </div>
  );
};

export default ResumeTemplateTwo;
