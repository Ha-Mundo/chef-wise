export default function IngredientsList(props) {
    
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item">
            <span>{ingredient}</span>
            <button
                type="button"
                className="remove-ingredient-btn"
                aria-label={`Remove ${ingredient}`}
                onClick={() => props.onRemove(ingredient)}
            >
                ✕
            </button>
        </li>
    ))
    
    return ( 
        <section className="ingredients-section">
            <div>
                <h3>Ingredients on hand:</h3>
                <button
                    type="button"
                    onClick={props.onRemoveAll}
                    className="remove-all-btn"
                >
                   ✕ Remove All 
                </button>
            </div>
            

            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
        
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                    <button onClick={props.getRecipe}>
                        Get a recipe
                    </button>
                </div>
            )}
        </section>
    )
}
