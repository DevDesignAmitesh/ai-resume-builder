"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { User, Briefcase, GraduationCap, List, Phone, FileText, Linkedin, Github } from "lucide-react";
import { createResume } from "@/app/api/actions/createResume";
import { useRouter } from "next/navigation";
import { aiResponse } from "@/lib/ai";
import { canCreateResume } from "@/app/api/actions/resumeLength";

interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

interface Education {
  school: string;
  degree: string;
  duration: string;
}

interface Project {
  name: string;
  description: string;
  tech: string[];
  liveLink: string;
}

interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface Content {
  name: string;
  title: string;
  contact: Contact;
  summary: string;
  experience: Experience[];
  education: Education[];
  feSkills: string[];
  beSkills: string[];
  db: string[];
  lang: string[];
  apiDev: string[];
  versionCon: string[];
  projects: Project[];
  jobPostDetails: string;
}

export interface FormData {
  content: Content;
}

const Index = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    content: {
      name: "",
      title: "",
      contact: {
        email: "",
        phone: "",
        linkedin: "",
        github: "",
      },
      summary: "",
      experience: [{
        company: "",
        position: "",
        duration: "",
        description: []
      }],
      education: [{
        school: "",
        degree: "",
        duration: ""
      }],
      feSkills: [],
      beSkills: [],
      db: [],
      apiDev: [],
      lang: [],
      versionCon: [],
      projects: [{
        name: "",
        description: "",
        tech: [],
        liveLink: ""
      }],
      jobPostDetails: ""
    }
  });

  const updateFormData = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData((prev: any) => ({
        ...prev,
        content: {
          ...prev.content,
          [parent]: {
            ...prev.content[parent as keyof Content],
            [child]: value
          }
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [field]: value
        }
      }));
    }
    localStorage.setItem("formData", JSON.stringify(formData))
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        if (!formData.content.name || !formData.content.contact.email) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in your name and email address.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 2:
        if (!formData.content.contact.email) {
          toast({
            title: "Required Fields Missing",
            description: "Please provide your contact information.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 4:
        if (!formData.content.summary || !formData.content.title) {
          toast({
            title: "Required Fields Missing",
            description: "Please fill in your professional summary and title.",
            variant: "destructive",
          });
          return false;
        }
        break;
      case 5:
        if (!formData.content.education[0].school || !formData.content.education[0].degree) {
          toast({
            title: "Required Fields Missing",
            description: "Please provide your educational background.",
            variant: "destructive",
          });
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;

    if (step < 7) { // Update from 6 to 7
      setStep(step + 1);
      localStorage.setItem("step", JSON.stringify(step + 1))
      setProgress((step / 7) * 100); // Update from 6 to 7
      localStorage.setItem("progress", JSON.stringify((step / 7) * 100))
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      localStorage.setItem("step", JSON.stringify(step - 1))
      setProgress(((step - 2) / 7) * 100); // Update from 6 to 7
      localStorage.setItem("progress", JSON.stringify(((step - 2) / 7) * 100))
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    setLoading(true)
    toast({
      title: "Processing your resume",
      description: "We're generating your professional resume...",
    });

    const canCreate = await canCreateResume(); // Use updated function

    if (!canCreate) {
      toast({
        title: "Free Limit Reached",
        description: "Get Our Premium To Generate More",
      });
      setLoading(false)
      return; // Stop execution if the limit is reached
    }

    let aiRes;
    try {
      aiRes = await aiResponse(formData)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Something went wrong",
        description: "Some error occured while creating resume",
      });
      return;
    }
    try {
      const res = await createResume(aiRes)
      if (res.message === "resume created successfully") {
        toast({
          title: "Resume processed",
          description: "Redirecting, to the preview page",
        });
        setLoading(false)
        router.push(`/preview/${res.resume?.id}`)
        localStorage.clear()
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Some error occured while creating resume",
      });
      setLoading(false)
      return;
    }

  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.content.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.content.contact.email}
                onChange={(e) => updateFormData("contact.email", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="github" className="flex items-center gap-2">
                <Github className="h-4 w-4" /> GitHub Profile
              </Label>
              <Input
                id="github"
                placeholder="Enter your GitHub profile URL"
                value={formData.content.contact.github}
                onChange={(e) => updateFormData("contact.github", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                placeholder="Enter your LinkedIn profile URL"
                value={formData.content.contact.linkedin}
                onChange={(e) => updateFormData("contact.linkedin", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                value={formData.content.contact.phone}
                onChange={(e) => updateFormData("contact.phone", e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="jobPostDetails">Job Post Details</Label>
              <Textarea
                id="jobPostDetails"
                placeholder="Paste the job post details here (optional)"
                className="h-32"
                value={formData.content.jobPostDetails}
                onChange={(e) => updateFormData("jobPostDetails", e.target.value)}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                placeholder="Enter your professional title"
                value={formData.content.title}
                onChange={(e) => updateFormData("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief professional summary"
                className="h-32"
                value={formData.content.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              {formData.content.education.map((edu, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <Input
                    placeholder="School name"
                    value={edu.school}
                    onChange={(e) => {
                      const newEducation = [...formData.content.education];
                      newEducation[index].school = e.target.value;
                      updateFormData("education", newEducation);
                    }}
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...formData.content.education];
                      newEducation[index].degree = e.target.value;
                      updateFormData("education", newEducation);
                    }}
                  />
                  <Input
                    placeholder="Duration"
                    value={edu.duration}
                    onChange={(e) => {
                      const newEducation = [...formData.content.education];
                      newEducation[index].duration = e.target.value;
                      updateFormData("education", newEducation);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newEducation = [...formData.content.education, { school: "", degree: "", duration: "" }];
                  updateFormData("education", newEducation);
                }}
              >
                Add Education
              </Button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="experience">Work Experience</Label>
              {formData.content.experience.map((exp, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <Input
                    placeholder="Company name"
                    value={exp.company}
                    onChange={(e) => {
                      const newExperience = [...formData.content.experience];
                      newExperience[index].company = e.target.value;
                      updateFormData("experience", newExperience);
                    }}
                  />
                  <Input
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => {
                      const newExperience = [...formData.content.experience];
                      newExperience[index].position = e.target.value;
                      updateFormData("experience", newExperience);
                    }}
                  />
                  <Input
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => {
                      const newExperience = [...formData.content.experience];
                      newExperience[index].duration = e.target.value;
                      updateFormData("experience", newExperience);
                    }}
                  />
                  <Textarea
                    placeholder="Description (one per line)"
                    value={exp.description.join("\n")}
                    onChange={(e) => {
                      const newExperience = [...formData.content.experience];
                      newExperience[index].description = e.target.value.split("\n");
                      updateFormData("experience", newExperience);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newExperience = [...formData.content.experience, { company: "", position: "", duration: "", description: [""] }];
                  updateFormData("experience", newExperience);
                }}
              >
                Add Experience
              </Button>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-2">
              <Label htmlFor="lang">Programming Languages</Label>
              <Input
                id="lang"
                placeholder="HTML, CSS, React.js, Next.js, Redux, Recoil..."

                value={formData.content.lang.join(",")}
                onChange={(e) => updateFormData("lang", e.target.value.split(","))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feSkills">Frontend Skills</Label>
              <Input
                id="feSkills"
                placeholder="HTML, CSS, React.js, Next.js, Redux, Recoil..."

                value={formData.content.feSkills.join(",")}
                onChange={(e) => updateFormData("feSkills", e.target.value.split(","))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beSkills">Backend Skills</Label>
              <Input
                id="beSkills"
                placeholder="Nodejs, Express.js, JWT, OAuth, NextAuth..."

                value={formData.content.beSkills.join("\n")}
                onChange={(e) => updateFormData("beSkills", e.target.value.split("\n"))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db">Database</Label>
              <Input
                id="db"
                placeholder="PostgreSQL, MongoDB, Redis...."

                value={formData.content.db.join(",")}
                onChange={(e) => updateFormData("db", e.target.value.split(","))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiDev">Api Development</Label>
              <Input
                id="apiDev"
                placeholder="RESTful APIs, WebSockets..."

                value={formData.content.apiDev.join(",")}
                onChange={(e) => updateFormData("apiDev", e.target.value.split(","))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versionCon">Version Control</Label>
              <Input
                id="versionCon"
                placeholder="git, github, monorepos(turborepo)..."

                value={formData.content.versionCon.join(",")}
                onChange={(e) => updateFormData("versionCon", e.target.value.split(","))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projects">Projects</Label>
              {formData.content.projects.map((project, index) => (
                <div key={index} className="space-y-2 p-4 border rounded-lg">
                  <Input
                    placeholder="Project name"
                    value={project.name}
                    onChange={(e) => {
                      const newProjects = [...formData.content.projects];
                      newProjects[index].name = e.target.value;
                      updateFormData("projects", newProjects);
                    }}
                  />
                  <Textarea
                    placeholder="Project description"
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...formData.content.projects];
                      newProjects[index].description = e.target.value;
                      updateFormData("projects", newProjects);
                    }}
                  />
                  <Input
                    placeholder="Technologies used (comma-separated)"
                    value={project.tech.join(", ")}
                    onChange={(e) => {
                      const newProjects = [...formData.content.projects];
                      newProjects[index].tech = e.target.value.split(", ").map(t => t.trim());
                      updateFormData("projects", newProjects);
                    }}
                  />
                  <Input
                    placeholder="Project's live link"
                    value={project.liveLink}
                    onChange={(e) => {
                      const newProjects = [...formData.content.projects];
                      newProjects[index].liveLink = e.target.value;
                      updateFormData("projects", newProjects);
                    }}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newProjects = [...formData.content.projects, { name: "", description: "", tech: [""] }];
                  updateFormData("projects", newProjects);
                }}
              >
                Add Project
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")!);
    setFormData(data ?? {
      content: {
        name: "",
        title: "",
        contact: {
          email: "",
          phone: "",
          linkedin: "",
          github: "",
        },
        summary: "",
        experience: [{
          company: "",
          position: "",
          duration: "",
          description: []
        }],
        education: [{
          school: "",
          degree: "",
          duration: ""
        }],
        feSkills: [],
        beSkills: [],
        db: [],
        apiDev: [],
        lang: [],
        versionCon: [],
        projects: [{
          name: "",
          description: "",
          tech: [],
          liveLink: ""
        }],
        jobPostDetails: ""
      }
    })
    const step = Number(localStorage.getItem("step"))
    setStep(step === 0 ? 1 : step)
    const progress = Number(localStorage.getItem("progress"))
    setProgress(progress)
  }, [])

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div className="no-print flex absolute right-5 top-5 gap-4 items-center justify-center">
          <Button onClick={() => router.push("/dashboard")} className="capitalize" variant={"secondary"}>Go to dashboard</Button>
        </div>
        <Card className="w-full max-w-2xl glass">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">AI Resume Builder</CardTitle>
            <CardDescription>
              Create a professional resume in minutes with AI assistance
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6 justify-center">
              <div className={`flex items-center ${step === 1 ? "text-primary" : "text-muted-foreground"}`}>
                <User size={20} />
              </div>
              <div className={`flex items-center ${step === 2 ? "text-primary" : "text-muted-foreground"}`}>
                <Phone size={20} />
              </div>
              <div className={`flex items-center ${step === 3 ? "text-primary" : "text-muted-foreground"}`}>
                <FileText size={20} />
              </div>
              <div className={`flex items-center ${step === 4 ? "text-primary" : "text-muted-foreground"}`}>
                <GraduationCap size={20} />
              </div>
              <div className={`flex items-center ${step === 5 ? "text-primary" : "text-muted-foreground"}`}>
                <Briefcase size={20} />
              </div>
              <div className={`flex items-center ${step === 6 ? "text-primary" : "text-muted-foreground"}`}>
                <List size={20} />
              </div>
              <div className={`flex items-center ${step === 7 ? "text-primary" : "text-muted-foreground"}`}>
                <FileText size={20} /> {/* New icon for job post details */}
              </div>
            </div>

            {renderStep()}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
              >
                Back
              </Button>
              <Button
                disabled={loading}
                onClick={step === 7 ? handleSubmit : handleNext}
              >
                {step === 7 ? loading ? "Generating" : "Generate Resume" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
};

export default Index;