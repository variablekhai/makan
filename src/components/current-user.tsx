import React from "react";
import Link from "next/link";
import { LogIn, LogOut, User, MessageSquare, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "./ui/spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { Separator } from "./ui/separator";

export default function CurrentUser() {
  const { user, loading } = useCurrentUser();

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
    return (
      <div className="flex justify-center">
        <Spinner size="small" />
      </div>
    );
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
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2 bg-transparent border-none p-0">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={`${user.name}'s avatar`}
              className="h-8 w-8 rounded-full"
            />
            <p>
              <span className="text-slate-600">Hi, </span>
              {user.name}!
            </p>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="flex flex-col space-y-4">
            {/* My Profile Section */}
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                My Account
              </h4>
              <Link
                href={`/user/${user.id}`}
                className="flex items-center space-x-2 hover:text-primary"
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
            </div>

            {user.role === "admin" && <Separator />}

            {/* Admin Tools Section */}
            {user.role === "admin" && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Admin Tools
                </h4>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/user/list"
                    className="flex items-center space-x-2 hover:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    <span>User Management</span>
                  </Link>
                  <Link
                    href="/newsletter/list"
                    className="flex items-center space-x-2 hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Newsletter Management</span>
                  </Link>
                  <Link
                    href="/comments/list"
                    className="flex items-center space-x-2 hover:text-primary"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Comments Management</span>
                  </Link>
                </div>
              </div>
            )}

            <Separator />

            {/* Logout Section */}
            <div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center justify-center w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
