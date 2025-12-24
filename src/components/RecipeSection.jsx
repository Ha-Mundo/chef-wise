import chefWiseLogo from "@/assets/images/chef-wise-icon.png";
import { ProgressBar } from "@/components/ProgressBar";
import WiseRecipe from "@/components/WiseRecipe";

export default function RecipeSection({ loading, recipe, progress }) {
  return (
    <section className="adviceCard">
      {loading ? (
        <div>
          <p>Chef Wise is cooking… 👨‍🍳</p>
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
