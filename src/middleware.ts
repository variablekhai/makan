import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Example: Check for a session token in cookies
  const token = request.headers.get('cookie')?.split('; ').find(cookie => cookie.startsWith('token='))?.split('=')[1];

  // If no token is found, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // // Optionally, validate the token or fetch user data
  // const user = await fetchUserFromToken(token);

  // // If the user is not valid or doesn't have the required role, redirect
  // if (!user || user.role !== "admin") {
  //   const loginUrl = new URL("/login", request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Allow the request to proceed
  return NextResponse.next();
}

// Helper function to fetch user data from the token
async function fetchUserFromToken(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json(); // Return user data
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Apply middleware only to the /blog route
export const config = {
  matcher: ["/blog/:path*"],
};