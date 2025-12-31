import type { VercelRequest, VercelResponse } from '@vercel/node';
import { chatCompletion } from "@huggingface/inference";
import { IngredientsSchema, RecipeResponseSchema } from "../src/schemas/recipeSchema.js";

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Method Check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. Token Check: Required for the modern functional approach
  const accessToken = process.env.HF_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("FATAL: HF_ACCESS_TOKEN missing in environment.");
    return res.status(500).json({ error: "API configuration missing" });
  }

  // 3. Validation
  const parsedBody = IngredientsSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // 4. AI Interaction
    const response = await chatCompletion({
      model: "google/gemma-2-9b-it",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: parsedBody.data.ingredients.join(", ") },
      ],
      max_tokens: 1024,
      temperature: 0.7,
      accessToken: accessToken, // <--- Passing token here satisfies the new API
    });

    const recipe = response.choices?.[0]?.message?.content;

    if (!recipe) throw new Error("Empty AI response");

    const payload = RecipeResponseSchema.parse({ recipe });
    return res.status(200).json(payload);

  } catch (err: any) {
    console.error("Inference Error:", err.message);
    return res.status(500).json({ error: "Generation failed", details: err.message });
  }
}