"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/v1/newsletter/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          preferences: ["promotions", "updates"], // Default preferences
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe.");
      }

      toast.success("Successfully subscribed to the newsletter, Confirmation email sent!");
      setEmail(""); // Clear the input field
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-background pt-16 border-t border-border">
      <div className="container-custom mb-8">
        <div
          className="py-12 px-4 md:px-8 mb-12 bg-cover bg-center rounded-md relative"
          style={{
            backgroundImage: `url('https://demo.wpzoom.com/cookbook/files/2022/04/brooke-lark-F_5g8EEHYE-unsplash-1-1.png')`,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-white font-bold text-2xl mb-4">
              NEVER MISS A RECIPE
            </h3>
            <p className="text-white text-lg mb-6">
              Sign up with your email address to receive new recipes each week.
            </p>
            <form
              className="flex space-x-2 max-w-md mx-auto"
              onSubmit={handleSubscribe}
            >
              <Input
                type="email"
                placeholder="Type your email"
                className="bg-white/90 border-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              ABOUT MAKAN²
            </h4>
            <p className="text-muted-foreground mb-4">
              Welcome to Makan² food blog!
            </p>
            <p className="text-muted-foreground mb-4">
              Discover the rich flavors and unique recipes from our culinary
              journey. We share authentic dishes, cooking tips, and food reviews
              that bring people together around the table.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              NAVIGATE
            </h4>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              SUBSCRIBE TO OUR NEWSLETTER
            </h4>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter and receive new recipes in your inbox.
            </p>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email *"
                  className="w-full bg-background"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe!"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link
                href="/"
                className="text-xl font-heading font-bold tracking-tight"
              >
                MAKAN²
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4 md:mb-0">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="https://facebook.com/wpzoom"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                legacyBehavior
              >
                <span className="sr-only">
                  <Facebook size={18} />
                  Facebook
                </span>
              </Link>
              <Link
                href="https://instagram.com/wpzoom"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                legacyBehavior
              >
                <span className="sr-only">
                  <Instagram size={18} />
                  Instagram
                </span>
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                className="text-muted-foreground hover:text-foreground"
                legacyBehavior
              >
                <span className="sr-only">
                  <Youtube size={18} />
                  Youtube
                </span>
              </Link>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>Copyright © {currentYear} Makan²</p>
            <p>Designed by BCS3263_1BG2</p>
          </div>
        </div>
      </div>
    </footer>
  );
}