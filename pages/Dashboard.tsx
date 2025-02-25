"use client";

import { Gem, Plus, Pencil, Trash, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { deleteResume } from "@/app/api/actions/deleteResume";
import { useRouter } from "next/navigation";

const Dashboard = ({ content }: { content: any; }) => {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    await deleteResume(id)
    router.refresh()
  }

  const safeContent = Array.isArray(content) ? content.flat() : []; // Ensure it's an array

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Resumes</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Link href={"/generate"} className="block">
            <Card className="h-64 flex items-center justify-center group transition-all duration-300 hover:scale-105 bg-secondary/50 border border-border/50 backdrop-blur-xl">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
            </Card>
          </Link>

          {/* Display existing resumes */}
          {safeContent.map((c: { id: string; title: string; resumeId: string }) => (
            <Card key={c.id} className="h-64 relative group transition-all duration-300 hover:scale-105 bg-secondary/50 border border-border/50 backdrop-blur-xl overflow-hidden">
              {/* Hover Overlay with Title */}
              <div className="absolute inset-0 bg-black/60 opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 z-10">
                <h3 className="text-lg capitalize font-medium text-white text-center">
                  {c.title}
                </h3>
              </div>

              {/* Edit, Delete & View Buttons (Visible on Hover) */}
              <div className="absolute z-[100] bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                {/* View Button */}
                <Link href={`/preview/${c.resumeId}`}>
                  <button className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Eye className="w-5 h-5" />
                  </button>
                </Link>

                {/* Edit Button */}
                <Link href={`/edit/${c.resumeId}`}>
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Pencil className="w-5 h-5" />
                  </button>
                </Link>

                {/* Delete Button */}
                <button onClick={() => handleDelete(c.resumeId)} className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
