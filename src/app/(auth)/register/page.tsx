import { AuthFooter } from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import { Button } from "@/components/ui/button";
import { Facebook, Mail } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
    return (
      <div>
        <AuthHeader />
        <div className="ontainer-custom max-w-md mx-auto py-12">
          <div className="mb-8 text-center">
  
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Join Makan²
            </h1>
            <p className="text-muted-foreground">
              Create an account to save recipes, share your culinary creations, and connect with fellow food enthusiasts.
            </p>
          </div>
  
          <div className="bg-muted/20 p-8 rounded-md mb-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                    className="w-full p-3 border border-border rounded-md bg-background"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="w-full p-3 border border-border rounded-md bg-background"
                  />
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
                  required
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>
  
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Password must be at least 8 characters long with 1 uppercase letter and 1 number
                </p>
              </div>
  
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full p-3 border border-border rounded-md bg-background"
                />
              </div>
  
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" required />
                  <span className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>
  
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Send me cooking tips and recipe updates (optional)</span>
                </label>
              </div>
  
              <Button className="w-full bg-primary hover:bg-primary/90">
                Create Account
              </Button>
            </form>
          </div>
  
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="border-t border-border flex-grow"></div>
              <span className="px-4 text-sm text-muted-foreground">Or register with</span>
              <div className="border-t border-border flex-grow"></div>
            </div>
  
            <div className="flex gap-4 justify-center mb-8">
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                <Facebook size={16} />
                <span>Facebook</span>
              </Button>
              <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
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