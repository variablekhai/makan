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
    "id": "1",
    "title": "Nasi Lemak",
    "slug": "2025/04/20/nasi-lemak",
    "image": "https://www.maggi.my/sites/default/files/srh_recipes/82bbf23120c53051fd84185ea9c27da9.jpg",
    "description": "A fragrant rice dish cooked in coconut milk, served with spicy sambal, crispy anchovies, boiled egg, cucumber, and peanuts.",
    "time": "45 min",
    "difficulty": "Medium",
    "category": {
      "name": "Main",
      "slug": "main"
    },
    "author": {
      "name": "Muhammad Ali",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "m-ali"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "2",
    "title": "Char Kway Teow",
    "slug": "2025/04/20/char-kway-teow",
    "image": "https://rasamalaysia.com/wp-content/uploads/2009/11/char-koay-teow-thumb.jpg",
    "description": "A beloved stir-fried noodle dish with prawns, eggs, bean sprouts, and Chinese sausage, often cooked over high heat.",
    "time": "30 min",
    "difficulty": "Medium",
    "category": {
      "name": "Street Food",
      "slug": "street-food"
    },
    "author": {
      "name": "Sakinah",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "sakinah"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "3",
    "title": "Roti Canai",
    "slug": "2025/04/20/roti-canai",
    "image": "https://www.kuali.com/wp-content/uploads/2015/05/Roti-canai.jpg",
    "description": "A flaky flatbread with Indian-Muslim origins, usually served with dhal or curry for dipping.",
    "time": "1 hr",
    "difficulty": "Hard",
    "category": {
      "name": "Breakfast",
      "slug": "breakfast"
    },
    "author": {
      "name": "Sakinah",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "sakinah"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "4",
    "title": "Laksa Lemak",
    "slug": "2025/04/20/laksa-lemak",
    "image": "https://resepichenom.com/images/recipes/Laksa_Siam.jpg",
    "description": "A rich and spicy noodle soup with coconut milk, shrimp, tofu puffs, and fresh herbs.",
    "time": "1 hr 10 min",
    "difficulty": "Medium",
    "category": {
      "name": "Soups",
      "slug": "soups"
    },
    "author": {
      "name": "Mr Laksa",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "mr-laksa"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "5",
    "title": "Satay Chicken Skewers",
    "slug": "2025/04/20/satay-chicken-skewers",
    "image": "https://www.unileverfoodsolutions.com.my/dam/global-ufs/mcos/SEA/calcmenu/recipes/MY-recipes/chicken-&-other-poultry-dishes/satay-ayam/main-header.jpg",
    "description": "Grilled skewers of marinated chicken served with spicy peanut sauce, cucumber, and rice cakes.",
    "time": "35 min",
    "difficulty": "Easy",
    "category": {
      "name": "Appetizers",
      "slug": "appetizers"
    },
    "author": {
      "name": "Muhammad Ali",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "m-ali"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "6",
    "title": "Beef Rendang",
    "slug": "2025/04/20/beef-rendang",
    "image": "https://www.elmundoeats.com/wp-content/uploads/2023/04/A-bowl-of-beef-rendang.jpg",
    "description": "A slow-cooked dry curry with tender beef simmered in coconut milk and spices until rich and aromatic.",
    "time": "2 hrs",
    "difficulty": "Hard",
    "category": {
      "name": "Main",
      "slug": "main"
    },
    "author": {
      "name": "Zulkarnian",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "zulkarnian"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "7",
    "title": "Cendol",
    "slug": "2025/04/20/cendol",
    "image": "https://asianinspirations.com.au/wp-content/uploads/2019/11/R00389-Cendol-1920x1280.jpg",
    "description": "A sweet dessert made with shaved ice, green rice flour jelly, coconut milk, and palm sugar syrup.",
    "time": "20 min",
    "difficulty": "Easy",
    "category": {
      "name": "Desserts",
      "slug": "desserts"
    },
    "author": {
      "name": "Fathullah",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "fathullah"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "8",
    "title": "Mee Goreng Mamak",
    "slug": "2025/04/20/mee-goreng-mamak",
    "image": "https://www.unileverfoodsolutions.com.my/dam/global-ufs/mcos/SEA/calcmenu/recipes/MY-recipes/vegetables-&-vegetable-dishes/mee-goreng-mamak/main-header.jpg",
    "description": "Spicy stir-fried yellow noodles with tofu, egg, potato, and a savory-sweet tomato sauce.",
    "time": "25 min",
    "difficulty": "Easy",
    "category": {
      "name": "Street Food",
      "slug": "street-food"
    },
    "author": {
      "name": "Mamak Legend",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "mamak-legend"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "9",
    "title": "Asam Pedas Ikan",
    "slug": "2025/04/20/asam-pedas-ikan",
    "image": "https://i.ytimg.com/vi/lnDLNI9hMbs/maxresdefault.jpg",
    "description": "A tangy and spicy fish stew made with tamarind juice, chili, and herbs, popular in southern Malaysia.",
    "time": "50 min",
    "difficulty": "Medium",
    "category": {
      "name": "Main",
      "slug": "main"
    },
    "author": {
      "name": "Abdullah Sari",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "abdullah-sari"
    },
    "date": "April 20, 2025"
  },
  {
    "id": "10",
    "title": "Kuih Seri Muka",
    "slug": "2025/04/20/kuih-seri-muka",
    "image": "https://amcarmenskitchen.com/wp-content/uploads/2020/06/1644.jpg?w=810",
    "description": "A two-layered traditional dessert with sticky glutinous rice on the bottom and a pandan custard layer on top.",
    "time": "1 hr",
    "difficulty": "Medium",
    "category": {
      "name": "Desserts",
      "slug": "desserts"
    },
    "author": {
      "name": "Makcik Siti",
      "image": "https://avatar.iran.liara.run/public",
      "slug": "makcik-siti"
    },
    "date": "April 20, 2025"
  }
]


export const categories = [
  {
    name: "Main",
    slug: "main",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlyYqlMWihydRmKH593aaedlx9mTjiT0jA1w&s",
    count: 3
  },
  {
    name: "Appetizers",
    slug: "appetizers",
    image: "https://www.ajinomoto.com.my/sites/default/files/content/recipe/image/2023-04/Cucur%20Jagung%20Ketam.jpg",
    count: 2
  },
  {
    name: "Soups",
    slug: "soups",
    image: "https://steamykitchen.com/wp-content/uploads/2009/06/malaysian-chicken-noodle-soup-ipoh-007.jpg",
    count: 3
  },
  {
    name: "Desserts",
    slug: "desserts",
    image: "https://images.ctfassets.net/u128j5s4q9gv/61TqhppWWhVPHLWbu2akcu/5667b32e6d2cbdff7d43ef20c6a739c0/Screen_Shot_2019-01-17_at_12.40.14.png",
    count: 6
  },
  {
    name: "Drinks",
    slug: "drinks",
    image: "https://mamakmalaysian.wordpress.com/wp-content/uploads/2016/05/menu_drinks_new.jpg?w=600",
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
