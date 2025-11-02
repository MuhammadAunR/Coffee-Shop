import cloudinary from "@/app/lib/cloudinary";
import clientPromise from "@/app/lib/mongodb"
import { NextResponse } from "next/server"

// To delete the product from mongoDB

export async function DELETE(request, context) {
    try {
        let { id } = await context.params

        // Deleting product's Image from Cloudinary
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Missing Public ID",
            });
        }
        const cloudinaryResult = await cloudinary.uploader.destroy(id);

        // Check if Cloudinary actually deleted it
        if (cloudinaryResult.result !== "ok" && cloudinaryResult.result !== "not found") {
            return NextResponse.json({
                success: false,
                message: "Failed to delete image from Cloudinary",
                cloudinaryResult,
            });
        }

        // Deleting Product from mongoDB
        const client = await clientPromise
        const db = client.db('CoffeeShop')
        const deletedProduct = await db.collection('Products').deleteOne({ public_id: id })

        if (deletedProduct.deletedCount === 0) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "No product found with that ID."
            })
        }

        console.log(`Product with id: ${id} is deleted.`)
        return NextResponse.json({
            success: true,
            error: false,
            message: "Image and Product Deleted.",
            cloudinaryResult,
            deletedCount: deletedProduct.deletedCount,
        })

    } catch (error) {
        console.error("Error Deleting Product and Image", error)
        return NextResponse.json({
            success: false,
            error: true,
            message: 'Failed to remove product from DB and Image.'
        })
    }
}