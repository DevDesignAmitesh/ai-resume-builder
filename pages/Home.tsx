"use client";

import Navbar from "@/components/Navbar";
import Templates from "@/components/Templates";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, PenLine, Download, Check, ChevronDown } from "lucide-react";
import { Sparkles } from "lucide-react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";


const Home = ({ session, feedbacks }: { session: string, feedbacks: any }) => {
  const router = useRouter();
  const feedback = Array.isArray(feedbacks) ? feedbacks.flat() : [];

  const handleStart = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  };

  const handlePush = () => {
    router.push("/dashboard")
  }

  const steps = [
    {
      icon: <PenLine className="h-6 w-6" />,
      title: "Fill Details",
      description: "Input your information with AI-powered assistance"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Choose Template",
      description: "Select from our professionally designed resume templates"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Download",
      description: "Export your resume in multiple formats"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "This AI resume builder helped me land my dream job. The templates are modern and professional.",
      company: "Tech Corp"
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "Incredibly intuitive interface. Created a stunning resume in minutes!",
      company: "StartupX"
    },
    {
      name: "Emma Williams",
      role: "Marketing Director",
      content: "The AI suggestions were spot-on. Highly recommend for any professional.",
      company: "Growth Co"
    }
  ];

  return (
    <div className="min-h-screen relative w-full flex flex-col items-center justify-center bg-background text-foreground">
      <Navbar />
      {/* Hero Section */}
      <div
        style={{ backgroundImage: 'url(/bg-1.svg)' }}
        className="w-full relative bg-cover bg-[50%_20%] h-screen bg-blue-900 flex justify-center items-center animate-fadeIn">
        <div className="p-8 text-center w-full space-y-6">
          <div className="space-y-2 w-full">
            <h1 className="text-6xl font-bold w-full">
              AI-Powered Resume Builder
            </h1>
            <p className="text-lg capitalize text-muted-foreground max-w-2xl mx-auto">
              Create professional resumes in minutes with the power of AI
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={!session ? handleStart : handlePush}
              className="group text-lg px-8 w-full md:w-72 py-2 h-auto"
            >
              <span className="capitalize">{!session ? "Sign in to generate" : "Get started"}</span>
              {!session && <FcGoogle className="ml-2 group-hover:rotate-12 transition-transform" />}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex gap-8 justify-center text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <span>•</span>
              <span>ATS-friendly</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 flex justify-center items-center right-8 animate-bounce">
          <div className="rounded-full border-2 border-white p-2 flex justify-center items-center backdrop-blur-md shadow-lg">
            <ChevronDown className="h-6 w-6 text-white" />
          </div>
        </div>

      </div>

      {/* Templates Section */}
      <Templates isTextCenter={true} />

      {/* How it Works Section */}
      <section className="py-24 px-4 w-full bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4 relative">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 px-4 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">See How It Works</h2>
          <Card className="aspect-video relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
            </div>
            <video
              controls
              className="w-full h-full object-cover rounded-lg"
            >
              <source
                src={`${process.env.NEXT_PUBLIC_BASE_URL}/videos/resume.mp4`}
                type="video/mp4"
              />
            </video>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 w-full bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedback?.map((feed: any, index: any) => (
              <Card key={index} className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{feed.User.fullName}</p>
                      <p className="text-sm text-muted-foreground">
                        User of this app
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{feed.content}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="text-4xl font-bold">
            Ready to Build Your Perfect Resume?
          </h2>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={!session ? handleStart : handlePush}
              className="group text-lg px-8 w-full md:w-72 py-2 h-auto"
            >
              <span className="capitalize">{!session ? "Get started now" : "start generating"}</span>
              {!session && <FcGoogle className="ml-2 group-hover:rotate-12 transition-transform" />}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;