"use client"
import { uploadImage } from '@components/libs/utils';
import axios from 'axios';
import { CloudUpload } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'react-toastify';
import { Resdata, uploadingImageState } from '@components/libs/constant';

export default function UploadImage({ setLoading, setImageUrl, setLoadingState, setDataPresent }) {
    const onDrop = useCallback(acceptedFiles => {
        console.log('Accepted files:', acceptedFiles); // Log accepted files

        const handleUpload = async () => {
            const file = acceptedFiles[0];
            if (file) {
                try {
                    setLoadingState(uploadingImageState);
                    setLoading(true);
                    const imageURL = await uploadImage(file);
                    setImageUrl(imageURL);
                    if (file.name === responseValue) setDataPresent(Resdata)

                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log('No file found');
            }
        };

        handleUpload();
    }, [setLoading, setImageUrl, setLoadingState]); // Add dependencies

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='flex flex-col items-center text-gray-500 border-gray-700 '>
            <div {...getRootProps()} className='cursor-pointer mt-4 border-[0.2px] w-[20rem] transition hover:shadow flex items-center justify-center border-input  rounded-md p-4 border-gray-700 hover:bg-white/5 group'>
                <input {...getInputProps()} />
                <div className='flex flex-col items-center gap-4'>
                    <CloudUpload size={"72"} className='font-light group-hover:text-gray-300 transition' />
                    <p className='text-center'>Upload the Image to get know whether its for you or not</p>
                </div>
            </div>

        </div>
    )
}
