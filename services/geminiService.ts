
import { GoogleGenAI, Type } from "@google/genai";
import { DesignSuggestion } from "../types";

export const getDesignSuggestions = async (prompt: string): Promise<DesignSuggestion> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    throw new Error("API Key is missing or invalid. Please check your .env file and restart the server.");
  }

  // Initialize right before the call to ensure fresh environment variable access
  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an expert interior designer for the luxury brand 'Interiorswala', provide a design concept for: "${prompt}". 
      Important: For the 'palette', provide evocative descriptive names (e.g., 'Aged Walnut', 'Dusty Rose', 'Brushed Brass') along with hex codes.
      Return a detailed JSON object.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            style: { type: Type.STRING },
            palette: { 
              type: Type.ARRAY,
              items: { 
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Descriptive name of the color" },
                  hex: { type: Type.STRING, description: "Hexadecimal color code" }
                },
                required: ["name", "hex"]
              }
            },
            description: { type: Type.STRING },
            keyElements: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            furnitureIdeas: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["style", "palette", "description", "keyElements", "furnitureIdeas"]
        }
      }
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("The AI returned an empty response.");
    }

    return JSON.parse(jsonStr) as DesignSuggestion;
  } catch (error: any) {
    console.error("Gemini API Detailed Error:", error);
    
    if (error.message?.includes("403")) {
      throw new Error("Access Denied (403): Your API key might not have permission for this model or is restricted by region.");
    } else if (error.message?.includes("401")) {
      throw new Error("Invalid API Key (401): Please verify the key in your .env file.");
    } else if (error.message?.includes("404")) {
      throw new Error("Model Not Found (404): The selected Gemini model is not available for your account.");
    }
    
    throw new Error(error.message || "An unexpected error occurred while generating the design.");
  }
};
