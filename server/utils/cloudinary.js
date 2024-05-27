import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//here we upload the file as we want 
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    })

    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath)
    return response
  }
  catch (error) {
    fs.unlinkSync(localFilePath) //remove the local saved temporary file as the ulpoad operation got failed 
    return null;
  }
}


export { uploadOnCloudinary }

// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Function to upload file to Cloudinary
// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     // Upload the file to Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto"
//     });

//     // File has been uploaded successfully
//     fs.unlinkSync(localFilePath); // Remove local file
//     return response;
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error.message); // Log the error message
//     console.error("Error Stack:", error.stack); // Log the error stack
//     fs.unlinkSync(localFilePath); // Remove local file if upload fails
//     return null;
//   }
// };

// export { uploadOnCloudinary };
