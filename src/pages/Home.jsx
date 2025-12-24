import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientsInputSection from "@/components/IngredientsInputSection";
import RecipeSection from "@/components/RecipeSection";
import { generateRecipe } from "@/utils/generateRecipe";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  function handleGetRecipe() {
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
