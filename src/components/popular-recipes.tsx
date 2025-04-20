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
    title: "Nyonya Laksa",
    slug: "2022/04/10/nyonya-laksa",
    image: "https://www.seriouseats.com/thmb/VQj_9MvhH8JXywMoQCv18PTho-U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2011__08__20110801-laksa-primary-c6f0e355de0a46cdb18b092fe5105b30.jpg",
    category: {
      name: "Main",
      slug: "main"
    }
  },
  {
    title: "Kuih Dadar (Pandan Coconut Crepes)",
    slug: "2021/11/23/kuih-dadar",
    image: "https://delishglobe.com/wp-content/uploads/2025/03/Kuih-Dadar--1024x749.png",
    category: {
      name: "Desserts",
      slug: "desserts"
    }
  },
  {
    title: "Ayam Pongteh (Nyonya Braised Chicken)",
    slug: "2019/04/03/ayam-pongteh",
    image: "https://www.periuk.my/static/a4770a7659f4da65ca9cc5033c0773e1/f6085/PRec-Granny-Ayam-Pongteh-1-scaled.jpg",
    category: {
      name: "Main",
      slug: "main"
    }
  }
]
