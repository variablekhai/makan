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
    "id": "5",
    "title": "Satay Chicken Skewers",
    "slug": "2025/04/20/satay-chicken-skewers",
    "image": "https://www.unileverfoodsolutions.com.my/dam/global-ufs/mcos/SEA/calcmenu/recipes/MY-recipes/chicken-&-other-poultry-dishes/satay-ayam/main-header.jpg",
    "description": "Grilled skewers of marinated chicken served with spicy peanut sauce, cucumber, and rice cakes.",
    "time": "35 min",
    "difficulty": "Easy",
    "category": {
      "name": "Appetizers",
      "slug": "appetizers"
    },
    "author": {
      "name": "Muhammad Ali",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "m-ali"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "6",
    "title": "Beef Rendang",
    "slug": "2025/04/20/beef-rendang",
    "image": "https://www.elmundoeats.com/wp-content/uploads/2023/04/A-bowl-of-beef-rendang.jpg",
    "description": "A slow-cooked dry curry with tender beef simmered in coconut milk and spices until rich and aromatic.",
    "time": "2 hrs",
    "difficulty": "Hard",
    "category": {
      "name": "Main Course",
      "slug": "main-course"
    },
    "author": {
      "name": "Zulkarnian",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "zulkarnian"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "7",
    "title": "Cendol",
    "slug": "2025/04/20/cendol",
    "image": "https://asianinspirations.com.au/wp-content/uploads/2019/11/R00389-Cendol-1920x1280.jpg",
    "description": "A sweet dessert made with shaved ice, green rice flour jelly, coconut milk, and palm sugar syrup.",
    "time": "20 min",
    "difficulty": "Easy",
    "category": {
      "name": "Desserts",
      "slug": "desserts"
    },
    "author": {
      "name": "Fathullah",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "fathullah"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "8",
    "title": "Mee Goreng Mamak",
    "slug": "2025/04/20/mee-goreng-mamak",
    "image": "https://www.unileverfoodsolutions.com.my/dam/global-ufs/mcos/SEA/calcmenu/recipes/MY-recipes/vegetables-&-vegetable-dishes/mee-goreng-mamak/main-header.jpg",
    "description": "Spicy stir-fried yellow noodles with tofu, egg, potato, and a savory-sweet tomato sauce.",
    "time": "25 min",
    "difficulty": "Easy",
    "category": {
      "name": "Street Food",
      "slug": "street-food"
    },
    "author": {
      "name": "Mamak Legend",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "mamak-legend"
    },
    "date": "April 20, 2025"
  },
]