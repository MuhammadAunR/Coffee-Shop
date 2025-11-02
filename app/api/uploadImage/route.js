import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";

// To upload an image from Cloudinary

export async function POST(request) {

    try {
        const data = await request.formData()
        const file = data.get("file")

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error) {
                        reject(error)
                        console.error(error)
                    } else {
                        resolve(result)
                        console.log(result)
                    }
                }
            ).end(buffer)

        })

        return NextResponse.json({
            success: true,
            error: false,
            url: uploadResult.secure_url,
            id: uploadResult.public_id
        })
    } catch (error) {
        return Response.json({
            success: false,
            error: true,
            message: "Upload to Cloudinary Failed."
        })
    }
}
