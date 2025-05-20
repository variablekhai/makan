import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of admin-only paths
const adminPaths = ["/comments/list", "/user/list", "/newsletter/list"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.headers.get('cookie')?.split('; ').find(cookie => cookie.startsWith('token='))?.split('=')[1];
  
  // Redirect to login if token is missing
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Fetch user info using token
  const user = await fetchUserFromToken(token);
  console.log("User fetched from token:", user);

  if (!user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the path is admin-only, check for admin role
  const isAdminRoute = adminPaths.some((path) => url.pathname.startsWith(path));

  if (isAdminRoute && user.role !== "admin") {
    url.pathname = "/unauthorized"; // You can customize this route
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Fetch user info
async function fetchUserFromToken(token: string) {
  console.log("Fetching user with token:", token);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    return await response.json(); // Must return user object with `.role`
  } catch (error) {
    console.error("Error in middleware user fetch:", error);
    return null;
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: [
    "/blog/:path*", // general logged-in access
    "/comments/list", // admin only
    "/user/list",
    "/newsletter/list",
  ],
};
