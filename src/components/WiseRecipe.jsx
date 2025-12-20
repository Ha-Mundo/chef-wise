import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";

const WiseRecipe =  forwardRef( function WiseRecipe({ recipe }, ref) {
  return (
    <section
      ref={ref}
      className="suggested-recipe-container"
      aria-live="polite"
    >
      <h2>👨‍🍳 Chef Wise Recommends:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
})

export default WiseRecipe