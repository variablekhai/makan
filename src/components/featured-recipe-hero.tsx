"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Clock, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FeaturedRecipeProps {
  recipe: {
    title: string
    slug: string
    image: string
    description: string
    time: string
    difficulty: string
    category: {
      name: string
      slug: string
    }
    author: {
      name: string
      image: string
      slug: string
    }
    date: string
  }
}

export function FeaturedRecipeCard({ recipe }: FeaturedRecipeProps) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="relative overflow-hidden rounded-md">
        <Link href={`/${recipe.slug}`} legacyBehavior>
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={800}
            height={600}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="space-y-4">
        <div className="mb-2">
          <Link
            href={`/category/${recipe.category.slug}`}
            className="category-badge"
            legacyBehavior>
            {recipe.category.name}
          </Link>
        </div>

        <Link href={`/${recipe.slug}`} legacyBehavior>
          <h2 className="text-3xl font-heading font-bold hover:text-primary transition-colors">
            {recipe.title}
          </h2>
        </Link>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{recipe.time}</span>
          <span className="mx-1">•</span>
          <Zap className="w-4 h-4" />
          <span>{recipe.difficulty}</span>
        </div>

        <p className="text-muted-foreground">{recipe.description}</p>

        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={recipe.author.image} alt={recipe.author.name} />
            <AvatarFallback>{recipe.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/author/${recipe.author.slug}`}
              className="font-medium hover:text-primary"
              legacyBehavior>
              {recipe.author.name}
            </Link>
            <p className="text-sm text-muted-foreground">{recipe.date}</p>
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

export function FeaturedRecipeHero() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h3 className="text-lg font-medium text-center mb-8 uppercase tracking-wide">Featured Recipes</h3>

        <Carousel className="w-full">
          <CarouselContent>
            {featuredRecipes.map((recipe) => (
              <CarouselItem key={recipe.slug}>
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

const featuredRecipes = [
  {
    title: "Rosemary & Honey Whiskey Cocktail",
    slug: "2022/04/13/rosemary-honey-whiskey-cocktail",
    image: "https://ext.same-assets.com/543785121/746458956.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "15 min",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Pavel Ciorici",
      image: "https://ext.same-assets.com/1113238889/2441124720.png",
      slug: "pavel-ciorici"
    },
    date: "April 13, 2022"
  },
  {
    title: "Grilled Chicken Mushroom Toast",
    slug: "2022/04/10/bruschetta-with-beef-tartare",
    image: "https://ext.same-assets.com/543785121/1490506319.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "20 min",
    difficulty: "Easy",
    category: {
      name: "Appetizers",
      slug: "appetizers"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "April 10, 2022"
  },
  {
    title: "Mediterranean Chickpea Salad",
    slug: "2022/03/22/mediterranean-chickpea-salad",
    image: "https://ext.same-assets.com/543785121/3068330999.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "30 min",
    difficulty: "Easy",
    category: {
      name: "Salads",
      slug: "salads"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "March 22, 2022"
  },
  {
    title: "Moscow Mule Cocktail",
    slug: "2022/03/13/moscow-mule-cocktail",
    image: "https://ext.same-assets.com/543785121/3923550811.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "10 minutes",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "March 13, 2022"
  },
  {
    title: "Blood Orange Mimosa",
    slug: "2022/02/10/blood-orange-mimosa",
    image: "https://ext.same-assets.com/543785121/103569570.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "15 minutes",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "February 10, 2022"
  }
]
