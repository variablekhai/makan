import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About – Makan²",
  description: "Makan² is more than a blog, it's a family."
}

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Makan² is more than a blog, it's a family.
            </h1>
            <p className="text-muted-foreground mb-4">
              At Makan², we're united by our love for food and the stories it tells. We don't just share recipes—we create connections, preserve traditions, and welcome everyone to our virtual dining table. Through our shared culinary journeys, we've built a community where food enthusiasts become friends and friends become family.
            </p>
          </div>

          <div>
            <Image
              src="https://1.bp.blogspot.com/-IZbVLTt8lyQ/XWioXPwiYxI/AAAAAAAAXRo/mxF15IRM27IHISs2QTqUUdKE9eyjfJZNQCLcBGAs/s1600/GrabFood-2.jpg"
              alt="About Makan²"
              width={570}
              height={715}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="section-title mb-6">Our story</h2>

          <div className="space-y-4 max-w-3xl">
          <p className="text-muted-foreground mb-4">
              Founded in 2025, Makan² began as a humble collection of family recipes shared between friends. Our name comes from the Malaysian expression "makan-makan" - an invitation to gather and eat together. We're passionate about showcasing the rich culinary heritage of Malaysia, from street food favorites to home-cooked treasures passed down through generations.
            </p>
            <p className="text-muted-foreground mb-4">
              Our team of food enthusiasts travels across Malaysia, documenting authentic cooking techniques and stories behind each dish. We believe food is more than sustenance - it's culture, history, and connection. Through Makan², we invite you to explore Malaysian cuisine's vibrant flavors and traditions.
            </p>
          </div>
        </div>

        <div className="bg-muted/30 p-8 rounded-md mb-16">
          <blockquote className="text-center max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-heading italic mb-4">
              "Instead of going out to dinner, buy good food. Cooking at home shows such affection. In a bad economy, it's more important to make yourself feel good."
            </p>
            <cite className="font-semibold">Ina Garten</cite>
          </blockquote>
        </div>

        <div className="mb-16">
          <h2 className="section-title mb-10">Our authors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {authors.map((author) => (
                <div key={author.name} className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <Image
                  src={author.image}
                  alt={author.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                  />
                </div>

                <h3 className="font-heading font-bold text-xl mb-3">{author.name}</h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {author.notes}
                </p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const authors = [
  {
    name: "Khairul Azfar",
    image: "/images/khairul.jpeg",
    link: "", // Correct path to access public/images
    notes: "Food enthusiast who specializes in traditional Malaysian cuisine with a modern twist. Believes every meal tells a story of heritage and culture."
  },
  {
    name: "Nur Athirah",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-6.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
    notes: "Pastry chef exploring the fusion of Western desserts with Asian flavors. Passionate about making baking accessible to home cooks."
  },
  {
    name: "Nur Izzah",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-9.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
    notes: "Street food connoisseur documenting hidden culinary gems across Malaysia. Advocates for preserving traditional cooking techniques."
  },
  {
    name: "Turki",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-8.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
    notes: "International chef bringing global influences to Malaysian cuisine. Specializes in seafood dishes and sustainable cooking practices."
  }
]
