import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const url = new URL(req.url);
    const id = url.pathname.split('/').slice(-1)[0];

    try {
        const response = await fetch(`${process.env.NEXT_API_URL}/api/recipe/${id}`, {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "An error occurred" },
                { status: response.status }
            );
        }

        // Check if response empty
        if(data == null || data.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').slice(-1)[0];
        const body = await req.json();

        console.log("PUT request body:", body);

        if (!id) {
            return NextResponse.json({ error: "Recipe ID is required" }, { status: 400 });
        }

        const token = req.headers.get('cookie')?.split('; ').find(cookie => cookie.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const response = await fetch(`${process.env.NEXT_API_URL}/api/recipe/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || "An error occurred" },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: response.status });
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE({ params, request }: { params: { id: string }, request: Request }) {
    try {
        const { id } = params;

        const token = request.headers.get('cookie')?.split('; ').find(cookie => cookie.startsWith('token='))?.split('=')[1];

        if (!token) {
            return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
        }

        const response = await fetch(`${process.env.NEXT_API_URL}/api/recipe/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
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