"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";


const Home = () => {

  const handleStart = () => {
    signIn("google", { callbackUrl: "/dashboard" })
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-3xl glass animate-fadeIn">
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Create Your Perfect Resume with AI
            </h1>
            <p className="text-lg capitalize text-muted-foreground max-w-2xl mx-auto">
              Just type naturally - our AI handles the formatting, typos, and professional polish.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleStart}
              className="group text-lg px-8 w-full md:w-72 py-2 h-auto"
            >
              <span className="capitalize">Sign in to generate</span>
              <FcGoogle className="ml-2 group-hover:rotate-12 transition-transform" />
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex gap-8 justify-center pt-4 text-muted-foreground">
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
      </Card>
    </div>
  );
};

export default Home;