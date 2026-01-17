import { FC, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useMobileSmoothScroll } from "@/hooks/useMobileSmoothScroll";

interface WiseRecipeProps {
  recipe: string;
}

const WiseRecipe: FC<WiseRecipeProps> = ({ recipe }) => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Scrolls into view on mobile when a recipe is available
  useMobileSmoothScroll(titleRef, Boolean(recipe));

  return (
    <section
      className="suggested-recipe-container animate-fade-in"
      aria-live="polite"
    >
      <h2 ref={titleRef}>👨‍🍳 Chef Wise Recommends:</h2>
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </section>
  );
};

export default WiseRecipe;
