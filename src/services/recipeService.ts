export async function getRecipeFromAi(ingredients) {
  const response = await fetch("/api/get-recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = await response.json();
  return data.recipe;
}
