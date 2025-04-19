"use client"
import { useState, useEffect, Key } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
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

// Mock data for blog posts
const mockRecipe = {
  id: "1",
  title: "Spicy Garlic Noodles",
  type: "recipe",
  description: "A quick and easy noodle dish that packs a punch with garlic and chili. Perfect for weeknight dinners when you need something satisfying in a hurry.",
  difficulty: "easy",
  timeToMake: "30",
  timeUnit: "minutes",
  ingredients: [
    "8 oz dried noodles (ramen, soba, or udon)",
    "4 cloves garlic, minced",
    "2 tbsp vegetable oil",
    "1 tbsp chili oil",
    "2 tbsp soy sauce",
    "1 tbsp rice vinegar",
    "1 tsp sugar",
    "2 green onions, sliced",
    "Sesame seeds for garnish"
  ],
  directions: [
    "Bring a pot of water to a boil and cook noodles according to package instructions. Drain and set aside.",
    "In a small bowl, mix soy sauce, rice vinegar, and sugar until dissolved.",
    "Heat vegetable oil in a large pan or wok over medium heat. Add minced garlic and cook until fragrant, about 30 seconds.",
    "Add the cooked noodles to the pan and toss with the garlic. Pour in the sauce mixture and chili oil, then toss until well combined.",
    "Garnish with sliced green onions and sesame seeds before serving."
  ],
  notes: "You can adjust the spice level by increasing or decreasing the amount of chili oil.",
  published: true,
  image: "/images/spicy-garlic-noodles.jpg"
};

const mockReview = {
  id: "3",
  title: "Review: Hawker Chan - Singapore",
  type: "review",
  restaurantName: "Hawker Chan",
  location: "78 Smith Street, Singapore",
  cuisineType: "chinese",
  priceRange: "$",
  visitDate: "2025-03-01",
  rating: 4.5,
  review: "Hawker Chan is famous for being the world's cheapest Michelin-starred meal, and it doesn't disappoint. The signature soya sauce chicken rice is tender, flavorful, and incredibly affordable. Despite the long lines, the service is efficient and the food comes out quickly. While the dining space is simple, it's all about the food here, which truly lives up to the hype.",
  orderedItems: [
    { name: "Soya Sauce Chicken Rice", rating: 5 },
    { name: "Char Siu (BBQ Pork)", rating: 4 }
  ],
  foodRating: "5",
  serviceRating: "4",
  ambienceRating: "3",
  published: true,
  image: "/images/hawker-chan.jpg"
};

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const [blogData, setBlogData] = useState<any>(null);
  const [blogType, setBlogType] = useState<any>("recipe");
  const [ingredients, setIngredients] = useState<any>([]);
  const [directions, setDirections] = useState<any>([]);
  const [orderedItems, setOrderedItems] = useState<any>([]);
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching blog data
  useEffect(() => {
    // In a real app, you would fetch the data based on params.id
    const id = params?.id;
    
    setTimeout(() => {
      if (id === "1") {
        setBlogData(mockRecipe);
        setBlogType("recipe");
        setIngredients(mockRecipe.ingredients);
        setDirections(mockRecipe.directions);
      } else if (id === "3") {
        setBlogData(mockReview);
        setBlogType("review");
        setRating(mockReview.rating);
        setOrderedItems(mockReview.orderedItems);
      }
      setIsLoading(false);
    }, 500);
  }, [params?.id]);

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // In a real app, you would update the blog post here
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

  // Add a new ordered item field
  const addOrderedItem = () => {
    setOrderedItems([...orderedItems, { name: "", rating: "5" }]);
  };

  // Update an ordered item
  const updateOrderedItem = (index: number, field: string, value: string | number) => {
    const newItems = [...orderedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setOrderedItems(newItems);
  };

  // Remove an ordered item field
  const removeOrderedItem = (index: number) => {
    if (orderedItems.length > 1) {
      const newItems = [...orderedItems];
      newItems.splice(index, 1);
      setOrderedItems(newItems);
    }
  };

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
        <p className="text-muted-foreground mb-8">The requested blog post could not be found.</p>
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
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">My Blog</Link>
          <span className="mx-2">/</span>
          <span>Edit Blog</span>
        </div>
        
        <div className="flex-col space-y-4 items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mr-4"
            onClick={() => router.push('/blog')}
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

        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <Label htmlFor="title" className="block text-sm font-medium mb-2">
              Blog Title
            </Label>
            <Input
              id="title"
              defaultValue={blogData.title}
              className="border border-border bg-background"
              required
            />
          </div>

          <div className="mb-8">
            <Label htmlFor="featuredImage" className="block text-sm font-medium mb-2">
              Featured Image
            </Label>
            <div className="border border-dashed border-border rounded-md overflow-hidden">
              {blogData.image && (
                <div className="relative p-2">
                  <img 
                    src="https://biteswithbri.com/wp-content/uploads/2023/07/ChiliGarlicNoodles03.jpg" 
                    alt="Current featured image"
                    className="w-full h-64 object-cover rounded mb-4" 
                  />
                  <div className="absolute top-4 right-4">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      type="button"
                    >
                      Replace Image
                    </Button>
                  </div>
                </div>
              )}
              <div className="p-8 text-center bg-muted/20">
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
          </div>

          <TabsContent value="recipe">
            <div className="space-y-8">
              <div>
                <Label htmlFor="description" className="block text-sm font-medium mb-2">
                  Recipe Description
                </Label>
                <Textarea
                  id="description"
                  defaultValue={blogData.description}
                  className="border border-border bg-background min-h-32"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="difficulty" className="block text-sm font-medium mb-2">
                    Difficulty
                  </Label>
                  <Select defaultValue={blogData.difficulty}>
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
                      defaultValue={blogData.timeToMake}
                      min="1"
                      className="border-0"
                      required
                    />
                    <div className="px-3 flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <Select defaultValue={blogData.timeUnit}>
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
                  {ingredients.map((ingredient: string | number | readonly string[] | undefined, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={ingredient}
                        onChange={(e) => updateIngredient(index, e.target.value)}
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
                  {directions.map((direction: string | number | readonly string[] | undefined, index: number) => (
                    <div key={index} className="flex gap-2">
                      <div className="flex-shrink-0 mr-2">
                        <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <Textarea
                        value={direction}
                        onChange={(e) => updateDirection(index, e.target.value)}
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
                  defaultValue={blogData.notes}
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
                  defaultValue={blogData.restaurantName}
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
                  defaultValue={blogData.location}
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
                <Select defaultValue={blogData.cuisineType}>
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
                <Select defaultValue={blogData.priceRange}>
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
                  defaultValue={blogData.visitDate}
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
                  defaultValue={blogData.review}
                  className="border border-border bg-background min-h-32"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">What We Ordered</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addOrderedItem}
                  >
                    Add Dish
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {orderedItems.map((item: { name: string | number | readonly string[] | undefined; rating: { toString: () => string | undefined; }; }, index: Key | null | undefined) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item.name}
                        onChange={(e) => updateOrderedItem(Number(index), "name", e.target.value)}
                        placeholder="e.g. Soya Sauce Chicken Rice"
                        className="border border-border bg-background"
                        required
                      />
                      <Select 
                        value={item.rating.toString()} 
                        onValueChange={(value) => updateOrderedItem(Number(index), "rating", parseInt(value))}
                      >
                        <SelectTrigger className="w-32 border border-border bg-background">
                          <SelectValue placeholder="Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 ★</SelectItem>
                          <SelectItem value="2">2 ★</SelectItem>
                          <SelectItem value="3">3 ★</SelectItem>
                          <SelectItem value="4">4 ★</SelectItem>
                          <SelectItem value="5">5 ★</SelectItem>
                        </SelectContent>
                      </Select>
                      {orderedItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOrderedItem(Number(index))}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="foodRating" className="block text-sm font-medium mb-2">
                    Food Rating
                  </Label>
                  <Select defaultValue={blogData.foodRating}>
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
                  <Select defaultValue={blogData.serviceRating}>
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
                  <Select defaultValue={blogData.ambienceRating}>
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
                <input 
                  type="checkbox" 
                  className="mr-2" 
                  defaultChecked={!blogData.published}
                />
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
                Update Blog
              </Button>
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  );
}