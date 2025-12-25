import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of food ingredients and suggests a recipe.

Rules:
- Suggest a recipe using some or all of the ingredients.
- You may add up to 3 extra ingredients (excluding common pantry items like salt, oil, water).
- Ignore non-food or irrelevant text.
- Respond in the SAME LANGUAGE used by the user.
- Format the response in Markdown.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Invalid ingredients list" });
  }

  const ingredientsString = ingredients.join(", ");

  const inference = new InferenceClient(process.env.VITE_HF_ACCESS_TOKEN);

  try {
    const response = await inference.chatCompletion({
      model: "google/gemma-2-9b-it",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: ingredientsString}
      ],
      max_tokens: 1024,
    });

    const recipe = response.choices?.[0]?.message?.content;
    res.status(200).json({ recipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
}
