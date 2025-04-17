"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { use } from 'react';

interface UserProfileProps {
  params: {
    id: string;
  };
}

// Mock user data - in a real app, this would come from an API
interface UserData {
  id: string;
  name: string;
  bio: string;
  email: string;
  avatar: string;
  specialties: string[];
  isCurrentUser: boolean; // To determine if the viewer is the profile owner
}

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }){
  const { id } = use(params);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    email: "",
    specialties: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    // Replace with actual API call
    setTimeout(() => {
      setUserData({
        id,
        name: "Jamie Oliver",
        bio: "Passionate food blogger specializing in healthy recipes and quick meals.",
        email: "jamie@foodblog.com",
        avatar: "/avatar-placeholder.png",
        specialties: ["Healthy Meals", "Quick Recipes", "Desserts"],
        isCurrentUser: true, // For demo purposes, set to true
      });
      setIsLoading(false);
    }, 500);
  }, [id]);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        bio: userData.bio,
        email: userData.email,
        specialties: userData.specialties.join(", "),
      });
    }
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, send update to API
    if (userData) {
      const updatedData = {
        ...userData,
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
        specialties: formData.specialties.split(",").map((item) => item.trim()),
      };

      setUserData(updatedData);
      setIsOpen(false);
      // Update user data in database would happen here
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading profile...
      </div>
    );
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="container-custom py-8 px-4 items-center">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <CardTitle className="text-2xl">{userData.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Food Blogger</p>
            <p className="text-sm text-muted-foreground">{userData.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">About</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {userData.bio}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium">Specialties</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {userData.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {userData.isCurrentUser && (
              <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button>Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit}>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile information.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="bio" className="text-right">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="col-span-3"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="specialties" className="text-right">
                            Specialties
                          </Label>
                          <Input
                            id="specialties"
                            name="specialties"
                            value={formData.specialties}
                            onChange={handleChange}
                            className="col-span-3"
                            placeholder="Separate with commas"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
