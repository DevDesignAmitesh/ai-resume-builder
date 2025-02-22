"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

export async function aiResponse(formData: any) {
  console.log(formData)
  const AI_PROMPT = `Given the following unstructured user input, correct any typos, grammatical errors, and inconsistencies while ensuring the data adheres to the structured format below. 

  **Instructions:**
  - Fix spelling mistakes and grammar errors.
  - Ensure consistency in formatting (e.g., capitalization, punctuation).
  - Structure the data according to the format below.
  - Maintain the original meaning and intent of the user's input.
  - If any of the fields, such as the "summary" or "project description", are too short or lack sufficient detail, expand on them by adding relevant information based on the user's other provided data. For example, if a project description is short, use the "skills" and "projects" sections to enrich the description with meaningful, relevant details. Ensure that the expansion doesn’t sound automated, repetitive, or generic. It should feel like an organic continuation based on the context the user has provided.
  - **If the user has provided a job post reference, modify the user's entire data (e.g., skills, title, summary, projects, etc.) to align with the job post requirements.** Specifically:
    - Update the **title** to match the job post's role (e.g., if the job post is for a "Senior Frontend Developer," update the title accordingly).
    - Highlight and prioritize **skills** that are mentioned in the job post (e.g., if the job post emphasizes React.js, ensure React.js is prominently featured in the skills section).
    - Tailor the **summary** to emphasize qualifications and experiences that are most relevant to the job post.
    - Adjust **project descriptions** to highlight aspects that align with the job post's requirements (e.g., if the job post mentions "UI/UX design," ensure projects with design elements are emphasized).
    - Modify the **experience** section to focus on roles and achievements that are most relevant to the job post.
    - Ensure the **language and tone** of the resume align with the job post's requirements.
  - Your content should sound like normal human language, not artificial or robotic.
  - Return a valid JSON object.

  **Structured Format:**
  { 
    "name": "User's full name", 
    "title": "User's job title (updated to match the job post if provided)", 
    "about": "A brief introduction tailored to the job post (if provided)", 
    "contact": { 
      "github": "GitHub URL", 
      "linkedin": "LinkedIn URL", 
      "phone": "Phone number", 
      "email": "Email" 
    }, 
    "summary": "A concise summary tailored to the job post (if provided)", 
    "experience": [{ 
      "company": "Company Name", 
      "position": "Job Title", 
      "duration": "Start - End", 
      "description": ["Achievement 1", "Achievement 2"] 
    }], 
    "feSkills": ["Skill 1", "Skill 2 (prioritized based on job post)"],
    "beSkills": ["Skill 1", "Skill 2 (prioritized based on job post)"],
    "db": ["postgres", "mongodb (prioritized based on job post)"],
    "ApiDev": ["restful apis", "websockets (prioritized based on job post)"],
    "versionCon": ["git", "github", "monorepo (prioritized based on job post)"],
    "lang": ["javascript", "python (prioritized based on job post)"],
    "projects": [{ 
      "name": "Project Name", 
      "description": "Brief description tailored to the job post (if provided)", 
      "tech": ["Tech 1", "Tech 2 (prioritized based on job post)"], 
      "liveLink": "https://linkoftheproject.com" 
    }], 
    "education": [{ 
      "school": "School Name", 
      "degree": "Degree Name", 
      "duration": "Start - End" 
    }] 
  }

  Return the structured output as **valid JSON**.`;


  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const userMessage = JSON.stringify(formData, null, 2);

    const result = await model.generateContent([AI_PROMPT, userMessage]);

    const aiOutput = result.response.text();

    if (!aiOutput) throw new Error("No response from AI.");

    // Remove any markdown or non-JSON content
    const jsonString = aiOutput.replace(/^```json|```$/g, '').trim();

    // Parse the cleaned JSON string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error in AI Response:", error);
    return { error: "Failed to process data." };
  }
}
