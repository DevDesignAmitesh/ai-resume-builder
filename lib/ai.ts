"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

export async function aiResponse(formData: any) {
  const AI_PROMPT = `Given the following unstructured user input, correct any typos, grammatical errors, and inconsistencies while ensuring the data adheres to the structured format below. 

**Instructions:**
- The user may provide data in an unstructured format, meaning they might not follow the exact JSON structure. It is your job to use common sense to organize and structure the data as needed.
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
- Use common sense when splitting technologies in the "projects" section. For example, if the user forgets to add a comma between technologies (e.g., "prisma postgress"), intelligently split them into separate entries (e.g., "Prisma", "PostgreSQL") rather than keeping them as a single string. Ensure proper capitalization and spelling (e.g., "postgress" should be corrected to "PostgreSQL").
- When the user enters a school or college name, search for and verify the correct spelling of the institution (e.g., check if "Stanfard University" should be "Stanford University" or "MIT Insitute" should be "MIT Institute"). Correct any misspellings to ensure accuracy, but only make changes based on widely recognized names and avoid over-correcting if the user’s input is clear and unique.
- Do not add excessive content if the user provides sufficient detail. Only expand or add minimal data when necessary, taking inspiration from the rest of the user’s data (e.g., skills, experience, or projects) to keep the content natural and relevant. Avoid adding generic or repetitive information.
- Fix spelling mistakes and grammar errors.
- Ensure consistency in formatting (e.g., capitalization, punctuation).
- Return a valid JSON object.
- Ensure the output is wrapped in a "content" object, mirroring the input structure.

**Structured Format:**
{
  "content": 
  { 
    "name": "User's full name", 
    "title": "User's job title (updated to match the job post if provided)", 
    "jobPostDetails": "A brief introduction tailored to the job post (if provided)", 
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
    "skills": [{ "skill category", ["skill 1", "skill 2"] }] these can be optional if user did not give this info then return an empty array like [], 
    "projects": [{ 
      "name": "Project Name", 
      "description": "Brief description tailored to the job post (if provided)", 
      "tech": ["Tech 1", "Tech 2 (prioritized based on job post)"], 
      "liveLink": "https://linkoftheproject.com" 
    }], 
    "education": [{ 
      "school": "School Name (corrected spelling if applicable)", 
      "degree": "Degree Name", 
      "duration": "Start - End" 
    }],
    "achievements": ["achievement 1", "achievement 2"],
    "certificate": [{"name": "name of the certificate", "date": "the date of getting that certificate"}]
  }
}

Return the structured output as **valid JSON**.
`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userMessage = JSON.stringify(formData);

    const result = await model.generateContent([AI_PROMPT, userMessage]);

    const aiOutput = result.response.text();

    if (!aiOutput) throw new Error("No response from AI.");

    // Remove any markdown or non-JSON content
    const jsonString = aiOutput.replace(/^```json|```$/g, '').trim();

    // Parse the cleaned JSON string
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error in AI Response:", error);
    return { message: "Failed to process data." };
  }
}
