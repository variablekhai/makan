import Link from "next/link"
import Image from "next/image"
import { RecipeGrid } from "@/components/recipe-card"
import { recipes, categories } from "@/data/recipes"
import { Clock } from "lucide-react"

export const dynamic = 'force-static'
export const dynamicParams = false

// Define the structure of the page parameters
type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all categories
export function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

// Helper function to find a category by slug
function findCategory(slug: string) {
  return categories.find((category) => category.slug === slug)
}

// Generate metadata for the page
export async function generateMetadata(props: CategoryPageProps) {
  const params = await props.params;
  const category = findCategory(params.slug)

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.name} Recipes – Makan²`,
    description: `Browse our collection of delicious ${category.name.toLowerCase()} recipes.`,
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const category = findCategory(params.slug)

  if (!category) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested category could not be found.</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Return Home
        </Link>
      </div>
    )
  }

  const categoryRecipes = recipes.filter((recipe) =>
    recipe.category.slug === params.slug
  )

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            {category.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of delicious {category.name.toLowerCase()} recipes perfect for any occasion.
          </p>
        </div>

        {categoryRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categoryRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card group">
                <div className="relative overflow-hidden rounded-md mb-4">
                  <Link href={`/${recipe.slug}`} legacyBehavior>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={400}
                      height={300}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <Link
                    href={`/category/${recipe.category.slug}`}
                    className="absolute top-4 left-4 category-badge"
                    legacyBehavior>
                    {recipe.category.name}
                  </Link>
                </div>

                <Link href={`/${recipe.slug}`} legacyBehavior>
                  <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                </Link>

                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={recipe.author.image}
                    alt={recipe.author.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div className="flex text-sm text-muted-foreground">
                    <Link
                      href={`/author/${recipe.author.slug}`}
                      className="hover:text-primary"
                      legacyBehavior>
                      {recipe.author.name}
                    </Link>
                    <span className="mx-1">•</span>
                    <span>{recipe.date}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.time}</span>
                  <span className="mx-1">•</span>
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold mb-2">No recipes found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find any recipes in this category.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Browse all recipes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
