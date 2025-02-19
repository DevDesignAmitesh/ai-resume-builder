import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Dashboard = ({ content }: { content: any }) => {
  console.log(content)
  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Resumes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Resume Card */}
          <Link href={"/generate"} className="block">
            <Card className="h-64 flex items-center justify-center group transition-all duration-300 hover:scale-105 bg-secondary/50 border border-border/50 backdrop-blur-xl">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            </Card>
          </Link>

          {/* Existing Resumes */}
          {content && content?.map((array: any[]) => (
            // Loop through each inner array and display the resume
            array?.map((c: { id: string, title: string, resumeId: string }) => (
              <Link href={`/preview/${c.resumeId}`} key={c.id} className="block">
                <Card className="h-64 relative group transition-all duration-300 hover:scale-105 bg-secondary/50 border border-border/50 backdrop-blur-xl overflow-hidden">
                  {/* Hover Overlay with Title */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10">
                    <h3 className="text-lg capitalize font-medium text-white text-center">
                      {c.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
