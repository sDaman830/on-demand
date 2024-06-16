import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toast } from "react-toastify";
import { TostStyle } from "./constant";

export function cn(...input) {
  return twMerge(clsx(input));
}

export async function uploadImage(photo) {
  if (!photo) throw new Error("No photo provided");
  const formData = new FormData();
  formData.append("file", photo);
  formData.append("upload_preset", "ondemand");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dabeq8yee/image/upload",
      formData
    );
    const imageURL = response.data.secure_url;
    toast.success("Image Uploaded successfully", TostStyle);
    return imageURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
