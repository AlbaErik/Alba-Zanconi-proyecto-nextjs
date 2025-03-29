import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    original_filename: string;
}


export async function POST(request: NextRequest): Promise<NextResponse> {

    try {
        const data = await request.formData();
        const image = data.get("file");

        if (!image || !(image instanceof Blob)) {
            return NextResponse.json({ error: "No se ha subido ninguna imagen" }, { status: 400 });
        }

        const byte = await image.arrayBuffer();
        const buffer = Buffer.from(byte);

        const uploadResult: CloudinaryUploadResult = await new Promise(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error || !result) {
                            reject(error || new Error("Upload failed"));
                        } else {
                            resolve(result as CloudinaryUploadResult);
                        }
                    }
                );
                uploadStream.end(buffer);
            }
        );

        const imageUrl = uploadResult.secure_url;

        return NextResponse.json({ url: imageUrl });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
