import clientPromise from "@/app/lib/mongodb.js"
import { NextResponse } from "next/server"

// To add product to admin panel as well to mongoDB

export async function POST(request) {

    try {
        const body = await request.json()
        const client = await clientPromise
        const db = client.db('CoffeeShop')
        const collection = db.collection('Products')

        const results = await collection.insertOne(body)
        return NextResponse.json({ success: true, error: false, message: 'Your Product is added', result: results })
    } catch (error) {
        return NextResponse.json({ success: false, error: true, message: 'Failed to add product' })
    }
}

// To get all product from mongoBB to show them in admin panel

export async function GET(request) {

    try {

        const client = await clientPromise
        const db = client.db('CoffeeShop')
        const product = await db.collection('Products').find({}).toArray()
        return NextResponse.json({ success: true, error: false, result: product })
    } catch (err) {
        console.error("Error Fetching Product", err)
        return NextResponse.json({ success: false, error: true, message: 'Failed to fetch product data' })
    }
}
