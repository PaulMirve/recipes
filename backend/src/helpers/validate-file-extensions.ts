import { FileUpload } from "graphql-upload";

export const validateFileExtensions = async (file: FileUpload, allowedExtensions: string[] = ['png', 'jpg', 'jpeg', 'gif']) => {
    const { filename } = await file;
    console.log(filename)
    const nameSplitted = filename.split('.');
    const extension = nameSplitted[nameSplitted.length - 1];
    if (!allowedExtensions.includes(extension)) {
        throw new Error("This extension isn't allowed");
    }
}