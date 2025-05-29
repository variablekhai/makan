import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Newsletter Confirmation – Makan²",
  description: "Thank you for subscribing to our newsletter."
}

export default function EmailConfirmationPage() {
  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl mx-auto">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          {/* Email Header with Background Image */}
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{
              backgroundImage: `url('https://demo.wpzoom.com/cookbook/files/2022/04/brooke-lark-F_5g8EEHYE-unsplash-1-1.png')`,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">Makan²</h1>
            </div>
          </div>
          
          {/* Email Content */}
          <div className="p-8 bg-white space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Subscription Confirmed!</h2>
              <p className="text-muted-foreground">Thank you for subscribing to our newsletter.</p>
            </div>
            
            <div className="space-y-4">
              <p>Hello there, Khairul Azfar!</p>
              
              <p>We're excited to welcome you to the Makan² newsletter community! You're now all set to receive our latest recipes, cooking tips, and special offers directly in your inbox.</p>
              
              <p>Here's what you can expect from us:</p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Weekly recipe inspiration</li>
                <li>Seasonal cooking guides</li>
                <li>Early access to our special events</li>
              </ul>
              
              <p>If you have any questions or suggestions, feel free to reply to this email or contact our support team.</p>
              
              <p>Happy cooking!</p>
              
              <p className="font-medium">The Makan² Team</p>
            </div>
            
            <div className="pt-6">
              <Button className="w-full bg-primary hover:bg-primary/90">
                <Link href="/" className="w-full inline-block">
                  Visit Our Website
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Email Footer */}
          <div className="p-6 bg-gray-50 text-center text-sm text-muted-foreground space-y-3 border-t">
            <p>You received this email because you signed up for the Makan² newsletter.</p>
            <p>
              <a href="#" className="text-primary hover:underline">
                Unsubscribe
              </a> • 
              <a href="#" className="text-primary hover:underline ml-2">
                Update Preferences
              </a> • 
              <a href="#" className="text-primary hover:underline ml-2">
                Privacy Policy
              </a>
            </p>
            <p>© {new Date().getFullYear()} Makan². All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}