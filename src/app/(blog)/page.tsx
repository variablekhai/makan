"use client";
import { FeaturedRecipeHero } from "@/components/featured-recipe-hero";
import { PopularRecipes } from "@/components/popular-recipes";
import { RecipeGrid } from "@/components/recipe-card";
import { CategorySection } from "@/components/category-section";
import { FoodReviews } from "@/components/food-review";
import { ShopSection } from "@/components/shop-section";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { FeaturedRecipeHeroSkeleton } from "@/components/featured-recipe-skeleton";

const fetcher = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error fetching recipes:", error);
    throw new Error(error.message || "Failed to fetch");
  }

  return response.json();
};

export default function Home() {
  const {
    data: recipes = [],
    error,
    isLoading,
  } = useSWR(`/api/v1/recipes`, fetcher);

  if (error) {
    console.error("Error loading recipes:", error);
    return <div>Error loading recipes</div>;
  }

  return (
    <div>
      {isLoading ? (
        <FeaturedRecipeHeroSkeleton />
      ) : (
        <FeaturedRecipeHero recipes={recipes} />
      )}

      <PopularRecipes />

      <RecipeGrid
        title="Recipes"
        recipes={recipes.slice(0, 3)}
        viewAllLink="/recipe-index"
      />

      {/* <CategorySection /> */}

      <FoodReviews />
    </div>
  );
}
