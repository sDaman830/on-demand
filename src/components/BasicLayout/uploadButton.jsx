"use client"
import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadImage({ setLoading, setImageUrl, setData, selectedDisease, age }) {


    const onDrop = useCallback(acceptedFiles => {

        const handleUpload = async () => {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ondemand'); // Replace with your upload preset

            try {
                setLoading(true);
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dabeq8yee/image/upload',
                    formData
                );
                const imageURL = response.data.secure_url;
                setImageUrl(response.data.secure_url);



                /// Request to Backend //
                setData("Hello it is message from Response")

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
            {/* <button className='font-semibold bg-[#005CE8] text-white px-8 py-3 mt-6 rounded-md'>
                Foodify
            </button> */}

        </div>
    )
}