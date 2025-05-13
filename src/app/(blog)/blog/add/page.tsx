"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Star, ArrowLeft } from "lucide-react";
import RecipeForm from "@/components/posts/recipe-form";
import useCurrentUser from "@/app/hooks/useCurrentUser";

export default function AddBlogPage() {
  const router = useRouter();

  const { user } = useCurrentUser();
  
  const [blogType, setBlogType] = useState("recipe");

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
          <span>Add New Blog</span>
        </div>

        <div className="flex-col items-center mb-6 space-y-4">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Blog
          </Button>
          <h1 className="text-3xl font-heading font-bold">
            Create New Blog Post
          </h1>
        </div>
      </div>

      <Tabs defaultValue="recipe" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="recipe" onClick={() => setBlogType("recipe")}>
            <ChefHat className="mr-2 h-4 w-4" />
            Food Recipe
          </TabsTrigger>
          <TabsTrigger value="review" onClick={() => setBlogType("review")}>
            <Star className="mr-2 h-4 w-4" />
            Food Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recipe">
          <RecipeForm userId={user?.id}/>
        </TabsContent>
        <TabsContent value="review">
          <span>To be implemented</span>
          <p className="text-sm text-muted-foreground">
            This feature is not yet implemented. Please check back later.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
