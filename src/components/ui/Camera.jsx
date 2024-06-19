import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { uploadImage } from '@components/libs/utils';
import { uploadingImageState } from '@components/libs/constant';


const CameraComponent = ({
    setLoadingState,
    setImageUrl,
    setLoading,
    setIsModalOpen

}) => {
    const [hasPhoto, setHasPhoto] = useState(false);
    const [photo, setPhoto] = useState(null);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, []);

    const startCamera = () => {
        let constraints = { video: true };

        // Check if the device is mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            constraints = { video: { facingMode: "environment" } }; // Use the back camera
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                streamRef.current = stream;
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const takePhoto = () => {
        const width = 420;
        const height = 300;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        setPhoto(photo.toDataURL('image/png'));
        setHasPhoto(true);

        stopCamera();
    };

    const retakePhoto = () => {
        setPhoto(null);
        setHasPhoto(false);
        startCamera();
    };

    async function handleUpload() {
        if (!photo) return;
        try {
            setLoadingState(uploadingImageState);
            setLoading(true);
            const imageURL = await uploadImage(photo);
            setImageUrl(imageURL);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
            setIsModalOpen(false)
        }
    }

    return (
        <div className="camera-container ">
            {!hasPhoto && <video ref={videoRef} style={{ width: '420px', height: '300px' }}></video>}
            <canvas ref={photoRef} style={{ display: 'none' }}></canvas>
            {photo && (
                <div>
                    <h2>Captured Photo:</h2>
                    <img src={photo} alt="Captured" className='aspect-video' style={{ width: '420px', height: '300px' }} />
                </div>
            )}
            {!hasPhoto && <button onClick={takePhoto} className='bg-white rounded-md font-medium hover:bg-gray-200 transition text-black'>Capture Photo</button>}
            {hasPhoto && <div className='flex gap-10'>
                <button onClick={retakePhoto} className='rounded-md font-medium hover:bg-gray-800 transition text-white'>Retake Photo</button>
                <button onClick={handleUpload} className='bg-white rounded-md font-medium hover:bg-gray-200 transition text-black'>Upload Image</button>
            </div>}
        </div>
    );
};

export default CameraComponent;
