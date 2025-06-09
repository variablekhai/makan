"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const UnsubscribeNewsletterPage = () => {
    const [isUnsubscribed, setIsUnsubscribed] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    const unsubscribe = async () => {
        if (!id || !email) {
            toast.error("Invalid newsletter ID or email.");
            return;
        }

        try {
            const response = await fetch(`/api/v1/newsletter/unsubscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to unsubscribe.");
                return;
            }

            toast.success("You have unsubscribed successfully!");
            setIsUnsubscribed(true);
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Unsubscribe from Newsletter</h1>
            {isUnsubscribed ? (
                <p className="text-green-500">You have unsubscribed successfully! You may close the page</p>
            ) : (
                <Button
                    onClick={unsubscribe}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Unsubscribe
                </Button>
            )}
        </div>
    );
};

export default UnsubscribeNewsletterPage;
