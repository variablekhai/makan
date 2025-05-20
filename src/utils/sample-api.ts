// utils/api.ts (Create this helper file)
export async function fetchRecipes() {
    const res = await fetch(`http://localhost:3000/api/v1/recipes`, {
      cache: "force-cache", // or "no-store" if it's dynamic
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch recipes");
    }
  
    return res.json();
  }
  