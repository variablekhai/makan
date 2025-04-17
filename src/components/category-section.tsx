"use client"

import Link from "next/link"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface CategoryCardProps {
  category: {
    name: string
    slug: string
    image: string
    count: number
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`} className="group relative block overflow-hidden rounded-md">
      <AspectRatio ratio={1}>
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col items-center justify-center p-4 text-white">
          <h3 className="text-xl font-heading font-bold mb-1">{category.name}</h3>
          <p className="text-sm opacity-90">{category.count} recipes</p>
        </div>
      </AspectRatio>
    </Link>
  )
}

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

const categories = [
  {
    name: "Main",
    slug: "main",
    image: "https://ext.same-assets.com/543785121/3068330999.jpeg",
    count: 3
  },
  {
    name: "Appetizers",
    slug: "appetizers",
    image: "https://ext.same-assets.com/543785121/1490506319.jpeg",
    count: 2
  },
  {
    name: "Desserts",
    slug: "desserts",
    image: "https://ext.same-assets.com/543785121/3477451376.jpeg",
    count: 6
  }
]
