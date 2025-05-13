"use client";
import Link from "next/link";
import { format, set } from "date-fns";
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
import {
  PlusIcon,
  SearchIcon,
  PencilIcon,
  TrashIcon,
  ChefHat,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { capitalize } from "@/utils/misc";

export default function MyBlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user } = useCurrentUser();

  const fetchPosts = async () => {
    const response = await fetch(`/api/v1/recipes/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Fetched posts:", data);
    if (!response.ok) {
      console.error("Error fetching posts:", data);
      return [];
    }

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (user) {
        const posts = await fetchPosts();
        setPosts(posts);
      }
      setIsLoading(false);
    };


    fetchData();
  }, [user]);

  //Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete confirmation
  const handleDelete = (id: string | undefined) => {
    if (!id) return;
    fetch(`/api/v1/recipe/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
          toast.success("Blog post deleted successfully");
        } else {
          toast.error("Failed to delete blog post");
        }
      })
      .catch((error) => {
        console.error("Error deleting blog post:", error);
        toast.error("An error occurred while deleting the blog post");
      });
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="container-custom mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>My Blog</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold">My Blog Posts</h1>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => router.push("/blog/add")}
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
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {post.type === "recipe" ? (
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
                  {post.type === "recipe" ? (
                    <span className="text-sm text-muted-foreground">
                      {capitalize(post.difficulty)} • {post.timeToMake.value}{" "}
                      {post.timeToMake.unit}
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Rating: {post.rating}/5
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {format(post.createdAt, "MMM dd, yyyy, hh:mm a")}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      !post.isDraft
                        ? "bg-green-100 text-green-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {!post.isDraft ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/blog/edit/${post.id}`)}
                  >
                    <PencilIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCurrentPost(post);
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
                Are you sure you want to delete "{currentPost?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(currentPost?.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      )}

      {isLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && filteredPosts.length === 0 && 
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
      }
    </div>
  );
}
