import ReactMarkdown from 'react-markdown'

export default function WiseRecipe(props) {
   return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>👨‍🍳Chef Wise Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}