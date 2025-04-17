"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function AuthFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border">
      <div className="pt-4 container-custom mb-8">
      <div>
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-heading font-bold tracking-tight">
                MAKAN²
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4 md:mb-0">
              <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground text-sm">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground text-sm">
                Privacy Policy
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="https://facebook.com/wpzoom" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com/wpzoom" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-muted-foreground hover:text-foreground">
                <Youtube size={18} />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}
