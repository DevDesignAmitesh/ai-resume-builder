"use client";

import LightResume from "@/components/LightResume";
import DarkResume from "@/components/DarkResume"; // Assuming you have the DarkResume component ready
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TemplateCard from "@/components/TemplateCard";
import { updateResume } from "@/app/api/actions/updateResume";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const Resume = ({ resume, isEditing, resumeId }: { resume: any, isEditing: boolean, resumeId: string }) => {
  const templates = [
    {
      title: "First Template",
      template: "first",
    },
    {
      title: "Second Template",
      template: "second",
    },
  ];

  const router = useRouter();

  // State to track the selected template
  const [selectedTemplate, setSelectedTemplate] = useState("first");
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = () => {
    window.print();
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      const res = await updateResume(resumeId, data);
      if (res.message === "Resume updated successfully") {
        toast({
          title: "Changes Saved",
        });
        setLoading(false)
        return;
      }
    } catch (error) {
      setLoading(false)
      return;
    } finally {
      setLoading(false)
      return;
    }
  };

  return (
    <div className="min-h-screen relative bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="no-print flex absolute right-5 top-5 gap-4 items-center justify-center">
        <Button onClick={() => router.push("/dashboard")} className="capitalize" variant={"secondary"}>
          Go to dashboard
        </Button>
        <Button disabled={isEditing && loading} onClick={isEditing ? handleSave : handleClick} className="capitalize" variant={"default"}>
          {isEditing ? loading ? "Saving" : "Save Changes" : "Download"}
        </Button>
      </div>

      <div className="max-w-7xl mx-auto">
        {!isEditing && <div className="no-print text-center mt-10 xl:mt-4 mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Your Resume is Ready</h1>
          <p className="text-muted-foreground">
            Select a template that best represents your professional journey
          </p>
        </div>}

        <div className={`flex w-full ${isEditing && "pt-6"} items-center lg:items-start justify-center lg:flex-row flex-col gap-8`}>
          {/* Left Section: Template Selection */}
          <div className="no-print w-full flex flex-col gap-4 lg:w-1/3">
            {templates.map((template) => (
              <TemplateCard
                key={template.template}
                title={template.title}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                template={template.template}
              />
            ))}
          </div>

          {/* Right Section: Resume Display */}
          <div className="print flex justify-center items-center w-full xl:w-2/3">
            {selectedTemplate === "first" ? (
              <LightResume isEditing={isEditing} setData={setData} resume={resume} />
            ) : (
              <div className="flex justify-center items-center">
                <p className="mt-20">Looking for another template...</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Resume;
