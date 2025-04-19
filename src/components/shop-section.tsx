"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: {
    title: string
    slug: string
    image: string
    price: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <div className="bg-white p-4 rounded-md shadow-sm mb-4 hover:shadow-md transition-shadow duration-300">
        <Link href={`/product/${product.slug}`} className="block" legacyBehavior>
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full object-contain h-64 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>
      <div className="text-center">
        <Link href={`/product/${product.slug}`} legacyBehavior>
          <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-3">${product.price}</p>

        <Button variant="outline" size="sm" className="w-full">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export function ShopSection() {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="section-title mb-10">Shop</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/shop">
              View all items
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

const products = [
  {
    title: "Citrus Bomb",
    slug: "citrus-bomb",
    image: "https://ext.same-assets.com/543785121/3741973376.png",
    price: "7.50"
  },
  {
    title: "Mango Fusion",
    slug: "mango-fusion",
    image: "https://ext.same-assets.com/543785121/295926101.png",
    price: "7.50"
  },
  {
    title: "Exotic Strawberry",
    slug: "exotic-strawberry",
    image: "https://ext.same-assets.com/543785121/500043887.png",
    price: "7.50"
  }
]
