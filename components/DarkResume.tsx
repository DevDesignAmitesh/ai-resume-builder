"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface Resume {
  content: {
    id: string;
    resumeId: string;
    name: string;
    title: string;
    summary: string;
    skills: string[];
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
  }[];
}

const DarkResume = ({ resume, isEditing, setData }: { resume: Resume, isEditing: boolean, setData: any }) => {
  const data = resume?.content?.[0];

  if (!data) return <p className="text-center text-muted-foreground">No resume data available</p>;

  // State for all editable fields
  const [formData, setFormData] = useState({
    name: data.name || "John Doe",
    title: data.title || "Full Stack Developer",
    summary: data.summary || "",
    skills: data.skills || [],
    contact: data.contact || { email: "", phone: "", linkedin: "", github: "" },
    experince: data.experince || [],
    education: data.education || [],
    projects: data.projects || [],
  });

  const handleInputChange = (field: string, value: string, index?: number, subField?: string) => {
    setFormData((prev: any) => {
      if (index !== undefined && subField) {
        const updatedArray = [...prev[field as keyof typeof prev]];
        updatedArray[index] = { ...updatedArray[index], [subField]: value };
        return { ...prev, [field]: updatedArray };
      }
      if (field === "contact") {
        return { ...prev, contact: { ...prev.contact, [subField!]: value } };
      }
      return { ...prev, [field]: value };
    });
    setData(formData)
  };

  return (
    <div className="w-full glass mx-auto bg-background p-8 rounded-xl space-y-6">
      {/* Header Section */}
      <header className="text-center space-y-4">
        {isEditing ? (
          <input
            className="text-3xl bg-transparent font-bold text-foreground w-full text-center"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-bold text-foreground">{formData.name}</h1>
        )}
        {isEditing ? (
          <input
            className="text-xl bg-transparent text-muted-foreground w-full text-center"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        ) : (
          <h2 className="text-xl text-muted-foreground">{formData.title}</h2>
        )}

        {formData.contact && (
          <div className="flex justify-center items-center gap-4 text-sm">
            {isEditing ? (
              <>
                <input
                  className="text-sm bg-transparent w-full"
                  value={formData.contact[0].email}
                  onChange={(e) => handleInputChange("contact", e.target.value, 0, "email")}
                  placeholder="Email"
                />
                <input
                  className="text-sm bg-transparent w-full"
                  value={formData.contact[0].phone}
                  onChange={(e) => handleInputChange("contact", e.target.value, 0, "phone")}
                  placeholder="Phone"
                />
                <input
                  className="text-sm bg-transparent w-full"
                  value={formData.contact[0].linkedin}
                  onChange={(e) => handleInputChange("contact", e.target.value, 0, "linkedin")}
                  placeholder="LinkedIn URL"
                />
                <input
                  className="text-sm bg-transparent w-full"
                  value={formData.contact[0].github}
                  onChange={(e) => handleInputChange("contact", e.target.value, 0, "github")}
                  placeholder="GitHub URL"
                />
              </>
            ) : (
              <>
                {formData.contact[0].email && <span>{formData.contact[0].email}</span>}
                {formData.contact[0].phone && <span>{formData.contact[0].phone}</span>}
                {formData.contact[0].linkedin && (
                  <a href={formData.contact[0].linkedin} className="text-primary hover:underline" target="_blank">
                    LinkedIn
                  </a>
                )}
                {formData.contact[0].github && (
                  <a href={formData.contact[0].github} className="text-primary hover:underline" target="_blank">
                    GitHub
                  </a>
                )}
              </>
            )}
          </div>
        )}
      </header>

      <Separator className="border-t border-muted-foreground" />

      {/* Summary Section */}
      {formData.summary && (
        <>
          <section className="space-y-2">
            <h3 className="text-xl font-semibold">Professional Summary</h3>
            {isEditing ? (
              <textarea
                className="text-muted-foreground bg-transparent leading-relaxed w-full"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
              />
            ) : (
              <p className="text-muted-foreground leading-relaxed">{formData.summary}</p>
            )}
          </section>
          <Separator className="border-t border-muted-foreground" />
        </>
      )}

      {/* Skills Section */}
      {formData.skills && formData.skills.length > 0 && (
        <>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Skills</h3>
            {isEditing ? (
              <input
                className="text-sm bg-transparent w-full"
                value={formData.skills.join(", ")}
                onChange={(e: any) => handleInputChange("skills", e.target.value.split(", "))}
                placeholder="Skills (comma-separated)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </section>
          <Separator className="border-t border-muted-foreground" />
        </>
      )}

      {/* Experience Section */}
      {formData.experince && formData.experince.length > 0 && (
        <>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Experience</h3>
            {formData.experince.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    {isEditing ? (
                      <>
                        <input
                          className="font-medium bg-transparent text-foreground w-full"
                          value={exp.position}
                          onChange={(e) => handleInputChange("experince", e.target.value, index, "position")}
                          placeholder="Position"
                        />
                        <input
                          className="text-muted-foreground bg-transparent w-full"
                          value={exp.company}
                          onChange={(e) => handleInputChange("experince", e.target.value, index, "company")}
                          placeholder="Company"
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="font-medium text-foreground">{exp.position}</h4>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </>
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      className="text-sm bg-transparent text-muted-foreground"
                      value={exp.duration}
                      onChange={(e) => handleInputChange("experince", e.target.value, index, "duration")}
                      placeholder="Duration"
                    />
                  ) : (
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    className="text-muted-foreground bg-transparent w-full"
                    value={exp.description.join("\n")}
                    onChange={(e: any) => handleInputChange("experince", e.target.value.split("\n"), index, "description")}
                    placeholder="Description (one per line)"
                  />
                ) : (
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
          <Separator className="border-t border-muted-foreground" />
        </>
      )}

      {/* Projects Section */}
      {formData.projects && formData.projects.length > 0 && (
        <>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Projects</h3>
            {formData.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                {isEditing ? (
                  <input
                    className="font-medium bg-transparent text-foreground w-full"
                    value={project.name}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "name")}
                    placeholder="Project Name"
                  />
                ) : (
                  <h4 className="font-medium text-foreground">{project.name}</h4>
                )}
                {isEditing ? (
                  <textarea
                    className="text-muted-foreground bg-transparent w-full"
                    value={project.description}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "description")}
                    placeholder="Description"
                  />
                ) : (
                  <p className="text-muted-foreground">{project.description}</p>
                )}
                {isEditing ? (
                  <input
                    className="font-medium text-gray-900 w-full"
                    value={project.liveLink}
                    onChange={(e) => handleInputChange("projects", e.target.value, index, "liveLink")}
                    placeholder="Project's Live Link"
                  />
                ) : (
                  <h4 className="font-medium underline text-gray-900">{project.liveLink}</h4>
                )}
                {project.tech && project.tech.length > 0 && (
                  isEditing ? (
                    <input
                      className="text-xs bg-transparent text-muted-foreground w-full"
                      value={project.tech.join(", ")}
                      onChange={(e: any) => handleInputChange("projects", e.target.value.split(", "), index, "tech")}
                      placeholder="Technologies (comma-separated)"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}
          </section>
          <Separator className="border-t border-muted-foreground" />
        </>
      )}

      {/* Education Section */}
      {formData.education && formData.education.length > 0 && (
        <>
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  {isEditing ? (
                    <>
                      <input
                        className="font-medium bg-transparent text-foreground w-full"
                        value={edu.school}
                        onChange={(e) => handleInputChange("education", e.target.value, index, "school")}
                        placeholder="School"
                      />
                      <input
                        className="text-muted-foreground bg-transparent w-full"
                        value={edu.degree}
                        onChange={(e) => handleInputChange("education", e.target.value, index, "degree")}
                        placeholder="Degree"
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="font-medium text-foreground">{edu.school}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <input
                    className="text-sm bg-transparent text-muted-foreground"
                    value={edu.duration}
                    onChange={(e) => handleInputChange("education", e.target.value, index, "duration")}
                    placeholder="Duration"
                  />
                ) : (
                  edu.duration && <span className="text-sm text-muted-foreground">{edu.duration}</span>
                )}
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default DarkResume;