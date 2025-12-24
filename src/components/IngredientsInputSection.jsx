import { useState } from "react";
import IngredientsList from "@/components/IngredientsList";

export default function IngredientsInputSection({
  ingredients,
  setIngredients,
  setRecipe,
  onGetRecipe
}) {
  const [ingredientInput, setIngredientInput] = useState("");

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
          getRecipe={onGetRecipe}
          onRemove={removeIngredient}
          onRemoveAll={removeAll}
        />
      )}
    </div>
  );
}
