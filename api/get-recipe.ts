import type { VercelRequest, VercelResponse } from '@vercel/node';
import { InferenceClient } from "@huggingface/inference";
import { IngredientsSchema, RecipeResponseSchema } from "@/schemas/recipeSchema";

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
  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Validate the request body against IngredientsSchema
  const parsedBody = IngredientsSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(400).json({ error: "Invalid ingredients payload" });
    return;
  }

  const { ingredients } = parsedBody.data;
  const ingredientsString = ingredients.join(", ");

  // Initialize the Hugging Face inference client with the access token
  const inference = new InferenceClient(process.env.HF_ACCESS_TOKEN);

  try {
    // Call the chatCompletion endpoint of the model with system prompt and user ingredients
    const response = await inference.chatCompletion({
      model: "google/gemma-2-9b-it",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: ingredientsString },
      ],
      max_tokens: 1024,
    });

    // Extract the generated recipe text from the model response
    const recipe = response.choices?.[0]?.message?.content;

    if (!recipe) {
      throw new Error("Empty model response");
    }

    // Validate the recipe response against the schema before sending back to client
    const payload = RecipeResponseSchema.parse({ recipe });

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
