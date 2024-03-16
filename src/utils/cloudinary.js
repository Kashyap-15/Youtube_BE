import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on Cloudinary via this
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("The File Upload is Successful - ", response.url);
    return response;
  } catch (error) {
    // if the file is not uploaded then we it will be there on server and collect currupted file so that's why we are use fs to unlink from server and remove currupted or grabage files
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
