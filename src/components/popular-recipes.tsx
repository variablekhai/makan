"use client"

import Link from "next/link"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface PopularRecipeProps {
  recipe: {
    title: string
    slug: string
    image: string
    category: {
      name: string
      slug: string
    }
  }
}

export function PopularRecipeCard({ recipe }: PopularRecipeProps) {
  return (
    <div className="group">
      <AspectRatio ratio={4/3} className="overflow-hidden rounded-md mb-3">
        <Link href={`/${recipe.slug}`} legacyBehavior>
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </AspectRatio>
      <Link
        href={`/category/${recipe.category.slug}`}
        className="text-xs text-primary font-medium uppercase tracking-wider mb-1 inline-block"
        legacyBehavior>
        {recipe.category.name}
      </Link>
      <Link href={`/${recipe.slug}`} legacyBehavior>
        <h3 className="font-heading font-semibold text-base group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
      </Link>
    </div>
  );
}

export function PopularRecipes() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Popular Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.map((recipe) => (
            <PopularRecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  )
}

const popularRecipes = [
  {
    title: "Grilled Chicken Mushroom Toast",
    slug: "2022/04/10/bruschetta-with-beef-tartare",
    image: "https://ext.same-assets.com/543785121/1490506319.jpeg",
    category: {
      name: "Appetizers",
      slug: "appetizers"
    }
  },
  {
    title: "Pistachio Pavlova Meringue Cakes",
    slug: "2021/11/23/pistachio-pavlova-meringue-cakes",
    image: "https://ext.same-assets.com/543785121/3477451376.jpeg",
    category: {
      name: "Desserts",
      slug: "desserts"
    }
  },
  {
    title: "Roasted Carrot Soup",
    slug: "2019/04/03/roasted-carrot-soup",
    image: "https://ext.same-assets.com/543785121/3894744592.jpeg",
    category: {
      name: "Soups",
      slug: "soups"
    }
  }
]
