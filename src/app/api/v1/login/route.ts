import { NextResponse } from "next/server";
import { LoginPayload } from "@/types/user";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body: LoginPayload = await req.json();
        const { email, password } = body;

        const response = await fetch(`${process.env.NEXT_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ error: data.error || 'An error occurred' }, { status: response.status });
        }

        const { token } = data;

        //Set the token in a cookie
        (await
            //Set the token in a cookie
            cookies()).set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    

        if (!token) {
            return NextResponse.json({ message: 'Token not provided' }, { status: 400 });
        }

        return NextResponse.json({ message: "Logged in" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
