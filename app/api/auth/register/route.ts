import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password not found" },
                { status: 400 }
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { error: "User already registered" },
                { status: 400 }
            );
        }
        await User.create({
            email,
            password
        })

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 400 } 
        );
    } catch (error) {
        console.log("Registration error")
        return NextResponse.json(
            { error: "Failed to register user" },
            { status: 400 }
        );
    }
}