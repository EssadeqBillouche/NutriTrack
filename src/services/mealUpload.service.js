import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// export const analyzeMealImage = async () => {
//     const prompt = `
//     You are an expert nutritionist AI. Analyze this food image in detail and provide accurate, specific nutrition information.
//         CRITICAL: You MUST return ONLY valid JSON format, no other text, no markdown, no code blocks.

//         **FOOD DETECTION:**
//         - List every specific food item you can identify in the image
//         - Be precise
//         - Estimate portion sizes in grams realistically
//         - Assign confidence scores based on clarity

//         **NUTRITION ESTIMATION:**
//         - Calculate based on detected foods and visible portion sizes
//         - Be realistic - don't over/under estimate
//         - Include all macronutrients and key micronutrients

//         **RECOMMENDATIONS & WARNINGS:**
//         - Give specific, actionable advice based on the actual meal
//         - Only include warnings if you detect actual concerns

//         **REQUIRED JSON STRUCTURE - NO DEVIATION:**
//         {
//             "detectedFoods": [
//                 {"name": "food name"}
//             ],
//             "nutrition": {
//                 "calories": number,
//                 "proteins": number,
//                 "carbs": number,
//                 "fats": number,
//                 "sugar": number,
//                 "sodium": number
//             },
//             "recommendations": ["specific advice"],
//             "healthWarnings": ["specific concerns"]
//         }

//         Analyze THIS SPECIFIC IMAGE and provide realistic estimates.
//     `;
//     const response = await ai.models.generateContent({
//         model: "gemini-2.0-flash",
//         contents: prompt,
//     })
//     console.log(response.text)
// }