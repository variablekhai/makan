"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Star } from "lucide-react"

interface FoodReviewProps {
  review: {
    title: string
    slug: string
    image: string
    date: string
    rating: number
    restaurant: string
    category: {
      name: string
      slug: string
    }
  }
}

export function FoodReviewCard({ review }: FoodReviewProps) {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-md mb-4">
        <Link href={`/review/${review.slug}`}>
          <Image
            src={review.image}
            alt={review.title}
            width={400}
            height={300}
            className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Link href={`/category/${review.category.slug}`} className="absolute top-4 left-4 category-badge">
          {review.category.name}
        </Link>
      </div>

      <Link href={`/review/${review.slug}`}>
        <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
          {review.title}
        </h3>
      </Link>

      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
        <Calendar className="w-4 h-4" />
        <span>{review.date}</span>
      </div>

      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
        ))}
        <span className="ml-2 text-sm text-muted-foreground">{review.restaurant}</span>
      </div>

      <Button variant="outline" size="sm" asChild>
        <Link href={`/review/${review.slug}`}>
          Read review
        </Link>
      </Button>
    </div>
  )
}

export function FoodReviews() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container-custom">
        <h2 className="section-title mb-10">Latest Food Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodReviews.map((review) => (
            <FoodReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

const foodReviews = [
  {
    title: "The Perfect Pasta Experience at Trattoria Milano",
    slug: "2023/04/13/trattoria-milano-pasta-review",
    image: "https://ext.same-assets.com/543785121/746458956.jpeg",
    date: "April 13, 2023",
    rating: 4,
    restaurant: "Trattoria Milano",
    category: {
      name: "Italian",
      slug: "italian"
    }
  },
  {
    title: "Spicy Delights at Bangkok Street Food",
    slug: "2023/03/13/bangkok-street-food-review",
    image: "https://ext.same-assets.com/543785121/3923550811.jpeg",
    date: "March 13, 2023",
    rating: 5,
    restaurant: "Bangkok Street Food",
    category: {
      name: "Thai",
      slug: "thai"
    }
  },
  {
    title: "Seafood Paradise at Ocean Grill",
    slug: "2023/02/10/ocean-grill-seafood-review",
    image: "https://ext.same-assets.com/543785121/103569570.jpeg",
    date: "February 10, 2023",
    rating: 3,
    restaurant: "Ocean Grill",
    category: {
      name: "Seafood",
      slug: "seafood"
    }
  },
  {
    title: "Authentic Mexican Flavors at Casa Bonita",
    slug: "2023/01/13/casa-bonita-mexican-review",
    image: "https://ext.same-assets.com/543785121/224804076.jpeg",
    date: "January 13, 2023",
    rating: 4,
    restaurant: "Casa Bonita",
    category: {
      name: "Mexican",
      slug: "mexican"
    }
  }
]
