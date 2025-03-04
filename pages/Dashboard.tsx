"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Eye,
  FileText,
  MessageSquare,
  Trash,
  Pencil,
  Send,
} from "lucide-react";
import Link from "next/link";
import Templates from "@/components/Templates";
import { Toaster } from "@/components/ui/toaster";
import { deleteResume } from "@/app/api/actions/deleteResume";
import { useRouter } from "next/navigation";
import { addFeedback } from "@/app/api/actions/addFeedback";

const Dashboard = ({ content }: { content: any }) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const safeContent = Array.isArray(content) ? content.flat() : []; // Ensure it's an array

  const handleDelete = async (id: string) => {
    await deleteResume(id);
    router.refresh();
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      alert("Provide Some Feedback");
      return;
    }
    setLoading(true);
    const res = await addFeedback(feedback);

    if (res.message === "feedback added") {
      toast({
        title: "Thank you for your feedback!",
        description:
          "We appreciate your input and will use it to improve our service.",
      });
      setLoading(false);
      setFeedback("");
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start p-8 bg-background">
      {/* Feedback Button (Top-Right Corner) */}
      <div className="absolute flex flex-row-reverse gap-2 items-center justify-center top-8 right-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Give Feedback
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Textarea
                placeholder="Tell us what you think about our resume builder..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[150px]"
              />
              <div className="flex justify-end">
                <Button
                  disabled={loading}
                  onClick={handleFeedbackSubmit}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending Feedback" : "Send Feedback"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            router.push("/");
          }}
          variant={"default"}
        >
          Home
        </Button>
      </div>

      {/* Main Content Section */}
      <main className="w-full max-w-3xl space-y-12">
        {/* Header Section */}
        <header className="text-left mb-12">
          <h1 className="text-4xl font-bold mb-2">My Resumes</h1>
          <p className="text-muted-foreground">
            Create, manage, and track your resumes
          </p>
        </header>
        {/* Create New Resume Card */}
        <Link href="/generate">
          <Card className="p-8 hover:scale-[1.02] transition-transform duration-300 bg-secondary/50 border border-border/50">
            <div className="flex flex-col items-center justify-center space-y-4">
              <FileText className="w-12 h-12 text-primary" />
              <h2 className="text-2xl font-semibold">Create New Resume</h2>
              <p className="text-muted-foreground text-center">
                Start building your professional resume with our AI-powered
                tools
              </p>
            </div>
          </Card>
        </Link>

        {/* Recent Resumes Section */}
        {safeContent.length > 0 && (
          <section className="w-full">
            <h2 className="text-2xl font-semibold mb-4">Recent Resumes</h2>
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              {safeContent.map((resume) => (
                <Card
                  key={resume.id}
                  className="p-4 group relative w-full hover:scale-[1.02] transition-transform duration-300 bg-secondary/50 border border-border/50 backdrop-blur-xl"
                >
                  <div className="flex items-start space-x-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-medium truncate">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.lastModified}
                      </p>
                    </div>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex absolute opacity-0 group-hover:opacity-100 transition-opacity right-2 top-[9px] gap-4 items-center justify-center">
                    <Link href={`/preview/${resume.resumeId}`}>
                      <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Eye className="w-5 h-5" />
                      </button>
                    </Link>
                    {/* Edit Button */}
                    <Link href={`/edit/${resume.resumeId}`}>
                      <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Pencil className="w-5 h-5" />
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(resume.resumeId)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Dashboard;
