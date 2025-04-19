"use client"
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon, PencilIcon, TrashIcon, ChefHat, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data for blog posts
const mockBlogs = [
  {
    id: "1",
    title: "Spicy Garlic Noodles",
    type: "recipe",
    difficulty: "Easy",
    timeToMake: "30 mins",
    createdAt: new Date("2025-03-15"),
    published: true,
  },
  {
    id: "2",
    title: "Authentic Italian Pizza",
    type: "recipe",
    difficulty: "Medium",
    timeToMake: "1 hour",
    createdAt: new Date("2025-03-10"),
    published: true,
  },
  {
    id: "3",
    title: "Review: Hawker Chan - Singapore",
    type: "review",
    rating: 4.5,
    createdAt: new Date("2025-03-05"),
    published: true,
  },
  {
    id: "4",
    title: "Chocolate Lava Cake",
    type: "recipe",
    difficulty: "Hard",
    timeToMake: "45 mins",
    createdAt: new Date("2025-02-28"),
    published: false,
  },
];

export default function MyBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<typeof mockBlogs[0] | null>(null);
  const router = useRouter();

  // Filter blogs based on search query
  const filteredBlogs = mockBlogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete confirmation
  const handleDelete = (id: string | undefined) => {
    // In a real app, you would delete the blog post here
    console.log(`Delete blog with id: ${id}`);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container-custom mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span>My Blog</span>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">My Blog Posts</h1>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => router.push('/blog/add')}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Write New Blog
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search your blog posts..."
          className="pl-10 border border-border bg-background"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border border-border overflow-hidden mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">{blog.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {blog.type === "recipe" ? (
                      <>
                        <ChefHat className="h-4 w-4 mr-2 text-primary" />
                        <span>Recipe</span>
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Review</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {blog.type === "recipe" ? (
                    <span className="text-sm text-muted-foreground">
                      {blog.difficulty} • {blog.timeToMake}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Rating: {blog.rating}/5
                    </span>
                  )}
                </TableCell>
                <TableCell>{format(blog.createdAt, "MMM dd, yyyy")}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      blog.published
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {blog.published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/blog/edit/${blog.id}`)}
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCurrentBlog(blog);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog post</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to delete "{currentBlog?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(currentBlog?.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )}

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4 text-muted-foreground">
            <PlusIcon className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try a different search term" : "Start by creating your first blog post"}
          </p>
          {!searchQuery && (
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/blog/add')}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Write New Blog
            </Button>
          )}
        </div>
      )}
    </div>
  );
}