import { useRef, type FC } from "react";
import chefWiseLogo from "@/assets/chef-wise-icon.png";
import { ProgressBar } from "@/components/ProgressBar";
import WiseRecipe from "@/components/WiseRecipe";
import { useMobileSmoothScroll } from "@/hooks/useMobileSmoothScroll";

type RecipeSectionProps = {
  loading: boolean;
  recipe: string | null;
  progress: number;
};

const RecipeSection: FC<RecipeSectionProps> = ({
  loading,
  recipe,
  progress,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Scroll into view on mobile when loading starts
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
          <img src={chefWiseLogo} alt="Chef Wise logo" />
          <p>
            Enter more than three ingredients and click the "Generate Recipe"
            button to see a suggestion!
          </p>
        </div>
      )}
    </section>
  );
};

export default RecipeSection;
