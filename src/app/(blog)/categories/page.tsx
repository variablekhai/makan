import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/recipes";

export const metadata = {
  title: "Categories – Makan²",
  description: "Browse recipe categories in our food blog.",
};

export default function CategoriesPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Recipe Categories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of delicious recipes by category and find the
            perfect dish for any occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              legacyBehavior
            >
              <div className="group relative block aspect-square overflow-hidden rounded-md">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col items-center justify-center p-4 text-white">
                  <h3 className="text-xl font-heading font-bold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm opacity-90">{category.count} recipes</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
