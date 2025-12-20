import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for navigation
import IngredientsList from "@/components/IngredientsList";
import WiseRecipe from "@/components/WiseRecipe";
import AdviceCard from "@/components/AdviceCard";
import { getRecipeFromAi } from "@/services/recipeService";

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);
  const navigate = useNavigate(); // Hook for navigation (to redirect to the error page in case of failure)

  useEffect(() => {
    if (recipe && recipeSection.current) {
      // Smooth scroll to the recipe section if a recipe is found
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  async function handleGetRecipe() {
    try {
      // Try to fetch the recipe from the AI service
      const recipeMarkdown = await getRecipeFromAi(ingredients);
      setRecipe(recipeMarkdown); // If successful, set the recipe state
    } catch (err) {
      console.error("Error fetching recipe:", err);
      // In case of an error, navigate to the error page
      navigate("/error");
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    const trimmed = ingredientInput.trim();
    if (!trimmed || ingredients.includes(trimmed)) return; // Prevent adding empty or duplicate ingredients
    setIngredients(prev => [...prev, trimmed]); // Add ingredient to the list
    setIngredientInput(""); // Clear the input field
  }

  function removeIngredient(item) {
    // Remove an ingredient from the list
    setIngredients(prev => prev.filter(i => i !== item));
  }

  function removeAll() {
    // Clear all ingredients and the recipe
    setIngredients([]);
    setRecipe("");
  }

  return (
    <section className="ux-layout">
      <div>
        <h2>What’s in my pantry? 🥕</h2>

        {/* Ingredient input form */}
        <form onSubmit={addIngredient} className="add-ingredient-form">
          <input
            value={ingredientInput}
            onChange={e => setIngredientInput(e.target.value)}
            placeholder="Write an ingredient"
          />
          <button>Add</button>
        </form>

        {/* Show message if the ingredients list is empty */}
        {ingredients.length === 0 && (
          <h4>Your list is empty. Add ingredients to get started!</h4>
        )}

        {/* Show the IngredientsList component if there are ingredients */}
        {ingredients.length > 0 && (
          <IngredientsList
            
            ingredients={ingredients}
            getRecipe={handleGetRecipe}
            onRemove={removeIngredient}
            onRemoveAll={removeAll}
          />
        )}
      </div>

      {/* Show the recipe or a piece of advice if no recipe is available */}
      {!recipe && <AdviceCard />}
      {recipe && <WiseRecipe recipe={recipe} ref={recipeSection}/>}
    </section>
  );
}
