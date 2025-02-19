"use client";

import ResumeDisplay from "@/components/ResumeDisplay";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Resume = ({ resume }: { resume: any }) => {
  const router = useRouter()

  const handleClick = () => {
    window.print()
  }
  
  return (
    <div className="min-h-screen relative bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="no-print flex absolute right-5 top-5 gap-4 items-center justify-center">
        <Button onClick={() => router.push("/dashboard")} className="capitalize" variant={"secondary"}>Go to dashboard</Button>
        <Button onClick={handleClick} className="capitalize" variant={"default"}>Download</Button>
      </div>
      <div className="no-print max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Your Resume is Ready
          </h1>
          <p className="text-muted-foreground">
            Select a template that best represents your professional journey
          </p>
        </div>

      </div>
      <div className="print flex flex-col justify-center items-center">
        {/* Right column - Selected resume */}
        <div className="lg:w-2/3">
          <ResumeDisplay resume={resume} />
        </div>
      </div>
    </div>
  );
};

export default Resume;
