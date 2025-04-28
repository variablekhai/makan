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

type Input = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  newsletter?: boolean;
};

export default function RegisterPage() {

  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Input>();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
  
    const { firstName, lastName, ...rest } = data;
    const body = {
      ...rest,
      name: `${firstName} ${lastName}`,
    };

    const res = await fetch("/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    setIsLoading(false);
    if (res.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.error || "An error occurred");
    };
  }

  return (
    <div>
      <AuthHeader />
      <div className="ontainer-custom max-w-md mx-auto py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Join Makan²
          </h1>
          <p className="text-muted-foreground">
            Create an account to save recipes, share your culinary creations,
            and connect with fellow food enthusiasts.
          </p>
        </div>

        <div className="bg-muted/20 p-8 rounded-md mb-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain 1 uppercase letter and 1 number",
                  },
                })}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="w-full p-3 border border-border rounded-md bg-background"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must agree to the terms",
                  })}
                  className="mr-2"
                />
                <span className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("newsletter")}
                  className="mr-2"
                />
                <span className="text-sm">
                  Send me cooking tips and recipe updates (optional)
                </span>
              </label>
            </div>

            <Button
              type="submit"
              className={`w-full ${isLoading ? "bg-primary/70" : "bg-primary hover:bg-primary/90"}`}
              disabled={isLoading}
            >
              <span className="flex items-center justify-center">
                {isLoading ? <Spinner size="medium" /> : "Create Account"}
              </span>
            </Button>
          </form>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="border-t border-border flex-grow"></div>
            <span className="px-4 text-sm text-muted-foreground">
              Or register with
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
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
