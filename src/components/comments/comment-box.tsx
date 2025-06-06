"use client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { toast } from "sonner";
import Link from "next/link";
import { Trash2Icon, TrashIcon } from "lucide-react";
import useSWR, { mutate } from "swr";

interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  isFlagged: boolean;
  flagCount: number;
  author: {
    name: string;
  };
}

interface CommentBoxProps {
  comments: Comment[];
}

interface FormData {
  content: string;
}

export default function CommentBox({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const { user } = useCurrentUser();

  const fetcher = async (url: string) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  };

  const { data: commentsData, error, isLoading } = useSWR<Comment[]>(
    `/api/v1/comments/post/${postId}`,
    fetcher
  );

  useEffect(() => {
    if (commentsData) {
      setComments(commentsData);
    }
  }, [commentsData]);

  if (error) {
    console.error("Error fetching comments:", error);
    toast.error("Failed to load comments. Please try again later.");
  }

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoadingSubmit(true);
      const response = await fetch("/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ ...data, postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment: Comment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setIsLoadingSubmit(false);
      reset();
    } catch (error) {
      setIsLoadingSubmit(false);
      console.error("Error posting comment:", error);
    }
  };

  const handleFlagComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/v1/comment/flag/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to flag comment");
      }
      toast.success("Comment flagged! Thank you for your feedback.");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      mutate(`/api/v1/comments/post/${postId}`); // Revalidate comments
    } catch (error) {
      toast.error("Error flagging comment. Please try again.");
      console.error("Error flagging comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const response = await fetch(`/api/v1/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        toast.error("Failed to delete comment");
        throw new Error("Failed to delete comment");
      }
      toast.success("Comment deleted successfully.");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      toast.error("Error deleting comment. Please try again.");
      console.error("Error deleting comment:", error);
    }
  }


  return (
    <div className="mb-12">
      <h2 className="section-title mb-8">Comments</h2>
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner size="large" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground">
            There is no comment yet, be the first to comment.
          </p>
        ) : (
          comments
            .filter((comment) => !comment.isFlagged)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
          <div>
            <img
              src={`https://ui-avatars.com/api/?name=${comment.author.name}`}
              alt={comment.author.name}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">
            {comment.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
            {comment.createdAt
              ? format(
                  new Date(comment.createdAt),
                  "MMM dd, yyyy, hh:mm a"
                )
              : "N/A"}
                </p>
              </div>
              {comment.authorId === user?.id ? (
                <button
            className="text-muted-foreground hover:text-red-500"
            aria-label="Delete comment"
            onClick={() => handleDeleteComment(comment.id)}
                >
            <Trash2Icon className="w-4 h-4" />
                </button>
              ) : (
                <button
            className="text-muted-foreground hover:text-primary"
            aria-label="Flag comment"
            onClick={() => handleFlagComment(comment.id)}
                >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-flag"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
                </button>
              )}
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
              </div>
            ))
        )}
      </div>

      {user ? (
        <div className="bg-muted/20 p-8 rounded-md mb-6 mt-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Leave a Comment
          </h2>
          <p className="text-muted-foreground mb-6">
            Your name will be displayed publicly.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label htmlFor="comment" className="sr-only">
                  Message
                </label>
                <textarea
                  id="comment"
                  rows={6}
                  placeholder="Message"
                  className="w-full p-3 border border-border rounded-md bg-background"
                  {...register("content", { required: true })}
                ></textarea>
              </div>
            </div>

            <Button
              className={`w-auto ${
                isLoadingSubmit ? "bg-primary/70" : "bg-primary hover:bg-primary/90"
              }`}
              disabled={isLoadingSubmit}
              type="submit"
            >
              {isLoadingSubmit ? <Spinner size="small" /> : "Post Comment"}
            </Button>
          </form>
        </div>
      ) : (
        <div className="bg-muted/20 p-8 rounded-md mb-6 mt-8">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Leave a Comment
          </h2>
          <p className="text-muted-foreground mb-6">
            You must be logged in to leave a comment. Please{" "}
            <Link href="/login" className="text-primary hover:underline">
              log in
            </Link>{" "}
          </p>
        </div>
      )}
    </div>
  );
}
