import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        const url = new URL(request.url);
        const id = url.pathname.split('/').slice(-1)[0];
  
        if (!id) {
            return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
        }

        const response = await fetch(`${process.env.NEXT_API_URL}/api/comments/post/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "An error occurred" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}