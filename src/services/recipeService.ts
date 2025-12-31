import { RecipeResponseSchema } from "@/schemas/recipeSchema";

export async function getRecipeFromAi(
  ingredients: string[]
): Promise<string> {
  const response = await fetch("/api/getRecipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const json = await response.json();

  // Runtime validation of API response
  const data = RecipeResponseSchema.parse(json);

  return data.recipe;
}
