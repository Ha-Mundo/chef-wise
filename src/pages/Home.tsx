import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import IngredientsInputSection from "@/components/IngredientsInputSection";
import RecipeSection from "@/components/RecipeSection";
import { generateRecipe } from "@/utils/generateRecipe";

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const navigate: NavigateFunction = useNavigate();

  function handleGetRecipe(): void {
    generateRecipe(
      ingredients,
      setLoading,
      setProgress,
      setRecipe,
      navigate
    );
  }

  return (
    <section className="ux-layout">
      <IngredientsInputSection
        ingredients={ingredients}
        loading={loading}
        setIngredients={setIngredients}
        setRecipe={setRecipe}
        onGetRecipe={handleGetRecipe}
      />

      <RecipeSection
        loading={loading}
        recipe={recipe}
        progress={progress}
      />
    </section>
  );
}