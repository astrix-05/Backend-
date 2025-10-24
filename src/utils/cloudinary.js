import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path'; // added to support absolute path resolution


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // ensure Cloudinary gets the correct absolute file path
    const absolutePath = path.resolve(localFilePath);

    // upload the file on cloudinary 
    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto"
    });

    // file has been uploaded on cloudinary
    // console.log("File is uploaded on cloudinary", response.secure_url);
    fs.unlinkSync(localFilePath);

    // remove the file from local storage after successful upload
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return response.secure_url;

  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    // remove the file from local storage as operation failed
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
}

export { uploadOnCloudinary };



// cloudinary.v2.uploader
// .upload("dog.mp4", {
//   resource_type: "video", 
//   public_id: "my_dog",
//   overwrite: true, 
//   notification_url: "https://mysite.example.com/notify_endpoint"})
// .then(result=>console.log(result));
