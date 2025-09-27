import { UPLOAD_IMAGE } from "./apiEndpoints";

const CLOUDINARY_CLOUD_PRESET = "moneymanager";

export const uploadProfileImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image)
    formData.append("upload_preset", CLOUDINARY_CLOUD_PRESET)
    try{
        const resp = await fetch(UPLOAD_IMAGE, {
            method: "POST",
            body: formData
        })
        if(!resp.ok){
            throw new Error(`Cloudinary upload failed`)
        }
        const data = await resp.json();
        console.log("imaged uploaded", data)
        return data.secure_url;
    }catch(error){
        throw error
    }
}