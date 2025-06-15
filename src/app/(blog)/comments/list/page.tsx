"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Trash as TrashIcon, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
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
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// List of inappropriate words to filter
const inappropriateWords = [
    "inappropriate", "offensive", "rude", "spam", "scam", 
    "hate", "violent", "obscene", "profanity"
];

type Comment = {
    id: string;
    author: {
        name: string;
        email: string;
    };
    authorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    flagCount: number;
    isFlagged: boolean;
    post: {
        title: string;
    };
    postId: string;
    status: string;
};

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [contentFilter, setContentFilter] = useState("all");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch comments from the API
        const fetchComments = async () => {
            try {
                const response = await fetch("/api/v1/comments");
                const data = await response.json();
                
                // Check if data is an array or if it's wrapped in a property
                const commentsArray = Array.isArray(data) ? data : data.comments || [];
                
                // Add error handling for empty data
                if (commentsArray.length === 0) {
                    setComments([]);
                    setIsLoading(false);
                    return;
                }
                
                const formattedComments: Comment[] = commentsArray.map((comment: any) => ({
                    id: comment.id,
                    author: {
                        name: comment.author?.name || "Deleted User",
                        email: comment.author?.email || "deleted@user.com",
                    },
                    authorId: comment.authorId,
                    content: comment.content || "",
                    createdAt: new Date(comment.createdAt || Date.now()),
                    updatedAt: new Date(comment.updatedAt || Date.now()),
                    flagCount: comment.flagCount || 0,
                    isFlagged: comment.isFlagged || false,
                    post: {
                        title: comment.post?.title || "Unknown Post",
                    },
                    postId: comment.postId,
                    status: comment.isFlagged ? "pending" : "approved",
                }));
                setComments(formattedComments);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
                toast.error("Failed to load comments");
                setIsLoading(false);
            }
        };

        fetchComments();
    }, []);

    // Filter comments based on search query, status, and content appropriateness
    const filteredComments = comments.filter((comment) => {
        const matchesSearch = 
            comment.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.author.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.post.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = 
            statusFilter === "all" || 
            comment.status === statusFilter;
        
        const matchesContent = 
            contentFilter === "all" || 
            (contentFilter === "inappropriate" && comment.isFlagged) ||
            (contentFilter === "appropriate" && !comment.isFlagged);
        
        return matchesSearch && matchesStatus && matchesContent;
    });

    const handleDeleteComment = () => {
        if (commentToDelete) {
            fetch(`/api/v1/comment/${commentToDelete}`, {
            method: "DELETE",
            })
            .then((response) => {
                if (response.ok) {
                    toast.success("Comment deleted successfully");
                setComments(comments.filter(comment => comment.id !== commentToDelete));
                } else {
                console.error("Failed to delete comment");
                }
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            })
            .finally(() => {
                setCommentToDelete(null);
                setIsDeleteDialogOpen(false);
            });
        }
    };

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "approved" ? "pending" : "approved";

        try {
            if (newStatus === "approved") {
                const response = await fetch(`/api/v1/comment/unflag/${id}`, {
                    method: "PUT",
                });

                if (!response.ok) {
                    throw new Error("Failed to unflag the comment");
                }
            } else {
                const response = await fetch(`/api/v1/comment/flag/${id}`, {
                    method: "PUT",
                });

                if (!response.ok) {
                    throw new Error("Failed to flag the comment");
                }
            }

            setComments(comments.map(comment => {
                if (comment.id === id) {
                    return {
                        ...comment,
                        status: newStatus,
                        isFlagged: newStatus === "pending" ? true : false,
                    };
                }
                return comment;
            }));

            if (newStatus === "approved") {
                toast.success("Comment approved and unflagged");
            } else {
                toast.success("Comment unapproved and flagged");
            }
        } catch (error) {
            console.error("Error updating comment status:", error);
            toast.error("Failed to update comment status");
        }
    };

    // Count flagged comments
    const flaggedCount = comments.filter(comment => comment.isFlagged).length;

    return (
        <div className="container-custom mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Comments Management</h1>

            {flaggedCount > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                        <p className="font-medium text-red-700">
                            {flaggedCount} {flaggedCount === 1 ? 'comment' : 'comments'} flagged for potentially inappropriate content
                        </p>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search bar */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Search comments..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Status filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Comments</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                </Select>

                {/* Content filter */}
                <Select value={contentFilter} onValueChange={setContentFilter}>
                    <SelectTrigger className="w-full md:w-[220px]">
                        <SelectValue placeholder="Filter by content" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Content</SelectItem>
                        <SelectItem value="inappropriate">Flagged Content</SelectItem>
                        <SelectItem value="appropriate">Appropriate Content</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Author</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>In Response To</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6">
                                    <div className="flex justify-center items-center">
                                       <Spinner size="small" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {filteredComments.map((comment) => {
                                    let rowClass = comment.status === "pending" ? "bg-yellow-50" : "";
                                    if (comment.isFlagged) {
                                        rowClass = "bg-red-50";
                                    }

                                    return (
                                        <TableRow key={comment.id} className={rowClass}>
                                            <TableCell>
                                                <div className="font-medium">{comment.author?.name || "Deleted User"}</div>
                                                <div className="text-xs text-gray-500">{comment.author?.email || "deleted@user.com"}</div>
                                            </TableCell>
                                            <TableCell className="max-w-xs">
                                                <div className="line-clamp-2">
                                                    {comment.isFlagged && (
                                                        <span className="inline-flex items-center mr-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                                            Flagged
                                                        </span>
                                                    )}
                                                    {comment.content || ""}
                                                </div>
                                            </TableCell>
                                            <TableCell>{comment.post?.title || "Unknown Post"}</TableCell>
                                            <TableCell>{format(comment.createdAt || new Date(), "MMM dd, yyyy")}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleStatusToggle(comment.id, comment.status)}
                                                        title={comment.status === "approved" ? "Unapprove" : "Approve"}
                                                    >
                                                        {comment.status === "approved" ? (
                                                            <XCircle className="h-4 w-4 text-red-500" />
                                                        ) : (
                                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setCommentToDelete(comment.id);
                                                            setIsDeleteDialogOpen(true);
                                                        }}
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {filteredComments.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                                            No comments found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete confirmation dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Comment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this comment? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteComment} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
