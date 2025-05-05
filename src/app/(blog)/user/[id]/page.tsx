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
import { use } from "react";
import useSWR, { mutate } from "swr";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserData {
  id: string;
  name: string;
  bio: string;
  email: string;
  avatar: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "author" | "";
  bio?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
};

type Input = {
  name: string;
  email: string;
  bio: string;
};

export default function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useCurrentUser();

  const getUser = async (url: string) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    return res.json();
  };

  const { data, error, isLoading } = useSWR<User>(
    `/api/v1/user?id=${id}`,
    getUser
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Input>();

  const [isUpdating, setIsUpdating] = useState(false);

  const updateUser = async (data: Input) => {
    const res = await fetch(`/api/v1/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        id,
        ...data,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    const updatedUser = await res.json();
    return updatedUser;
  };

  const onSubmit = async (data: Input) => {
    setIsUpdating(true);
    updateUser(data)
      .then((res) => {
        mutate("/api/v1/user?id=" + id);
        setIsOpen(false);
        toast.success("User updated successfully");
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.error("Error updating user");
        setIsUpdating(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  if (!data || error) {
    return <div>User not found</div>;
  }

  return (
    <div className="container-custom py-8 px-4 items-center">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={data?.avatar} alt={data?.name} />
            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center sm:text-left">
            <CardTitle className="text-2xl">{data.name}</CardTitle>
            <p className="text-sm text-muted-foreground">Food Blogger</p>
            <p className="text-sm text-muted-foreground">{data.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">About</h3>
              <p className="mt-2 text-sm text-muted-foreground">{data.bio}</p>
            </div>

            {user?.id === id && (
              <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            defaultValue={data.name}
                            className="col-span-3"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={data.email}
                            disabled
                            className="col-span-3"
                            {...register("email")}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="bio" className="text-right">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            defaultValue={data?.bio}
                            className="col-span-3"
                            rows={3}
                            placeholder="Tell us about yourself..."
                            {...register("bio")}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          className={`${
                            isUpdating
                              ? "bg-primary/70"
                              : "bg-primary hover:bg-primary/90"
                          }`}
                          disabled={isUpdating}
                          type="submit"
                        >
                          {isUpdating ? (
                            <Spinner size="small" />
                          ) : (
                            <span>Save changes</span>
                          )}
                        </Button>
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
}
