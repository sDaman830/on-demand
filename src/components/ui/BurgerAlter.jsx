import React, { useState, useRef, useEffect } from 'react';

const CameraComponent = () => {
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

    return (
        <div className="camera-container">
            {!hasPhoto && <video ref={videoRef}></video>}
            <canvas ref={photoRef} style={{ display: 'none' }}></canvas>
            {photo && (
                <div>
                    <h2>Captured Photo:</h2>
                    <img src={photo} alt="Captured" className=' aspect-video' />
                </div>
            )}
            {!hasPhoto && <button onClick={takePhoto}>Capture Photo</button>}
            {hasPhoto && <button onClick={retakePhoto}>Retake Photo</button>}
        </div>
    );
};

export default CameraComponent;
