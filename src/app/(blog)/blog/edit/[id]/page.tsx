"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Star, Clock, ArrowLeft, TrashIcon } from "lucide-react";
import EditRecipeForm from "@/components/posts/edit-recipe-form";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [blogData, setBlogData] = useState<any>(null);
  const [blogType, setBlogType] = useState<any>("recipe");
  const [isLoading, setIsLoading] = useState(true);

  const id = params?.id;

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      if (id) {
        const response = await fetch(`/api/v1/recipe/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched blog data:", data);
        if (!response.ok) {
          console.error("Error fetching blog data:", data);
          return;
        }

        setBlogData(data.recipe);
        setBlogType(data.recipe.type);
      }
      setIsLoading(false);
    }
    fetchBlogData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container-custom mx-auto py-10 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted/20 rounded w-1/3 mx-auto mb-6"></div>
          <div className="h-32 bg-muted/20 rounded mb-6"></div>
          <div className="h-64 bg-muted/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="container-custom mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The requested blog post could not be found.
        </p>
        <Button asChild>
          <Link href="/blog">Return to My Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">
            My Blog
          </Link>
          <span className="mx-2">/</span>
          <span>Edit Blog</span>
        </div>

        <div className="flex-col space-y-4 items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Blog
          </Button>
          <h1 className="text-3xl font-heading font-bold">Edit Blog Post</h1>
        </div>
      </div>

      <Tabs defaultValue={blogType} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger
            value="recipe"
            onClick={() => setBlogType("recipe")}
            disabled={blogData.type !== "recipe"}
          >
            <ChefHat className="mr-2 h-4 w-4" />
            Food Recipe
          </TabsTrigger>
          <TabsTrigger
            value="review"
            onClick={() => setBlogType("review")}
            disabled={blogData.type !== "review"}
          >
            <Star className="mr-2 h-4 w-4" />
            Food Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipe">
          <EditRecipeForm post={blogData}/>
        </TabsContent>
        <TabsContent value="review">
          <span>To be implemented</span>
        </TabsContent>
      </Tabs>
    </div>
  );
}
