import { NextResponse } from "next/server";
import { RegisterPayload } from "@/types/user";

export async function POST(req: Request) {
    try {
        const body: RegisterPayload = await req.json();

        const { name, email, password, role, bio } = body;

        const response = await fetch(`${process.env.NEXT_API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, role, bio }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: data.error || 'An error occurred' }, { status: response.status });
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error"}, { status: 500 });
    }
}
