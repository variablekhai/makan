import { NextResponse } from "next/server";

// POST: Add a new subscriber
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
            `${process.env.NEXT_API_URL}/api/newsletter/subscriber`,
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

//GET: Get a subscriber by email
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email query parameter is required" },
                { status: 400 }
            );
        }

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
            `${process.env.NEXT_API_URL}/api/newsletter/subscriber?email=${email}`,
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

// PUT: Update a subscriber's preferences by email
export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const { email, preferences } = body;

        // Check if preferences are only "promotions" or "updates"
        if (
            !preferences ||
            !Array.isArray(preferences) ||
            preferences.some(
                (pref) => pref !== "promotions" && pref !== "updates"
            )
        ) {
            return NextResponse.json(
                { error: "Invalid preferences" },
                { status: 400 }
            );
        }

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
            `${process.env.NEXT_API_URL}/api/newsletter/subscriber`,
            {
                method: "PUT",
                headers,
                body: JSON.stringify({ email, preferences }),
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
            { error: "Failed to update subscriber preferences" },
            { status: 500 }
        );
    }
}

// DELETE: Delete a subscriber by email
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email query parameter is required" },
                { status: 400 }
            );
        }

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
            `${process.env.NEXT_API_URL}/api/newsletter/subscriber?email=${email}`,
            {
                method: "DELETE",
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
            { error: "Failed to delete subscriber" },
            { status: 500 }
        );
    }
}