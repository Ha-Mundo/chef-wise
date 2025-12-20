import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IngredientsList from "@/components/IngredientsList";
import WiseRecipe from "@/components/WiseRecipe";
import AdviceCard from "@/components/AdviceCard";
import { getRecipeFromAi } from "@/services/recipeService";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipe, setRecipe] = useState("");
  const navigate = useNavigate();

  async function handleGetRecipe() {
    try {
      const recipeMarkdown = await getRecipeFromAi(ingredients);
      setRecipe(recipeMarkdown);
    } catch (err) {
      console.error("Error fetching recipe:", err);
      navigate("/error");
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    const trimmed = ingredientInput.trim();
    if (!trimmed || ingredients.includes(trimmed)) return;

    setIngredients(prev => [...prev, trimmed]);
    setIngredientInput("");
  }

  function removeIngredient(item) {
    setIngredients(prev => prev.filter(i => i !== item));
  }

  function removeAll() {
    setIngredients([]);
    setRecipe("");
  }

  return (
    <section className="ux-layout">
      <div>
        <h2>What’s in my pantry? 🥕</h2>

        <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
            value={ingredientInput}
            onChange={e => setIngredientInput(e.target.value)}
            placeholder="Write an ingredient"
          />
          <button>Add</button>
        </form>

        {ingredients.length === 0 && (
          <h4>Your list is empty. Add ingredients to get started!</h4>
        )}

        {ingredients.length > 0 && (
          <IngredientsList
            ingredients={ingredients}
            getRecipe={handleGetRecipe}
            onRemove={removeIngredient}
            onRemoveAll={removeAll}
          />
        )}
      </div>

      {!recipe && <AdviceCard />}
      {recipe && <WiseRecipe recipe={recipe} />}
    </section>
  );
}
