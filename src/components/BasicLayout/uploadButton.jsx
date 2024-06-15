"use client"
import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify';

const loadingStates = [
    {
        text: "Getting image",
    },
    {
        text: "Uploading to server",
    },
    {
        text: "Analysing image",
    },
]
export default function UploadImage({ setLoading, setImageUrl, setLoadingState }) {

    const onDrop = useCallback(acceptedFiles => {

        const handleUpload = async () => {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ondemand'); // Replace with your upload preset

            try {
                setLoadingState(loadingStates);
                setLoading(true);
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dabeq8yee/image/upload',
                    formData
                );
                const imageURL = response.data.secure_url;
                console.log(imageURL)
                toast.success("Image Uploaded succussfully", {
                    hideProgressBar: true,
                    style: { background: "#2e2e2e", color: "white" },
                    closeButton: false,
                })
                setImageUrl(response.data.secure_url);

            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false)
            }
        };

        handleUpload();
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    return (
        <div className='flex flex-col items-center text-gray-500'>
            <div {...getRootProps()} className=' cursor-pointer mt-4 border w-[20rem] flex items-center justify-center border-input rounded-md p-4'>
                <input {...getInputProps()} />
                <div className='flex flex-col items-center gap-4 '>
                    <CloudUpload size={"72"} />
                    <p className='text-center'>Upload the Image to get know whether its for you or not</p>
                </div>
            </div>
            {/* <button className='font-semibold  text-white px-8 py-3 mt-6 rounded-md'>
                Foodify
            </button> */}

        </div>
    )
}