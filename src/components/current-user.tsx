import React from "react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import useCurrentUser from "@/app/hooks/useCurrentUser";

export default function CurrentUser() {
    const {user, loading} = useCurrentUser();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/v1/logout", { method: "POST" });
            if (response.ok) {
                window.location.href = "/login";
            } else {
                console.error("Failed to log out");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return <div className="flex justify-center">
            <Spinner size="small"/>
        </div>;
    }

    if (!user) {
        return (
            <Button className="bg-primary hover:bg-primary/90 flex items-center">
                <LogIn className="h-4 w-4" />
                <Link href="/login">Login</Link>
            </Button>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            <Link href={`/user/${user.id}`} className="flex items-center space-x-2">
            <img
                src={`https://ui-avatars.com/api/?name=${user.name}`}
                alt={`${user.name}'s avatar`}
                className="h-8 w-8 rounded-full"
            />
            <p><span className="text-slate-600">Hi, </span>{user.name}!</p>
            </Link>
            <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center"
            >
            <LogOut className="h-4 w-4" />
            </Button>
        </div>
    );
}
