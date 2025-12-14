import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include more than 3 extra ingredients. You may freely use common pantry items (such as salt, pepper, oil, butter, water) without counting them as additional ingredients. Ignore any irrelevant or non-ingredient text provided in the list. Only base your recipe on recognizable food ingredients. Respond in the same language that the user uses to provide the list of ingredients. Format your response in markdown to make it easier to render to a web page
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ingredients } = req.body;
  const ingredientsString = ingredients.join(", ");

  console.log("HF_ACCESS_TOKEN type:", typeof process.env.VITE_HF_ACCESS_TOKEN);
 
  const inference = new InferenceClient(process.env.VITE_HF_ACCESS_TOKEN);

  try {
    const response = await inference.chatCompletion({
  model: "google/gemma-2-9b-it",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
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
