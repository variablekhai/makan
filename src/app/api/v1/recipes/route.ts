import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {

        const response = await fetch(`${process.env.NEXT_API_URL}/api/recipes`, {
            method: "GET",
            headers: {
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