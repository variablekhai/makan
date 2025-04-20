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
    <Link
      href={`/category/${category.slug}`}
      className="group relative block overflow-hidden rounded-md"
      legacyBehavior>
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
  );
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyYqlMWihydRmKH593aaedlx9mTjiT0jA1w&s",
    count: 3
  },
  {
    name: "Appetizers",
    slug: "appetizers",
    image: "https://www.ajinomoto.com.my/sites/default/files/content/recipe/image/2023-04/Cucur%20Jagung%20Ketam.jpg",
    count: 2
  },
  {
    name: "Desserts",
    slug: "desserts",
    image: "https://images.ctfassets.net/u128j5s4q9gv/61TqhppWWhVPHLWbu2akcu/5667b32e6d2cbdff7d43ef20c6a739c0/Screen_Shot_2019-01-17_at_12.40.14.png",
    count: 6
  }
]
