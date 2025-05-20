import { NextResponse } from "next/server";

// POST: Unsubscribe a subscriber
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const token = request.headers
            .get("cookie")
            ?.split("; ")
            .find((cookie) => cookie.startsWith("token="))
            ?.split("=")[1];

        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(
            `${process.env.NEXT_API_URL}/api/newsletter/unsubscribe`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "An error occurred" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to add subscriber" },
            { status: 500 }
        );
    }
}