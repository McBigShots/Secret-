import { GoogleGenAI } from "@google/genai";
import { USER_CONTEXT } from '../constants';

export const generateLoveLetter = async (): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Write a short, romantic, playful, and heartwarming proposal poem from ${USER_CONTEXT.proposer} to ${USER_CONTEXT.partner}.
      
      Key details to include naturally:
      - We live in ${USER_CONTEXT.location}.
      - We have been together for ${USER_CONTEXT.duration}.
      - ${USER_CONTEXT.proposer} is a ${USER_CONTEXT.proposerJob} who likes ${USER_CONTEXT.proposerHobby} and loves eating ${USER_CONTEXT.proposerFood}.
      - ${USER_CONTEXT.partner} is in ${USER_CONTEXT.partnerJob}, loves eating ${USER_CONTEXT.partnerFood}, and recently started going to the ${USER_CONTEXT.partnerHobby}.
      
      The tone should be sweet but fun. End with a lead-in to a very important question (don't ask the question yet, just set the stage).
      Keep it under 150 words. Format it with nice line breaks.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "My love for you is deeper than words can say...";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `To my dearest ${USER_CONTEXT.partner},\n\nFrom our days in ${USER_CONTEXT.location} to every bowl of Pho Bo we share, you make my life complete. I can't imagine this journey without you.`;
  }
};