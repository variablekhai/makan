"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Facebook, Instagram, Youtube, Search, ShoppingCart, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export default function AuthHeader() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="bg-background border-b border-border">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <Link
              href="https://facebook.com/wpzoom"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
              legacyBehavior>
              <span className="sr-only"><Facebook size={18} />Facebook</span>
            </Link>
            <Link
              href="https://instagram.com/wpzoom"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
              legacyBehavior>
              <Instagram size={18} />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground"
              legacyBehavior>
              <Youtube size={18} />
              <span className="sr-only">Youtube</span>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
          </Button>
        </div>

        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-3xl font-heading font-bold tracking-tight text-foreground">
            MAKAN²
          </Link>

          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden md:flex">
              <Link href="/register">
              Register
              </Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/login" legacyBehavior>
              <span><LogIn className="h-4 w-4" />Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
