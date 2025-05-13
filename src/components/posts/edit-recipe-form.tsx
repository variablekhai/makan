import { useState, useEffect, useRef } from "react";
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

type TimeToMake = {
  value: number;
  unit: string;
};

interface Recipe {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  timeToMake: TimeToMake;
  imageUrl: string | null;
  directions: string[];
  ingredients: string[];
  notes: string;
  isDraft: boolean;
  isFeatured: boolean;
  authorId: string;
  createdAt: string;
}

export default function EditRecipeForm({ post }: { post: Recipe }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState<File | null>(null);

  const originalImageRef = useRef<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (post.imageUrl) {
      fetch(post.imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "featured-image", { type: blob.type });
          setCurrentImage(file);
          originalImageRef.current = file; // Store the original image reference
        })
        .catch((error) => {
          console.error("Error converting image URL to File:", error);
        });
    }
  }, [post.imageUrl]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
      type: post.type,
      difficulty: post.difficulty,
      timeToMake: { value: post.timeToMake.value, unit: post.timeToMake.unit },
      directions: post.directions.map((direction) => ({ value: direction })),
      ingredients: post.ingredients.map((ingredient) => ({
        value: ingredient,
      })),
      notes: post.notes,
      isDraft: post.isDraft,
      isFeatured: post.isFeatured,
      authorId: post.authorId,
    },
  });

  useEffect(() => {
    console.log(currentImage);
    console.log(post.imageUrl);
  }, [currentImage, post.imageUrl]);

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

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    // const file = fileInputRef.current?.files?.[0];

    const formattedData = {
      ...data,
      directions: data.directions.map((d: { value: string }) => d.value),
      ingredients: data.ingredients.map((i: { value: string }) => i.value),
      createdAt: post.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const handlePostUpdate = async (imageUrl?: string) => {
      if (imageUrl) {
        formattedData.imageUrl = imageUrl;
      } else {
        formattedData.imageUrl = post.imageUrl; // use the original
      }

      try {
        const res = await fetch(`/api/v1/recipe/${post.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (!res.ok) throw new Error("Update failed");

        toast.success("Blog post updated!");
        router.push("/blog");
      } catch (err) {
        console.error(err);
        toast.error("Failed to update post");
      } finally {
        setIsLoading(false);
      }
    };

    handlePostUpdate(post.imageUrl || undefined);

    // if (file) {
    //   if (currentImage && file.name === currentImage.name) {
    //     // Same file, skip upload
    //     await handlePostUpdate(post.imageUrl || undefined);
    //   } else {
    //     try {
    //       const uploadRes = await uploadImage(file);
    //       await handlePostUpdate(uploadRes.data.ufsUrl);
    //     } catch (e) {
    //       toast.error("Image upload failed");
    //       console.error(e);
    //       setIsLoading(false);
    //     }
    //   }
    // } else {
    //   await handlePostUpdate(post.imageUrl || undefined);
    // }
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
          src={post?.imageUrl || ""}
          alt="Current featured image"
          className={`w-full h-64 object-cover rounded mb-4 ${
            post?.imageUrl ? "" : "hidden"
          }`}
        />
        {/* <div className="border border-dashed border-border rounded-md p-8 text-center bg-muted/20">
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
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-background font-medium text-primary hover:underline"
              >
                <span>Upload a file</span>
                <input
                  id="imageUrl"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const previewElement =
                          document.getElementById("image-preview");
                        if (previewElement) {
                          previewElement.setAttribute(
                            "src",
                            reader.result as string
                          );
                          previewElement.style.display = "block";
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
              <p>or drag and drop</p>
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
          </div>
        </div> */}
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

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Ingredients</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addIngredient([{ value: "" }])}
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
            {isLoading ? <Spinner size="small" /> : <span>Update Recipe</span>}
          </Button>
        </div>
      </div>
    </form>
  );
}
