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
        <Link href={`/review/${review.slug}`} legacyBehavior>
          <Image
            src={review.image}
            alt={review.title}
            width={400}
            height={300}
            className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <Link
          href={`/category/${review.category.slug}`}
          className="absolute top-4 left-4 category-badge"
          legacyBehavior>
          {review.category.name}
        </Link>
      </div>
      <Link href={`/review/${review.slug}`} legacyBehavior>
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
  );
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
    "title": "Refined Malaysian Flavors at ATAS",
    "slug": "2025/04/20/atas-modern-malaysian-eatery-review",
    "image": "https://theruma.com/file/webpage/shared/banner/dining/atas-5-optimized.jpg",
    "date": "April 20, 2025",
    "rating": 4,
    "restaurant": "ATAS Malaysian Eatery",
    "category": {
      "name": "Malaysian",
      "slug": "malaysian"
    }
  },
  {
    "title": "Innovative Dining at Beta KL",
    "slug": "2025/04/20/beta-kl-review",
    "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiOcfqXV1lQZCjVKdKlFFfywv5DGSM4mtD0H_nW0hedjvlJJpR-ntT9s6m2cVjED-dWmLsGDg0WUygtqkvwAy2KsWRZaq7Ej3I_ulkA8h0-Smga9yTNTrABRzjKZaGqQ9oyRW8KnaYwVUwq/s1600/L1240992-001.jpg",
    "date": "April 20, 2025",
    "rating": 5,
    "restaurant": "Beta KL",
    "category": {
      "name": "Modern Malaysian",
      "slug": "modern-malaysian"
    }
  },
  {
    "title": "Cultural Dining at Songket Restaurant",
    "slug": "2025/04/20/songket-restaurant-review",
    "image": "https://static.toiimg.com/thumb/56290109/Songket-Restaurant.jpg?width=1200&height=900",
    "date": "April 20, 2025",
    "rating": 4,
    "restaurant": "Songket Restaurant",
    "category": {
      "name": "Traditional Malaysian",
      "slug": "traditional-malaysian"
    }
  },
  {
    "title": "Omakase Experience at Eat and Cook",
    "slug": "2025/04/20/eat-and-cook-review",
    "image": "https://media2.malaymail.com/uploads/articles/2021/2021-09/Eat_and_Cook1.jpg",
    "date": "April 20, 2025",
    "rating": 5,
    "restaurant": "Eat and Cook",
    "category": {
      "name": "Contemporary Malaysian",
      "slug": "contemporary-malaysian"
    }
  }
]

