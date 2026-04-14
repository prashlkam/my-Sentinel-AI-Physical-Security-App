// Calls the server-side Gemini proxy so the API key is never exposed to the browser.

async function callGeminiProxy(prompt: string, systemInstruction: string): Promise<string> {
  const res = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, systemInstruction }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as Record<string, string>).error || 'Gemini request failed');
  }
  const data = await res.json() as { text: string };
  return data.text;
}

export const generateSecurityResponse = async (prompt: string) => {
  try {
    return await callGeminiProxy(
      prompt,
      "You are a professional Physical Security Consultant. Provide concise, actionable, and authoritative security advice. If asked to generate a document or presentation plan, structure it logically with clear headings.",
    );
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error communicating with AI Assistant. Please ensure your API key is valid.";
  }
};

export const generateEmergencyDocument = async (topic: string, format: string) => {
  try {
    return await callGeminiProxy(
      `Generate a comprehensive ${format} on the topic: ${topic}. Include sections for Preparedness, Response, and Recovery.`,
      "You are a disaster management expert. Provide high-quality content suitable for corporate distribution.",
    );
  } catch (error) {
    console.error("Document Gen Error:", error);
    return "Error generating document.";
  }
};
