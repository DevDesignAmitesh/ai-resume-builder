"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config();

export async function aiResponse(formData: any) {
  const AI_PROMPT = `Given the following unstructured user input, correct any typos, grammatical errors, and inconsistencies while ensuring the data adheres to the structured format below. 

  **Instructions:**
  - Fix spelling mistakes and grammar errors.
  - Ensure consistency in formatting (e.g., capitalization, punctuation).
  - Structure the data according to the format below.
  - Maintain the original meaning and intent of the user's input.
  - If any of the fields, such as the "summary" or "project description", are too short or lack sufficient detail, expand on them by adding relevant information based on the user's other provided data. For example, if a project description is short, use the "skills" and "projects" sections to enrich the description with meaningful, relevant details. Ensure that the expansion doesn’t sound automated, repetitive, or generic. It should feel like an organic continuation based on the context the user has provided.
  - Return a valid JSON object.
  
  **Structured Format:**
  { "name": "User's full name", "title": "User's job title", "about": "A brief introduction", 
  "contact": { "github": "GitHub URL", "linkedin": "LinkedIn URL", "phone": "Phone number", "email": "Email" }, 
  "summary": "A concise summary", "experience": [{ "company": "Company Name", "position": "Job Title", "duration": "Start - End", "description": ["Achievement 1", "Achievement 2"] }], 
  "skills": ["Skill 1", "Skill 2"], "projects": [{ "name": "Project Name", "description": "Brief description", "tech": ["Tech 1", "Tech 2"] }], 
  "education": [{ "school": "School Name", "degree": "Degree Name", "duration": "Start - End" }] }
  
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
