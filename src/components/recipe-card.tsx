"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { capitalize } from "@/utils/misc"

interface RecipeCardProps {
  recipe: {
    title: string
    slug: string
    imageUrl: string
    timeToMake: {
      value: number
      unit: string
    }
    difficulty: string
    type: string
    author: {
      name: string
    }
    createdAt: string
  }
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="recipe-card group">
      <div className="relative overflow-hidden rounded-md mb-4">
        <Link href={`/${recipe.slug}`} legacyBehavior>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={400}
            height={300}
            className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <span className="absolute top-4 left-4 category-badge">
          {recipe.type}
        </span>
      </div>
      <Link href={`/${recipe.slug}`} legacyBehavior>
        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
      </Link>
      <div className="flex items-center space-x-3 mb-3">
        <Avatar className="w-6 h-6">
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${recipe.author.name}`}
            alt={recipe.author.name}
            className="object-cover"
          />
          <AvatarFallback>{recipe.author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex text-sm text-muted-foreground">
          <span>{recipe.author.name}</span>
          <span className="mx-1">•</span>
          <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>
          {recipe.timeToMake.value} {recipe.timeToMake.unit}
        </span>
        <span className="mx-1">•</span>
        <span>{capitalize(recipe.difficulty)}</span>
      </div>
    </div>
  )
}

interface RecipeGridProps {
  title: string
  recipes: RecipeCardProps["recipe"][]
  viewAllLink?: string
}

export function RecipeGrid({ title, recipes, viewAllLink }: RecipeGridProps) {
  return (
    <section className="py-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title">{title}</h2>
          {viewAllLink && (
            <Link href={viewAllLink} className="text-sm font-medium hover:text-primary">
              View All
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe.slug + index} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  )
}
