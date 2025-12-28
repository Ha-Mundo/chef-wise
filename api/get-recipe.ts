import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that suggests recipes based on a list of ingredients.

Rules:
- Generate a recipe using some or all of the ingredients.
- Add up to 3 extra ingredients, excluding common pantry items like salt, pepper, oil, water.
- Ignore irrelevant or non-food items.
- Respond ONLY in the language of the provided ingredients.
- Do NOT mix languages.
- Do NOT output code blocks.
- Format your response in markdown.

Examples:
Ingredients: "pomodoro, basilico, aglio"
Response language: Italian

Ingredients: "chicken, garlic, olive oil"
Response language: English

Please strictly follow the rule about responding only in the language of the ingredients provided.
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
