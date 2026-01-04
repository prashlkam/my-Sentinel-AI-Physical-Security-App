
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateSecurityResponse = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional Physical Security Consultant. Provide concise, actionable, and authoritative security advice. If asked to generate a document or presentation plan, structure it logically with clear headings.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with AI Assistant. Please ensure your API key is valid.";
  }
};

export const generateEmergencyDocument = async (topic: string, format: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a comprehensive ${format} on the topic: ${topic}. Include sections for Preparedness, Response, and Recovery.`,
      config: {
        systemInstruction: "You are a disaster management expert. Provide high-quality content suitable for corporate distribution.",
      }
    });
    return response.text || "Failed to generate document.";
  } catch (error) {
    console.error("Document Gen Error:", error);
    return "Error generating document.";
  }
};
