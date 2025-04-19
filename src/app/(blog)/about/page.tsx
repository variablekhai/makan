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
              This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
            </p>
          </div>

          <div>
            <Image
              src="https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/image-64.png"
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
            <p className="text-muted-foreground">
              This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
            </p>
            <p className="text-muted-foreground">
              If you want to read, I might suggest a good book, perhaps Hemingway or Melville. That's why they call it, the dummy copy. This, of course, is not the real copy for this entry. Rest assured, the words will expand the concept. With clarity. Conviction. And a little wit.
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
                <Image
                  src={author.image}
                  alt={author.name}
                  width={300}
                  height={300}
                  className="rounded-full mb-4 mx-auto"
                />

                <h3 className="font-heading font-bold text-xl mb-3">{author.name}</h3>

                <p className="text-muted-foreground text-sm mb-4">
                  This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
                </p>

                <Button variant="outline" size="sm" asChild>
                  <Link href={author.link}>
                    View all recipes
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div
          className="py-12 px-4 md:px-8 rounded-md relative bg-cover bg-center"
          style={{
            backgroundImage: `url('https://demo.wpzoom.com/Makan²/files/2022/04/brooke-lark-F_5g8EEHYE-unsplash-1-1.png')`,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-white font-bold text-2xl mb-4">NEVER MISS A RECIPE</h3>
            <p className="text-white text-lg mb-4">Sign up with your email address to receive new recipes each week.</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Type your email"
                className="rounded-l-md flex-1 px-4 py-2 border-0"
              />
              <Button className="rounded-l-none bg-primary hover:bg-primary/90">Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const authors = [
  {
    name: "Darrin Stott",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-7.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
  },
  {
    name: "Lucille Perkins",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-6.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
  },
  {
    name: "Dianne Dixon",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-9.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
  },
  {
    name: "Hanna Hageman",
    image: "https://i0.wp.com/demo.wpzoom.com/Makan²/files/2022/04/Ellipse-8.png",
    link: "https://demo.wpzoom.com/Makan²/author/erikbrown/",
  }
]
