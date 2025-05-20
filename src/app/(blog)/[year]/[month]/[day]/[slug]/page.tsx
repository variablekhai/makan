import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  ChefHat,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Printer,
} from "lucide-react";
import { Recipe } from "@/app/types/recipe";
import { capitalize } from "@/utils/misc";
import { format } from "date-fns";
import CommentBox from "@/components/comments/comment-box";

export const dynamic = "force-static";
export const dynamicParams = false;

// Define the structure of the page parameters
type RecipePageParams = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};

async function fetchRecipes(): Promise<Recipe[]> {
  const res = await fetch("http://localhost:3000/api/v1/recipes");
  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return res.json();
}

export async function generateStaticParams() {
  const recipes = await fetchRecipes();
  return recipes.map((recipe: any) => {
    const [year, month, day, slug] = recipe.slug?.split("/") || [];
    return { year, month, day, slug };
  });
}

// Recipe page component
export default async function RecipePage(props: {
  params: Promise<RecipePageParams["params"]>;
}) {
  const params = await props.params;
  if (!params.year || !params.month || !params.day || !params.slug) {
    throw new Error("A required parameter was not provided as a string");
  }

  const fullSlug = `${params.year}/${params.month}/${params.day}/${params.slug}`;
  const recipes = await fetchRecipes();
  const recipe = recipes.find((recipe: any) => recipe.slug === fullSlug);

  const relatedRecipes = recipes
    .filter((relatedRecipe: any) => relatedRecipe.slug !== fullSlug)
    .slice(0, 4);

  if (!recipe) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Recipe Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested recipe could not be found.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/category/${recipe.category}`}
              className="hover:text-primary"
              legacyBehavior
            >
              {capitalize(recipe.category) || "Uncategorized"}
            </Link>
            <span className="mx-2">/</span>
            <span>{recipe.title}</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                aria-label="Share on Facebook"
              >
                <Facebook size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                aria-label="Share on Twitter"
              >
                <Twitter size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                aria-label="Share on Instagram"
              >
                <Instagram size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                aria-label="Print Recipe"
              >
                <Printer size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="relative overflow-hidden rounded-md mb-6">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                width={800}
                height={600}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              <span>A little story about the recipe.</span>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">{recipe.description}</p>
              <p className="text-muted-foreground">
                This recipe is not just a guide; it's an invitation to elevate
                your culinary skills. With every step, you'll discover flavors
                that captivate the senses and techniques that inspire
                creativity. Let this be the recipe that turns your kitchen into
                a stage for unforgettable moments.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <Link
                href={`/category/${recipe.category}`}
                className="category-badge mb-4"
                legacyBehavior
              >
                {capitalize(recipe.category) || "Uncategorized"}
              </Link>

              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                {recipe.title}
              </h1>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Clock className="w-4 h-4" />
                <span>
                  {recipe.timeToMake.value} {recipe.timeToMake.unit}
                </span>
                <span className="mx-1">•</span>
                <ChefHat className="w-4 h-4" />
                <span>{capitalize(recipe.difficulty)}</span>
              </div>

              <div className="flex items-center space-x-3 mb-8">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${recipe.author.name}`}
                    alt={recipe.author.name}
                  />
                  <AvatarFallback>
                    {recipe.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="text-sm mr-1">by</span>
                    <Link
                      href={`/author`}
                      className="font-medium hover:text-primary ml-1"
                      legacyBehavior
                    >
                      {recipe.author.name}
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {recipe.createdAt
                      ? format(recipe.createdAt, "MMM dd, yyyy, hh:mm a ")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-6 rounded-md mb-8">
              <h2 className="font-heading font-semibold mb-4">Ingredients</h2>

              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
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
                {recipe.directions.map((step, index) => (
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
              <p className="text-muted-foreground italic">
                {recipe.notes || "No additional notes provided."}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Share2 size={14} /> Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Facebook size={14} /> Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Twitter size={14} /> Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Printer size={14} /> Print
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-12" />

        <CommentBox postId={recipe.id} comments={recipe.comments} />

        <div className="mb-12">
          <h2 className="section-title mb-8">Related</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedRecipes.map((relatedRecipe: Recipe) => (
              <div key={relatedRecipe.id} className="group">
                <div className="relative overflow-hidden rounded-md mb-4">
                  <Link href={`/${relatedRecipe.slug}`} legacyBehavior>
                    <Image
                      src={relatedRecipe.imageUrl}
                      alt={relatedRecipe.title}
                      width={300}
                      height={225}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <Link
                    href={`/category/${recipe.category}`}
                    className="absolute top-2 left-2 category-badge text-xs"
                    legacyBehavior
                  >
                    {capitalize(relatedRecipe.category) || "Uncategorized"}
                  </Link>
                </div>

                <Link href={`/${relatedRecipe.slug}`} legacyBehavior>
                  <h3 className="font-heading font-semibold text-base mb-2 group-hover:text-primary transition-colors">
                    {relatedRecipe.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
