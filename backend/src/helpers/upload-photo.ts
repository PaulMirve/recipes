import { FileUpload } from "graphql-upload";
import { createWriteStream } from 'fs';
import { v2 as cloudinary } from 'cloudinary'

export const uploadPhoto = async (photo: FileUpload): Promise<string> => {
    const { filename, createReadStream } = await photo;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    await new Promise(async (resolve, reject) =>
        createReadStream()
            .pipe(createWriteStream(`./uploads/${filename}`))
            .on('finish', () => resolve(true))
            .on('error', () => reject(false))
    );
    const { secure_url } = await cloudinary.uploader.upload(`./uploads/${filename}`);
    return secure_url;
}