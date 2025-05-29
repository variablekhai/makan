import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const metadata = {
  title: "Contact – Makan²",
  description: "Get in touch with the Makan² team."
}

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
            <Input id="firstName" placeholder="John" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
            <Input id="lastName" placeholder="Doe" />
          </div>
          </div>
          <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>
          <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">Message</label>
          <Textarea id="message" placeholder="How can we help you?" rows={5} />
          </div>
          <Button type="submit" className="w-full md:w-auto">Send Message</Button>
        </form>
        </div>
        
        <div 
        className="rounded-lg overflow-hidden relative bg-cover bg-center h-[400px] md:h-auto flex items-center"
        style={{
          backgroundImage: `url('https://demo.wpzoom.com/cookbook/files/2022/04/brooke-lark-F_5g8EEHYE-unsplash-1-1.png')`,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "overlay",
        }}
        >
        <div className="p-6 text-white space-y-4 relative z-10">
          <h3 className="text-2xl font-bold">Join Our Newsletter</h3>
          <p className="text-white/90">Subscribe to receive delicious recipes, cooking tips, and special offers.</p>
          <div className="space-y-3">
          <Input 
            placeholder="Your email address" 
            className="bg-white/90 text-black placeholder:text-gray-500" 
          />
          <Button className="w-full bg-primary hover:bg-primary/90">
            Subscribe Now
          </Button>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}
