"use client";
import React, { useState } from "react";
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

// List of inappropriate words to filter
const inappropriateWords = [
    "inappropriate", "offensive", "rude", "spam", "scam", 
    "hate", "violent", "obscene", "profanity"
];

// Mock data for comments
const initialComments = [
    {
        id: "1",
        author: "John Doe",
        email: "john@example.com",
        content: "This is a great recipe but I dont really like it :(",
        post: "Spicy Garlic Butter Shrimp",
        status: "approved",
        createdAt: new Date(2023, 5, 15),
    },
    {
        id: "2",
        author: "Jane Smith",
        email: "jane@example.com",
        content: "I have a question about this recipe. Can I substitute butter with olive oil?",
        post: "Summer Salad Recipes",
        status: "pending",
        createdAt: new Date(2023, 6, 2),
    },
    {
        id: "3",
        author: "Mike Johnson",
        email: "mike@example.com",
        content: "I found a typo in paragraph three. This content seems inappropriate.",
        post: "Chocolate Chip Cookies",
        status: "approved",
        createdAt: new Date(2023, 6, 10),
    },
    {
        id: "4",
        author: "Sarah Williams",
        email: "sarah@example.com",
        content: "This didn't work for me. I followed all the steps but got an error.",
        post: "Vegan Pasta Primavera",
        status: "pending",
        createdAt: new Date(2023, 6, 18),
    },
];

export default function CommentsPage() {
    const [comments, setComments] = useState(initialComments);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [contentFilter, setContentFilter] = useState("all");
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

    // Check if a comment contains inappropriate words
    const containsInappropriateWords = (content: string) => {
        const lowerContent = content.toLowerCase();
        return inappropriateWords.some(word => lowerContent.includes(word.toLowerCase()));
    };

    // Filter comments based on search query, status, and content appropriateness
    const filteredComments = comments.filter((comment) => {
        const matchesSearch = 
            comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.post.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = 
            statusFilter === "all" || 
            comment.status === statusFilter;
        
        const isInappropriate = containsInappropriateWords(comment.content);
        const matchesContent = 
            contentFilter === "all" || 
            (contentFilter === "inappropriate" && isInappropriate) ||
            (contentFilter === "appropriate" && !isInappropriate);
        
        return matchesSearch && matchesStatus && matchesContent;
    });

    const handleDeleteComment = () => {
        if (commentToDelete) {
            setComments(comments.filter(comment => comment.id !== commentToDelete));
            setCommentToDelete(null);
            setIsDeleteDialogOpen(false);
        }
    };

    const handleStatusToggle = (id: string, currentStatus: string) => {
        setComments(comments.map(comment => {
            if (comment.id === id) {
                return {
                    ...comment,
                    status: currentStatus === "approved" ? "pending" : "approved"
                };
            }
            return comment;
        }));
    };

    // Count inappropriate comments
    const inappropriateCount = comments.filter(comment => 
        containsInappropriateWords(comment.content)
    ).length;

    return (
        <div className="container-custom mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Comments Management</h1>

            {inappropriateCount > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                    <div>
                        <p className="font-medium text-red-700">
                            {inappropriateCount} {inappropriateCount === 1 ? 'comment' : 'comments'} flagged for potentially inappropriate content
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
                        {filteredComments.map((comment) => {
                            const isInappropriate = containsInappropriateWords(comment.content);
                            let rowClass = comment.status === "pending" ? "bg-yellow-50" : "";
                            if (isInappropriate) {
                                rowClass = "bg-red-50";
                            }
                            
                            return (
                                <TableRow key={comment.id} className={rowClass}>
                                    <TableCell>
                                        <div className="font-medium">{comment.author}</div>
                                        <div className="text-xs text-gray-500">{comment.email}</div>
                                    </TableCell>
                                    <TableCell className="max-w-xs">
                                        <div className="line-clamp-2">
                                            {isInappropriate && (
                                                <span className="inline-flex items-center mr-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                    Flagged
                                                </span>
                                            )}
                                            {comment.content}
                                        </div>
                                    </TableCell>
                                    <TableCell>{comment.post}</TableCell>
                                    <TableCell>{format(comment.createdAt, "MMM dd, yyyy")}</TableCell>
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