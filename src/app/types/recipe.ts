export type Recipe = {
    id: string;
    title: string;
    slug: string; // format: "2025/05/13/best-satay-in-town"
    category: string;
    description: string;
    imageUrl: string;
    difficulty: "easy" | "medium" | "hard";
    ingredients: string[];
    directions: string[];
    notes: string;
    timeToMake: {
      value: number;
      unit: string;
    };
    createdAt: string;
    updatedAt: string;
    isDraft: boolean;
    isFeatured: boolean;
    type: string;
  
    authorId: string;
    author: {
      id: string;
      name: string;
      email: string;
      bio: string;
    };

    comments: {
      id: string;
      postId: string;
      authorId: string;
      content: string;
      isFlagged: boolean;
      flagCount: number;
      createdAt: string;
      updatedAt: string;
      author: {
        name: string;
      };
    }[];
};