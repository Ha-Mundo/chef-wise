import React from "react"
import IngredientsList from "./IngredientsList.jsx"
import WiseRecipe from "./WiseRecipe.jsx"
import getRecipeFromMistral from "../ai.js"
import AdviceCard from "./adviceCard.jsx"

export default function Main() { 
    const [ingredients, setIngredients] = React.useState([])
    const [ingredientInput, setIngredientInput] = React.useState("")
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            // Smooth scroll to the recipe section when a recipe is generated
            const yCoord =
                recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    async function getRecipe() {
        // Fetch recipe from AI using the current ingredients
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(e) {
        e.preventDefault()
        // Remove leading/trailing spaces
        const trimmedIngredient = ingredientInput.trim()
        // Ignore empty or whitespace-only input
        if (!trimmedIngredient) return
        // Prevent duplicate ingredients (optional)
        if (ingredients.includes(trimmedIngredient)) return
        // Add ingredient to state
        setIngredients(prev => [...prev, trimmedIngredient])
        // Reset input field
        setIngredientInput("")
    }

    function removeAll() {
        setIngredients([])
        setRecipe("")
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prev =>
        prev.filter(ingredient => ingredient !== ingredientToRemove)
        )
    }



    return (
        <main className="ux-layout">
            <div>
                <h2>What’s in my pantry?<span>🥕</span></h2>
                <form onSubmit={addIngredient} className="add-ingredient-form">
                    <input
                        type="text"
                        placeholder="Write an ingredient"
                        aria-label="Add ingredient"
                        value={ingredientInput}
                        onChange={e => setIngredientInput(e.target.value)}
                        />
                    <button>Add</button>
                </form>
                
                {ingredients.length <= 0 && (<h4>Your list is empty. Add ingredients to get started!</h4>)}

                {ingredients.length > 0 && (
                    <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    onRemove={removeIngredient}
                    onRemoveAll={removeAll}
                    />
                )}
            </div>
            {!recipe && <AdviceCard />}
            {recipe && <WiseRecipe recipe={recipe} />}
        </main>
    )
}
