import { FC } from "react";

type IngredientsListProps = {
  ingredients: string[];
  getRecipe: () => void;
  onRemove: (ingredient: string) => void;
  onRemoveAll: () => void;
  loading: boolean;
};

const IngredientsList: FC<IngredientsListProps> = ({
  ingredients,
  getRecipe,
  onRemove,
  onRemoveAll,
  loading,
}) => {
  return (
    <section className="ingredients-section">
      <div>
        <h4>Ingredients on hand:</h4>

        <button
          type="button"
          onClick={onRemoveAll}
          className="remove-all-btn"
          disabled={loading}
        >
          ✕ Remove All
        </button>
      </div>

      <ul className="ingredients-list" aria-live="polite">
        {ingredients.map((ingredient) => (
          <li key={ingredient} className="ingredient-item">
            <span>{ingredient}</span>

            <button
              type="button"
              className="remove-ingredient-btn"
              aria-label={`Remove ${ingredient}`}
              onClick={() => onRemove(ingredient)}
              disabled={loading}
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

          <button onClick={getRecipe} disabled={loading}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
};

export default IngredientsList;