import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, ChefHat, Share2, Facebook, Twitter, Instagram, Printer } from "lucide-react"
import { recipes } from "@/data/recipes"

export const dynamic = 'force-static'
export const dynamicParams = false

// Define the structure of the page parameters
type RecipePageProps = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
}

// Generate static params for all recipes
export function generateStaticParams() {
  return recipes.map((recipe) => {
    const [year, month, day, slug] = recipe.slug.split("/")
    return { year, month, day, slug }
  })
}

// Generate metadata for the page
export function generateMetadata({ params }: RecipePageProps) {
  const { year, month, day, slug } = params
  const recipe = findRecipe(params)

  if (!recipe) {
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    }
  }

  return {
    title: `${recipe.title} – CookBook`,
    description: recipe.description,
  }
}

// Helper function to find a recipe based on URL parameters
function findRecipe(params: RecipePageProps['params']) {
  const { year, month, day, slug } = params
  return recipes.find((r) => {
    const [rYear, rMonth, rDay, rSlug] = r.slug.split("/")
    return rYear === year && rMonth === month && rDay === day && rSlug === slug
  })
}

// Recipe page component
export default function RecipePage({ params }: RecipePageProps) {
  const recipe = findRecipe(params)

  if (!recipe) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested recipe could not be found.</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    )
  }

  // Mock data for recipe details
  const ingredients = [
    "1 cup Water",
    "1 cup Sugar",
    "1/2 cup Honey",
    "2 Rosemary Sprigs",
    "3 oz. Rye Whiskey",
    "1 oz. Rosemary and Honey Simple Syrup",
    "2 Dashes Aromatic Bitters",
    "1 Rosemary Sprig",
    "Orange Peel, Garnish"
  ]

  const directions = [
    "Add water, honey and sugar to a pot and bring to a boil. Once sugar dissolves, add rosemary sprigs and boil for an additional minute then lower to a simmer for 10 minutes.",
    "Add whiskey, bitters, and rosemary & honey simple syrup into a cocktail glass and stir.",
    "Add one large ice cube then garnish with an orange peel and rosemary sprig. Serve immediately."
  ]

  // Mock data for related recipes
  const relatedRecipes = recipes.filter(r => r.id !== recipe.id).slice(0, 4)

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href={`/category/${recipe.category.slug}`} className="hover:text-primary">{recipe.category.name}</Link>
            <span className="mx-2">/</span>
            <span>{recipe.title}</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-full" aria-label="Share on Facebook">
                <Facebook size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full" aria-label="Share on Twitter">
                <Twitter size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full" aria-label="Share on Instagram">
                <Instagram size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full" aria-label="Print Recipe">
                <Printer size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="relative overflow-hidden rounded-md mb-6">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={800}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              <span>This is an example of affiliate disclosure. You can add your own text here or remove it completely #sponsoredpost.</span>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                {recipe.description}
              </p>
              <p className="text-muted-foreground">
                All your supporting arguments must be communicated with simplicity and charm. And in such a way that the reader will read on. (After all, that's a reader's job: to read, isn't it?) And by the time your readers have reached this point in the finished copy, you will have convinced them that you not only respect their intelligence, but you also understand their needs as consumers.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <Link href={`/category/${recipe.category.slug}`} className="category-badge mb-4">
                {recipe.category.name}
              </Link>

              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {recipe.title}
              </h1>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>{recipe.time}</span>
                <span className="mx-1">•</span>
                <ChefHat className="w-4 h-4" />
                <span>{recipe.difficulty}</span>
              </div>

              <div className="flex items-center space-x-3 mb-8">
                <Avatar>
                  <AvatarImage src={recipe.author.image} alt={recipe.author.name} />
                  <AvatarFallback>{recipe.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm">by</span>
                    <Link href={`/author/${recipe.author.slug}`} className="font-medium hover:text-primary ml-1">
                      {recipe.author.name}
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">{recipe.date}</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-6 rounded-md mb-8">
              <h2 className="font-heading font-semibold mb-4">Ingredients</h2>

              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-2 w-4 h-4 border border-primary/30 rounded-sm"></div>
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-heading font-semibold mb-4">Directions</h2>

              <div className="space-y-4">
                {directions.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-heading font-semibold mb-4">Notes</h2>
              <p className="text-muted-foreground italic">Recipe credit: dudethatcookz.com</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 size={14} /> Share
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Facebook size={14} /> Facebook
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Twitter size={14} /> Twitter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Printer size={14} /> Print
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-8">
            <Avatar className="w-16 h-16">
              <AvatarImage src={recipe.author.image} alt={recipe.author.name} />
              <AvatarFallback>{recipe.author.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/author/${recipe.author.slug}`} className="font-heading font-semibold text-lg hover:text-primary">
                {recipe.author.name}
              </Link>
              <p className="text-muted-foreground">
                Cras mattis consectetur purus sit amet fermentum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
              </p>
              <div className="flex gap-2 mt-2">
                <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                  <Facebook size={16} />
                </Link>
                <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                  <Twitter size={16} />
                </Link>
                <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                  <Instagram size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="section-title mb-8">Related</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedRecipes.map((relatedRecipe) => (
              <div key={relatedRecipe.id} className="group">
                <div className="relative overflow-hidden rounded-md mb-4">
                  <Link href={`/${relatedRecipe.slug}`}>
                    <Image
                      src={relatedRecipe.image}
                      alt={relatedRecipe.title}
                      width={300}
                      height={225}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <Link href={`/category/${relatedRecipe.category.slug}`} className="absolute top-2 left-2 category-badge text-xs">
                    {relatedRecipe.category.name}
                  </Link>
                </div>

                <Link href={`/${relatedRecipe.slug}`}>
                  <h3 className="font-heading font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                    {relatedRecipe.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/20 p-8 rounded-md">
          <h2 className="text-2xl font-heading font-semibold mb-4">Leave a Comment</h2>
          <p className="text-muted-foreground mb-6">Your email address will not be published. Required fields are marked *</p>

          <form className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="comment" className="sr-only">Message</label>
                <textarea
                  id="comment"
                  rows={6}
                  placeholder="Message"
                  className="w-full p-3 border border-border rounded-md bg-background"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Name *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name *"
                  required
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label htmlFor="website" className="sr-only">Website</label>
                <input
                  id="website"
                  type="text"
                  placeholder="Website"
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Save my name, email, and website in this browser for the next time I comment.</span>
              </label>
            </div>

            <Button className="bg-primary hover:bg-primary/90">
              Post Comment
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
