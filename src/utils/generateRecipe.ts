import { NavigateFunction } from "react-router-dom";
import { getRecipeFromAi } from "@/services/recipeService";
import { Dispatch, SetStateAction } from "react";

export async function generateRecipe(
  ingredients: string[],
  setLoading: Dispatch<SetStateAction<boolean>>,
  setProgress: Dispatch<SetStateAction<number>>,
  setRecipe: Dispatch<SetStateAction<string>>,
  navigate: NavigateFunction
): Promise<void> {
  setLoading(true);
  setRecipe("");
  setProgress(0);

  let current = 0;

  const interval = window.setInterval(() => {
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
