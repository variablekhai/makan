import { NextResponse } from "next/server";

//GET: Get all subscribers
export async function GET(request: Request) {
    try {

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
            `${process.env.NEXT_API_URL}/api/newsletter/subscribers`,
            {
                method: "GET",
                headers,
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
            { error: "Failed to get subscriber" },
            { status: 500 }
        );
    }
}