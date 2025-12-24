import { getRecipeFromAi } from "@/services/recipeService";

export async function generateRecipe(
  ingredients,
  setLoading,
  setProgress,
  setRecipe,
  navigate
) {
  setLoading(true);
  setRecipe("");
  setProgress(0);

  // Progress simulation
  let current = 0;
  const interval = setInterval(() => {
    current += 10;
    setProgress(current);
  }, 300);

  try {
    const recipeMarkdown = await getRecipeFromAi(ingredients);
    setRecipe(recipeMarkdown);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    navigate("/error");
  } finally {
    clearInterval(interval);
    setProgress(100);
    setTimeout(() => setLoading(false), 500);
  }
}
