export default function IngredientsList(
  { ingredients, getRecipe, onRemove, onRemoveAll }
) {
  return (
    <section className="ingredients-section" >
      <div>
        <h4>Ingredients on hand:</h4>

        <button
          type="button"
          onClick={onRemoveAll}
          className="remove-all-btn"
        >
          ✕ Remove All
        </button>
      </div>

      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map(ingredient => (
          <li key={ingredient} className="ingredient-item">
            <span>{ingredient}</span>

            <button
              type="button"
              className="remove-ingredient-btn"
              aria-label={`Remove ${ingredient}`}
              onClick={() => onRemove(ingredient)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>

          <button onClick={getRecipe}>Get a recipe</button>
        </div>
      )}
    </section>
  );
};


