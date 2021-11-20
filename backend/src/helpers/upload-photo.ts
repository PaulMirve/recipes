import { FileUpload } from "graphql-upload";
import { createWriteStream } from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import tmp from 'tmp';

export const uploadPhoto = async (photo: FileUpload): Promise<string> => {
    const { filename, createReadStream } = await photo;
    const nameSplitted = filename.split('.');
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    const extension = nameSplitted[nameSplitted.length - 1];
    if (!allowedExtensions.includes(extension)) {
        throw new Error("This extension isn't allowed");
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    let returnUrl: string;

    await new Promise(async (resolve, reject) => {
        tmp.dir(async function _tempDirCreated(err, path, cleanupCallback) {
            try {
                if (err) throw err;
                await new Promise(async (resolve, reject) =>
                    createReadStream()
                        .pipe(createWriteStream(`${path}/${filename}`))
                        .on('finish', () => resolve(true))
                        .on('error', () => reject(false))
                );
                const { secure_url } = await cloudinary.uploader.upload(`${path}/${filename}`);
                returnUrl = secure_url;
                cleanupCallback();
                resolve('Photo saved successfully');
            } catch (error) {
                console.log(`${error}`.red);
                reject('Error saving the photo');
            }
        });
    });
    return returnUrl;
}