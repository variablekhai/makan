export interface Recipe {
  id: string
  title: string
  slug: string
  image: string
  description: string
  time: string
  difficulty: string
  category: {
    name: string
    slug: string
  }
  author: {
    name: string
    image: string
    slug: string
  }
  date: string
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Rosemary & Honey Whiskey Cocktail",
    slug: "2022/04/13/rosemary-honey-whiskey-cocktail",
    image: "https://ext.same-assets.com/543785121/746458956.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "15 min",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Pavel Ciorici",
      image: "https://ext.same-assets.com/1113238889/2441124720.png",
      slug: "pavel-ciorici"
    },
    date: "April 13, 2022"
  },
  {
    id: "2",
    title: "Grilled Chicken Mushroom Toast",
    slug: "2022/04/10/bruschetta-with-beef-tartare",
    image: "https://ext.same-assets.com/543785121/1490506319.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "20 min",
    difficulty: "Easy",
    category: {
      name: "Appetizers",
      slug: "appetizers"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "April 10, 2022"
  },
  {
    id: "3",
    title: "Mediterranean Chickpea Salad",
    slug: "2022/03/22/mediterranean-chickpea-salad",
    image: "https://ext.same-assets.com/543785121/3068330999.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "30 min",
    difficulty: "Easy",
    category: {
      name: "Salads",
      slug: "salads"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "March 22, 2022"
  },
  {
    id: "4",
    title: "Moscow Mule Cocktail",
    slug: "2022/03/13/moscow-mule-cocktail",
    image: "https://ext.same-assets.com/543785121/3923550811.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "10 minutes",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "March 13, 2022"
  },
  {
    id: "5",
    title: "Blood Orange Mimosa",
    slug: "2022/02/10/blood-orange-mimosa",
    image: "https://ext.same-assets.com/543785121/103569570.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "15 minutes",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "February 10, 2022"
  },
  {
    id: "6",
    title: "Creamy Chicken Pasta",
    slug: "2022/02/04/spaghetti-with-garlic-and-oil",
    image: "https://ext.same-assets.com/543785121/4057235953.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "20 min",
    difficulty: "Easy",
    category: {
      name: "Pasta",
      slug: "pasta"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "February 4, 2022"
  },
  {
    id: "7",
    title: "Mint & Raspberry Julep",
    slug: "2022/01/13/mint-raspberry-julep",
    image: "https://ext.same-assets.com/543785121/224804076.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "10 min",
    difficulty: "Easy",
    category: {
      name: "Cocktails",
      slug: "cocktails"
    },
    author: {
      name: "Pavel Ciorici",
      image: "https://ext.same-assets.com/1113238889/2441124720.png",
      slug: "pavel-ciorici"
    },
    date: "January 13, 2022"
  },
  {
    id: "8",
    title: "Pistachio Pavlova Meringue Cakes",
    slug: "2021/11/23/pistachio-pavlova-meringue-cakes",
    image: "https://ext.same-assets.com/543785121/3477451376.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "35 minutes",
    difficulty: "Medium",
    category: {
      name: "Desserts",
      slug: "desserts"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "November 23, 2021"
  },
  {
    id: "9",
    title: "Caprese Salad",
    slug: "2021/11/10/caprese-salad",
    image: "https://ext.same-assets.com/543785121/4199542085.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "10 minutes",
    difficulty: "Easy",
    category: {
      name: "Salads",
      slug: "salads"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "November 10, 2021"
  },
  {
    id: "10",
    title: "Roasted Carrot Soup",
    slug: "2019/04/03/roasted-carrot-soup",
    image: "https://ext.same-assets.com/543785121/3894744592.jpeg",
    description: "This is some dummy copy. You're not really supposed to read this dummy copy, it is just a place holder for people who need some type to visualize what the actual copy might look like if it were real content.",
    time: "40 minutes",
    difficulty: "Medium",
    category: {
      name: "Soups",
      slug: "soups"
    },
    author: {
      name: "Erik Brown",
      image: "https://ext.same-assets.com/1113238889/141462346.png",
      slug: "erik-brown"
    },
    date: "April 3, 2019"
  }
]

export const categories = [
  {
    name: "Main",
    slug: "main",
    image: "https://ext.same-assets.com/543785121/3068330999.jpeg",
    count: 3
  },
  {
    name: "Appetizers",
    slug: "appetizers",
    image: "https://ext.same-assets.com/543785121/1490506319.jpeg",
    count: 2
  },
  {
    name: "Pasta",
    slug: "pasta",
    image: "https://ext.same-assets.com/543785121/4057235953.jpeg",
    count: 3
  },
  {
    name: "Soups",
    slug: "soups",
    image: "https://ext.same-assets.com/543785121/3894744592.jpeg",
    count: 3
  },
  {
    name: "Salads",
    slug: "salads",
    image: "https://ext.same-assets.com/543785121/4199542085.jpeg",
    count: 3
  },
  {
    name: "Desserts",
    slug: "desserts",
    image: "https://ext.same-assets.com/543785121/3477451376.jpeg",
    count: 6
  },
  {
    name: "Cocktails",
    slug: "cocktails",
    image: "https://ext.same-assets.com/543785121/746458956.jpeg",
    count: 4
  }
]

export const products = [
  {
    title: "Citrus Bomb",
    slug: "citrus-bomb",
    image: "https://ext.same-assets.com/543785121/3741973376.png",
    price: "7.50"
  },
  {
    title: "Mango Fusion",
    slug: "mango-fusion",
    image: "https://ext.same-assets.com/543785121/295926101.png",
    price: "7.50"
  },
  {
    title: "Exotic Strawberry",
    slug: "exotic-strawberry",
    image: "https://ext.same-assets.com/543785121/500043887.png",
    price: "7.50"
  }
]
