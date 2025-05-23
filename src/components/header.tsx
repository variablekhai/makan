"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Facebook,
  Instagram,
  Youtube,
  Search,
  ShoppingCart,
  LogIn,
  BookText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cookies } from "next/headers";
import CurrentUser from "./current-user";
import useCurrentUser from "@/app/hooks/useCurrentUser";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { user } = useCurrentUser();

  return (
    <header className="bg-background border-b border-border">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <Link
              href="https://facebook.com/wpzoom"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
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
            >
              
              <span className="sr-only"><Instagram size={18} />Instagram</span>
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
            >
              
              <span className="sr-only"><Youtube size={18} />Youtube</span>
            </Link>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            <span className="sr-only">Toggle dark mode</span>
            <span className="w-5 h-5 flex items-center justify-center">
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
          </Button>
        </div>

        <div className="flex justify-between items-center py-4">
          <Link
            href="/"
            className="text-3xl font-heading font-bold tracking-tight text-foreground"
          >
            MAKAN²
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium px-4 py-2 group hover:text-primary transition-colors">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium px-4 py-2 group hover:text-primary transition-colors">
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium hover:text-primary transition-colors">
                    All Recipes
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {categories.map((category) => (
                        <li key={category.title}>
                          <Link href={category.href} legacyBehavior passHref>
                            <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">
                                {category.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/categories" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium px-4 py-2 group hover:text-primary transition-colors">
                      Categories
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className="font-medium px-4 py-2 group hover:text-primary transition-colors">
                      Newsletter
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className="flex items-center font-medium px-4 py-2 group hover:text-primary transition-colors">
                      <BookText className="h-4 w-4 mr-2" />
                      Write a Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-3">
            <CurrentUser />
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between py-3">
          <Button variant="outline" className="text-sm">
            MENU
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

const categories = [
  {
    title: "Appetizers",
    description: "Delicious starter recipes perfect for any occasion",
    href: "/category/appetizers",
  },
  {
    title: "Main",
    description: "Hearty and satisfying main course dishes",
    href: "/category/main",
  },
  {
    title: "Soups",
    description: "Comforting soups for any season",
    href: "/category/soups",
  },
  {
    title: "Desserts",
    description: "Sweet treats and indulgent desserts",
    href: "/category/desserts",
  },
  {
    title: "Drinks",
    description: "Refreshing drinks recipes",
    href: "/category/cocktails",
  },
];
