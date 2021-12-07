import { FileUpload } from "graphql-upload"
import { v2 as cloudinary } from 'cloudinary'
import { validateFileExtensions } from "./validate-file-extensions";
import { uploadPhoto } from "./upload-photo";

export const updatePhoto = async (photoUrl: string, photo: FileUpload): Promise<string> => {
    validateFileExtensions(photo);
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    let uploadedUrl: string;
    try {
        const publicId = photoUrl.split('.')[1].split('/')[1];
        await cloudinary.uploader.destroy(publicId);
        uploadedUrl = await uploadPhoto(photo);
    } catch (error) {
        console.log(`${error}`.red);
    };
    return uploadedUrl;
}