import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function WiseRecipe({ recipe }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const isMediumOrSmallScreen = window.matchMedia(
      "(max-width: 768px)"
    ).matches;

    if (isMediumOrSmallScreen) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
