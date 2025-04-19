"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Star, Clock, ArrowLeft, TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddBlogPage() {
  const router = useRouter();
  const [blogType, setBlogType] = useState("recipe");
  const [ingredients, setIngredients] = useState(["", ""]);
  const [directions, setDirections] = useState(["", ""]);
  const [rating, setRating] = useState(5);

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // In a real app, you would save the blog post here
    console.log("Form submitted");
    router.push('/blog');
  };

  // Add a new ingredient input field
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  // Update an ingredient value
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  // Remove an ingredient input field
  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      setIngredients(newIngredients);
    }
  };

  // Add a new direction input field
  const addDirection = () => {
    setDirections([...directions, ""]);
  };

  // Update a direction value
  const updateDirection = (index: number, value: string) => {
    const newDirections = [...directions];
    newDirections[index] = value;
    setDirections(newDirections);
  };

  // Remove a direction input field
  const removeDirection = (index: number) => {
    if (directions.length > 1) {
      const newDirections = [...directions];
      newDirections.splice(index, 1);
      setDirections(newDirections);
    }
  };

  return (
    <div className="container-custom mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">My Blog</Link>
          <span className="mx-2">/</span>
          <span>Add New Blog</span>
        </div>
        
        <div className="flex-col items-center mb-6 space-y-4">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => router.push('/blog')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Blog
          </Button>
          <h1 className="text-3xl font-heading font-bold">Create New Blog Post</h1>
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

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <Label htmlFor="title" className="block text-sm font-medium mb-2">
              Blog Title
            </Label>
            <Input
              id="title"
              placeholder={blogType === "recipe" ? "e.g. Spicy Garlic Noodles" : "e.g. Review: Hawker Chan - Singapore"}
              className="border border-border bg-background"
              required
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="featuredImage" className="block text-sm font-medium mb-2">
              Featured Image
            </Label>
            <div className="border border-dashed border-border rounded-md p-8 text-center bg-muted/20">
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm text-muted-foreground">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:underline">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                  </label>
                  <p>or drag and drop</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <TabsContent value="recipe">
            <div className="space-y-8">
              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-2">
                  Recipe Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell the story behind this recipe..."
                  className="border border-border bg-background min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                    Difficulty
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-full border border-border bg-background">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="time" className="block text-sm font-medium mb-2">
                    Time to Make
                  </Label>
                  <div className="flex items-center border border-border rounded-md bg-background">
                    <Input
                      id="time"
                      type="number"
                      placeholder="30"
                      min="1"
                      className="border-0"
                      required
                    />
                    <div className="px-3 flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <Select defaultValue="minutes">
                        <SelectTrigger className="border-0 p-0 h-auto">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Ingredients</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addIngredient}
                  >
                    Add Ingredient
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
                        placeholder={`e.g. 1 cup flour`}
                        className="border border-border bg-background"
                        required
                      />
                      {ingredients.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Directions</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addDirection}
                  >
                    Add Step
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {directions.map((direction, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <Textarea
                        value={direction}
                        onChange={(e) => updateDirection(index, e.target.value)}
                        placeholder={`e.g. Preheat oven to 350°F...`}
                        className="border border-border bg-background"
                        required
                      />
                      {directions.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeDirection(index)}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional tips or notes..."
                  className="border border-border bg-background"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review">
            <div className="space-y-8">
              <div>
                <Label htmlFor="restaurantName" className="block text-sm font-medium mb-2">
                  Restaurant Name
                </Label>
                <Input
                  id="restaurantName"
                  placeholder="e.g. Hawker Chan"
                  className="border border-border bg-background"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location" className="block text-sm font-medium mb-2">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. 78 Smith Street, Singapore"
                  className="border border-border bg-background"
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating" className="block text-sm font-medium mb-2">
                  Rating
                </Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.5"
                    value={rating}
                    onChange={(e) => setRating(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <div className="flex items-center bg-muted/20 px-3 py-1 rounded-md">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : i < rating
                            ? "text-yellow-500 fill-yellow-500 opacity-50"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-medium">{rating}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="cuisineType" className="block text-sm font-medium mb-2">
                  Cuisine Type
                </Label>
                <Select>
                  <SelectTrigger className="w-full border border-border bg-background">
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="thai">Thai</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priceRange" className="block text-sm font-medium mb-2">
                  Price Range
                </Label>
                <Select>
                  <SelectTrigger className="w-full border border-border bg-background">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ (Budget-friendly)</SelectItem>
                    <SelectItem value="$$">$$ (Moderate)</SelectItem>
                    <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                    <SelectItem value="$$$$">$$$$ (Fine Dining)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="visitDate" className="block text-sm font-medium mb-2">
                  Date of Visit
                </Label>
                <Input
                  id="visitDate"
                  type="date"
                  className="border border-border bg-background"
                  required
                />
              </div>

              <div>
                <Label htmlFor="review" className="block text-sm font-medium mb-2">
                  Review
                </Label>
                <Textarea
                  id="review"
                  placeholder="Share your dining experience..."
                  className="border border-border bg-background min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="foodRating" className="block text-sm font-medium mb-2">
                    Food Rating
                  </Label>
                  <Select defaultValue="4">
                    <SelectTrigger className="w-full border border-border bg-background">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ★</SelectItem>
                      <SelectItem value="2">2 ★</SelectItem>
                      <SelectItem value="3">3 ★</SelectItem>
                      <SelectItem value="4">4 ★</SelectItem>
                      <SelectItem value="5">5 ★</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="serviceRating" className="block text-sm font-medium mb-2">
                    Service Rating
                  </Label>
                  <Select defaultValue="4">
                    <SelectTrigger className="w-full border border-border bg-background">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ★</SelectItem>
                      <SelectItem value="2">2 ★</SelectItem>
                      <SelectItem value="3">3 ★</SelectItem>
                      <SelectItem value="4">4 ★</SelectItem>
                      <SelectItem value="5">5 ★</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ambienceRating" className="block text-sm font-medium mb-2">
                    Ambience Rating
                  </Label>
                  <Select defaultValue="4">
                    <SelectTrigger className="w-full border border-border bg-background">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 ★</SelectItem>
                      <SelectItem value="2">2 ★</SelectItem>
                      <SelectItem value="3">3 ★</SelectItem>
                      <SelectItem value="4">4 ★</SelectItem>
                      <SelectItem value="5">5 ★</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <Label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Save as draft</span>
              </Label>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/blog')}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Publish Blog
              </Button>
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  );
}