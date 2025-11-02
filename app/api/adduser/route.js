import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        const body = await request.json()
        const client = await clientPromise;
        const db = client.db("CoffeeShop")
        const collection = db.collection("Users")

        // To check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json({
                success: false,
                error: true,
                type: "invalid_email",
                message: 'Invalid email format.',
            })
        }

        // Check is user already exists via email
        let user = await collection.findOne({ email: body.email })
        if (user) {
            return NextResponse.json({
                success: false,
                error: true,
                type: "duplicate_user",
                message: 'User already exists',
            })
        }

        const results = await collection.insertOne(body)
        return NextResponse.json({
            success: true,
            error: false,
            message: 'User Credentials saved.',
            result: results,
        })
    } catch (error) {
        console.error("Fail to save user", error)
        return NextResponse.json({
            success: false,
            error: true,
            message: 'Error saving user to DB.',
        })
    }


}