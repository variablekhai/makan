import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function RecipeForm({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "recipe",
      category: "",
      difficulty: "",
      timeToMake: { value: 0, unit: "minutes" },
      imageUrl: null,
      directions: [{ value: "" }],
      ingredients: [{ value: "" }],
      notes: "",
      isDraft: false,
      isFeatured: false,
      authorId: userId,
    },
  });

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: directionFields,
    append: addDirection,
    remove: removeDirection,
  } = useFieldArray({
    control,
    name: "directions",
  });

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  const onSubmit = (data: any) => {
    setIsLoading(true);
    const formattedData = {
      ...data,
      directions: data.directions.map((item: { value: string }) => item.value),
      ingredients: data.ingredients.map(
        (item: { value: string }) => item.value
      ),
      slug: (() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const titleSlug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return `${year}/${month}/${day}/${titleSlug}`;
      })(),
    };

    if (userId) {
      formattedData.authorId = userId;

      const handlePostCreation = (imageUrl?: string) => {
        if (imageUrl) {
          formattedData.imageUrl = imageUrl;
        }

        fetch("/api/v1/recipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        })
          .then((response) => {
            if (response.ok) {
              toast.success("Post created successfully!");
              router.push("/blog");
            } else {
              toast.error("Failed to create post");
              throw new Error("Failed to create post");
            }
          })
          .catch((error) => {
            toast.error("Error creating post");
            console.error("Error creating post:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };

      if (formattedData.imageUrl) {
        uploadImage(formattedData.imageUrl[0])
          .then((imageData) => {
            console.log("Image uploaded successfully:", imageData);
            handlePostCreation(imageData.data.ufsUrl);
          })
          .catch((error) => {
            toast.error("Error uploading image");
            console.error("Error uploading image:", error);
            setIsLoading(false);
          });
      } else {
        handlePostCreation();
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8">
        <Label htmlFor="title" className="block text-sm font-medium mb-2">
          Blog Title
        </Label>
        <Input
          id="title"
          placeholder="e.g. Best Nasi Goreng in Town"
          className="border border-border bg-background"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-8">
        <Label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
          Featured Image
        </Label>
        <img
          id="image-preview"
          src="null"
          alt="Current featured image"
          className="w-full h-64 object-cover rounded mb-4 hidden"
        />
        <label
          htmlFor="imageUrl"
          className="border border-dashed border-border rounded-md p-8 text-center bg-muted/20 cursor-pointer flex flex-col items-center justify-center space-y-2"
        >
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
            <span className="rounded-md bg-background font-medium text-primary hover:underline">
              Upload a file
            </span>
            <p>or drag and drop</p>
          </div>
          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
          <input
            id="imageUrl"
            type="file"
            className="sr-only"
            accept="image/*"
            {...register("imageUrl", {
              required: "Featured image is required",
            })}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const previewElement =
                    document.getElementById("image-preview");
                  if (previewElement) {
                    previewElement.setAttribute("src", reader.result as string);
                    previewElement.style.display = "block";
                  }
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </label>
        {errors.imageUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="space-y-8">
        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Recipe Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell the story behind this recipe..."
            className="border border-border bg-background min-h-32"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="difficulty"
              className="block text-sm font-medium mb-2"
            >
              Difficulty
            </Label>
            <Controller
              control={control}
              name="difficulty"
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full border border-border bg-background">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.difficulty && (
              <p className="text-red-500 text-sm mt-1">
                {errors.difficulty.message}
              </p>
            )}
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
                {...register("timeToMake.value", {
                  required: "Time is required",
                  valueAsNumber: true,
                  min: 1,
                })}
              />
              <div className="px-3 flex items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <Controller
                  control={control}
                  name="timeToMake.unit"
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="border-0 p-0 h-auto">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minutes">Minutes</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            {errors.timeToMake?.value && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timeToMake.value.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <Label
              htmlFor="category"
              className="block text-sm font-medium mb-2"
            >
              Category
            </Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full border border-border bg-background">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main</SelectItem>
                    <SelectItem value="appetizers">Appetizers</SelectItem>
                    <SelectItem value="soups">Soups</SelectItem>
                    <SelectItem value="desserts">Desserts</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Ingredients</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addIngredient({ value: "" })}
            >
              Add Ingredient
            </Button>
          </div>

          <div className="space-y-3">
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Controller
                  control={control}
                  name={`ingredients.${index}.value`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`e.g. 1 cup flour`}
                      className="border border-border bg-background"
                      required
                    />
                  )}
                />
                {ingredientFields.length > 1 && (
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
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Directions</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addDirection({ value: "" })}
            >
              Add Step
            </Button>
          </div>

          <div className="space-y-4">
            {directionFields.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-start">
                <div className="mt-2 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <Textarea
                  {...register(`directions.${index}.value`, { required: true })}
                  placeholder="e.g. Preheat oven..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDirection(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {errors.directions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.directions.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="notes" className="block text-sm font-medium mb-2">
            Notes (Optional)
          </Label>
          <Textarea
            id="notes"
            placeholder="Any additional tips or notes..."
            className="border border-border bg-background"
            {...register("notes")}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <Label className="flex items-center">
            <input type="checkbox" className="mr-2" {...register("isDraft")} />
            <span className="text-sm">Save as draft</span>
          </Label>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/blog")}
          >
            Cancel
          </Button>
          <Button
            className={`${
              isLoading ? "bg-primary/70" : "bg-primary hover:bg-primary/90"
            }`}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <Spinner size="small" /> : <span>Publish Blog</span>}
          </Button>
        </div>
      </div>
    </form>
  );
}
