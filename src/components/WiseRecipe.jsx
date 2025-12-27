import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useMobileSmoothScroll } from "@/hooks/useMobileSmoothScroll";

export default function WiseRecipe({ recipe }) {
  const sectionRef = useRef(null);

  useMobileSmoothScroll(sectionRef, !!recipe);

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
}
