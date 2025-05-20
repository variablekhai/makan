"use client"
import { FeaturedRecipeHero } from "@/components/featured-recipe-hero"
import { PopularRecipes } from "@/components/popular-recipes"
import { RecipeGrid } from "@/components/recipe-card"
import { CategorySection } from "@/components/category-section"
import { FoodReviews } from "@/components/food-review"
import { ShopSection } from "@/components/shop-section"
import { recipes } from "@/data/recipes"
import { useEffect, useState } from "react"

export default function Home() {

  const [recipes, setRecipes] = useState<any[]>([])

  const fetchRecipes = async () => {
    const response = await fetch(`/api/v1/recipes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    console.log("Fetched recipes:", data)
    if (!response.ok) {
      console.error("Error fetching recipes:", data)
      return []
    }

    return data
  }

  useEffect(() => {
    const fetchData = async () => {
      const recipes = await fetchRecipes()
      setRecipes(recipes)
    }
    fetchData()
  }, [])
  
  return (
    <div>
      <FeaturedRecipeHero recipes={recipes}/>

      <PopularRecipes />

      <RecipeGrid
        title="Recipes"
        recipes={recipes.slice(0, 3)}
        viewAllLink="/recipe-index"
      />

      {/* <CategorySection /> */}

      <FoodReviews />

    </div>
  )
}
