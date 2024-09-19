export const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

export const isJapaneseAndChineseChars =  (str) => {
    return str.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/);
};

export const milisConverter = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${(seconds == 60 ? (minutes + 1) : minutes)} ${(minutes > 1) ? "minutes" : "minute"} and ${(seconds < 10 ? "0" : seconds)} ${(seconds > 1 ? "seconds" : "second")}`;
};

export const createSlug = (name) => {
    return name.toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hypens
    .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
}

import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
export async function uploadToCloudinary(data, options) {
    let { key, folder } = options;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    for (const item of data) {
        let result = await cloudinary.uploader.upload(item[key], {
            public_id: item.id,
            folder,
            // in milliseconds
            timeout: 60000
        }, (error, response) => {
            if (error) throw error;
            console.log(`Success upload ${item.name}'s thumbnail to ${response.secure_url}`)
        });

        item[key] = result.secure_url;
    }
}