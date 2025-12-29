import { FC, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useMobileSmoothScroll } from "@/hooks/useMobileSmoothScroll";

interface WiseRecipeProps {
  recipe: string;
}

const WiseRecipe: FC<WiseRecipeProps> = ({ recipe }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scrolls into view on mobile when a recipe is available
  useMobileSmoothScroll(sectionRef, Boolean(recipe));

  return (
    <section
      ref={sectionRef}
      className="suggested-recipe-container"
      aria-live="polite"
    >
      <h2>👨‍🍳 Chef Wise Recommends:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
};

export default WiseRecipe;
