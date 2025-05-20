"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Clock, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { capitalize } from "@/utils/misc"
import { format } from "date-fns"

interface FeaturedRecipeProps {
  recipe: {
    title: string
    slug: string
    imageUrl: string
    description: string
    timeToMake: {
      value: number
      unit: string
    }
    difficulty: string
    author: {
      name: string
      image: string
    }
    updatedAt: string
  }
}

export function FeaturedRecipeCard({ recipe }: FeaturedRecipeProps) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative overflow-hidden rounded-md cursor-pointer">
        <Link href={`/${recipe.slug}`} legacyBehavior>
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            width={800}
            height={600}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="space-y-4">
        <Link href={`/${recipe.slug}`} legacyBehavior>
          <h2 className="text-3xl font-heading font-bold hover:text-primary transition-colors cursor-pointer">
            {recipe.title}
          </h2>
        </Link>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{`${recipe.timeToMake.value} ${recipe.timeToMake.unit}`}</span>
          <span className="mx-1">•</span>
          <Zap className="w-4 h-4" />
          <span>{capitalize(recipe.difficulty)}</span>
        </div>

        <p className="text-muted-foreground">{recipe.description}</p>

        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={`https://ui-avatars.com/api/?name=${recipe.author.name}`} alt={recipe.author.name} />
            <AvatarFallback>{recipe.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{recipe.author.name}</p>
            <p className="text-sm text-muted-foreground">{recipe.updatedAt ? format(recipe.updatedAt, "MMM dd, yyyy") : "N/A"}</p>
          </div>
        </div>

        <Button variant="outline" size="sm" asChild>
          <Link href={`/${recipe.slug}`}>
            Read more
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function FeaturedRecipeHero({ recipes }: { recipes: FeaturedRecipeProps["recipe"][] }) {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h3 className="text-lg font-medium text-center mb-8 uppercase tracking-wide">Featured Recipes</h3>

        <Carousel className="w-full">
          <CarouselContent>
            {recipes.map((recipe, index) => (
              <CarouselItem key={recipe.slug + index}>
                <FeaturedRecipeCard recipe={recipe} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6">
            <CarouselPrevious className="relative mr-2 translate-y-0" />
            <CarouselNext className="ml-2 static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
