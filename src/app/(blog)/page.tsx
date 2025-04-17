import { FeaturedRecipeHero } from "@/components/featured-recipe-hero"
import { PopularRecipes } from "@/components/popular-recipes"
import { RecipeGrid } from "@/components/recipe-card"
import { CategorySection } from "@/components/category-section"
import { FoodReviews } from "@/components/food-review"
import { ShopSection } from "@/components/shop-section"
import { recipes } from "@/data/recipes"

export default function Home() {
  return (
    <div>
      <FeaturedRecipeHero />

      <PopularRecipes />

      <RecipeGrid
        title="Recipes"
        recipes={recipes.slice(0, 6)}
        viewAllLink="/recipe-index"
      />

      <CategorySection />

      <FoodReviews />

    </div>
  )
}
