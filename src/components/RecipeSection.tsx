import { useRef } from "react";
import chefWiseLogo from "@/assets/images/chef-wise-icon.png";
import { ProgressBar } from "@/components/ProgressBar";
import WiseRecipe from "@/components/WiseRecipe";
import { useMobileSmoothScroll } from "@/hooks/useMobileSmoothScroll";

export default function RecipeSection({ loading, recipe, progress }) {
  const sectionRef = useRef(null);

  useMobileSmoothScroll(sectionRef, loading);

  return (
    <section ref={sectionRef} className="adviceCard">
      {loading ? (
        <div>
          <p>Turning your ingredients into a smart recipe…</p>
          <ProgressBar value={progress} />
        </div>
      ) : recipe ? (
        <WiseRecipe recipe={recipe} />
      ) : (
        <div>
          <img src={chefWiseLogo} />
          <p>
            Enter more than three ingredients and click the "Generate Recipe"
            button to see a suggestion!
          </p>
        </div>
      )}
    </section>
  );
}
