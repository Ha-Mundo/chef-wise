import type { VercelRequest, VercelResponse } from '@vercel/node';
import { HfInference } from "@huggingface/inference";
import { IngredientsSchema, RecipeResponseSchema } from "../src/schemas/recipeSchema.js";

/**
 * ORIGINAL SYSTEM_PROMPT 
 * Defines the AI's behavior and constraints for recipe generation.
 */
const SYSTEM_PROMPT = `
You are an assistant that receives a list of food ingredients and suggests a recipe.

Rules:
- Suggest a recipe using some or all of the ingredients.
- You may add up to 3 extra ingredients (excluding common pantry items like salt, oil, water).
- Ignore non-food or irrelevant text.
- Detect the language used in the ingredients list.
- Respond ONLY in that language.
- Do not mix languages.
- Format the response in Markdown.
- Do not include code blocks.
`;

// Initialize the client. 
// We check for the token here to ensure it's available at the module level.
const hfToken = process.env.HF_ACCESS_TOKEN;
const hf = new HfInference(hfToken);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Method Validation: Block anything that isn't a POST request.
  if (req.method !== "POST") {
    console.warn(`Attempted ${req.method} request. Only POST is allowed.`);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Critical Environment Check: 
  // If the token is missing, the "InferenceClientRoutingError" occurs.
  // We throw an explicit error to stop execution immediately.
  if (!hfToken) {
    console.error("CONFIGURATION ERROR: HF_ACCESS_TOKEN is missing on Vercel.");
    return res.status(500).json({ error: "Server missing API credentials" });
  }

  // 3. Input Validation: Check if the ingredients list is valid.
  const parsedBody = IngredientsSchema.safeParse(req.body);
  if (!parsedBody.success) {
    console.error("VALIDATION ERROR: Invalid payload received.");
    return res.status(400).json({ 
      error: "Invalid ingredients list", 
      details: parsedBody.error.issues 
    });
  }

  const { ingredients } = parsedBody.data;

  try {
    // 4. Inference Call: Explicitly using the model to avoid auto-router issues.
    const response = await hf.chatCompletion({
      model: "google/gemma-2-9b-it",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: ingredients.join(", ") },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const recipe = response.choices?.[0]?.message?.content;

    if (!recipe) {
      throw new Error("AI model returned an empty content body.");
    }

    // 5. Output Validation: Ensure the response matches the expected schema.
    const payload = RecipeResponseSchema.parse({ recipe });

    return res.status(200).json(payload);

  } catch (err: any) {
    // 6. Error Reporting: Log the full error for Vercel runtime debugging.
    console.error("RUNTIME ERROR in /api/getRecipe:", err.message || err);
    
    // Return a 500 status with details to avoid silent failures on the frontend.
    return res.status(500).json({ 
      error: "Failed to generate recipe", 
      message: err.message || "Unknown error"
    });
  }
}