import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Clear the token cookie
        (await
            cookies()).delete("token");

        return NextResponse.json({ message: "Logged out" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}