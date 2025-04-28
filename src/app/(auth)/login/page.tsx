"use client";
import { AuthFooter } from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    const body = {
      ...data,
    };

    const res = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    setIsLoading(false);
    if (!res.ok) {
      toast.error(result.error || "An error occurred");
    }
    if (res.ok) {
      window.location.href = "/";
    }
  };

  return (
    <div className="">
      <AuthHeader />
      <div className="container-custom max-w-md mx-auto py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your favorite recipes, save new ones, and join our
            cooking community.
          </p>
        </div>

        <div className="bg-muted/20 p-8 rounded-md mb-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-2"
                />
                <span className="text-sm">Remember me</span>
              </label>
            </div>

            <Button
              type="submit"
              className={`w-full ${
                isLoading ? "bg-primary/70" : "bg-primary hover:bg-primary/90"
              }`}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center">
                {isLoading ? <Spinner size="medium" /> : "Login"}
              </span>
            </Button>
          </form>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="border-t border-border flex-grow"></div>
            <span className="px-4 text-sm text-muted-foreground">
              Or continue with
            </span>
            <div className="border-t border-border flex-grow"></div>
          </div>

          <div className="flex gap-4 justify-center mb-8">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Facebook size={16} />
              <span>Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              <span>Google</span>
            </Button>
          </div>

          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
