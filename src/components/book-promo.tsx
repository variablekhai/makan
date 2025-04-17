"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function BookPromo() {
  return (
    <section className="py-10">
      <div className="container-custom">
        <div className="bg-muted/30 rounded-md p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="mx-auto">
            <Image
              src="https://i0.wp.com/demo.wpzoom.com/cookbook/files/2022/04/book-1.png"
              alt="Book of the Month"
              width={346}
              height={456}
              className="mx-auto drop-shadow-md"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">Book of the Month</h2>
            <p className="text-muted-foreground">
              This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.
            </p>
            <Button className="bg-primary hover:bg-primary/90">Buy now for $59</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
