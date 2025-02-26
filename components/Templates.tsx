"use state"

import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

const Templates = ({ isTextCenter }: { isTextCenter: boolean }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const templates = [
    { id: 1, name: "Template 1", preview: "/one.svg" },
    { id: 2, name: "Template 2", preview: "/two.svg" },
    { id: 3, name: "Template 3", preview: "/three.svg" }
  ];

  return (
    <>
      {/* Templates Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold ${isTextCenter ? "text-center" : "text-start"} mb-12`}>
            Professional Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group relative overflow-hidden hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedTemplate(template.id)}
              >
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button>Preview</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview Dialog */}
      <Dialog open={selectedTemplate !== null} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="w-full h-fit p-4 bg-white text-black rounded-lg shadow-lg mx-auto">
          <div className="flex justify-center items-center w-full">
            {/* Preview Side */}
            <div className="w-full">
              <img
                src={templates.find(t => t.id === selectedTemplate)?.preview}
                alt="Template preview"
                className="w-full h-full object-cover content-center"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Templates;
