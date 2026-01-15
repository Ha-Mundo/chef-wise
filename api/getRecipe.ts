import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from "groq-sdk"; // Importing SDK for Groq AI services
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
  // 1. Method Check: Ensure only POST requests are processed
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 2. API Key Check: Retrieve the key from environment variables
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("FATAL: GROQ_API_KEY missing.");
    return res.status(500).json({ error: "API configuration missing" });
  }

  // 3. Input Validation: Validate incoming data against Zod schema
  const parsedBody = IngredientsSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    // 4. Client Initialization: Set up the Groq SDK
    const groq = new Groq({ apiKey });

    // 5. AI Interaction: Using Llama 3.1 8b (fast, free-tier) for recipe generation
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: parsedBody.data.ingredients.join(", ") },
      ],
      model: "llama-3.1-8b-instant", // High-performance model for text generation
      temperature: 0.7,
      max_tokens: 1024,
    });

    const recipe = completion.choices[0]?.message?.content;

    // 6. Response Integrity: Check if the AI actually returned content
    if (!recipe) throw new Error("Empty AI response");

    // 7. Output Validation: Ensure the response fits your expected schema
    const payload = RecipeResponseSchema.parse({ recipe });
    return res.status(200).json(payload);

  } catch (err: any) {
    // Error Handling: Log and return detailed error info
    console.error("Groq Inference Error:", err.message);
    return res.status(500).json({ error: "Generation failed", details: err.message });
  }
}