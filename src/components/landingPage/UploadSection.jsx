"use client"
import { React, useState } from "react"
import Container from "../BasicLayout/Container"
import UploadImage from "../BasicLayout/uploadButton"
import { Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CameraComponent from "../ui/Camera"
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import Image from "next/image"
import { toast } from "react-toastify";
import { TostStyle } from "@components/libs/constant";
import axios from "axios";
import ProductList from "../RendringAlter";
import Buttont from "../ui/button";
import Button from "../ui/button";
import { CanvasRevealEffectDemo3 } from "../ui/HoverCard";
const loadingStates = [
    {
        text: "Uploading image",
    },
    {
        text: "Analysing image",
    },
    {
        text: "Getting results",
    },
    {
        text: "Comparing nutrition",
    },
    {
        text: "Understanding data",
    },
    {
        text: "Finding better products",
    },
];


export default function UploadSection({ age, selectedDisease, text, setImageUrl }) {

    const [loading, setLoading] = useState(false);
    const [curloadingState, setLoadingState] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);


    // function handleClick() {
    //     if (!age || !selectedDisease) {
    //         toast.error("Sorry , You have to give us your age and Disease", TostStyle)
    //     }
    //     else if ((!text && !imageUrl)) {
    //         toast.error("Please share what you are eating or upload an image of your meal!", TostStyle)
    //     } else {
    //         async function getResponse() {
    //             const data = {
    //                 age: age,
    //                 disease: selectedDisease,
    //                 url: imageUrl,
    //                 food: text
    //             }
    //             try {
    //                 setLoadingState(loadingStates);
    //                 setLoading(true);
    //                 const res = await axios.post("/api/chat", data);
    //                 if (res.status == 200) {
    //                     if (DataPresnt) {
    //                         setData(DataPresnt)
    //                     }
    //                     else setData(res.data);
    //                 }
    //             }
    //             catch (error) {
    //                 toast.error(error.message || "Something went wrong Please try again later", TostStyle
    //                 )
    //             } finally {
    //                 setLoading(false);
    //             }
    //         }
    //         getResponse();
    //     }
    // }

    // function handleReset() {
    //     setAge("");
    //     setDataPresent("");
    //     setData("")
    //     setSelectedDisease("")
    //     setImageUrl("");
    //     setText("")
    // }

    return (
        <section>
            <Container>

                <div className="flex gap-6 items-center sm:flex-row flex-col">


                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger ><div className="text-gray-500 border-[0.2px] border-gray-700 rounded-md py-4 px-10 w-[20rem] flex flex-col gap-4 items-center cursor-pointer hover:bg-white/5 group">
                            <Camera size={72} />
                            <p className="text-center">Click the photo and get the information right now</p>
                        </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <CameraComponent setLoading={setLoading} setImageUrl={setImageUrl} setLoadingState={setLoadingState} setIsModalOpen={setIsModalOpen} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <UploadImage setLoading={setLoading} setImageUrl={setImageUrl} setLoadingState={setLoadingState} />
                </div>


                <Loader loadingStates={curloadingState} loading={loading} duration={1000} />
                {/* <div className="flex justify-center items-center gap-10">

                    {isResetActice && <Button onClick={handleReset} title="Reset" Variant="outline" />}
                    <Button onClick={handleClick} title="Foodify Me" />
                </div> */}

                {/* 
                {(imageUrl || data) && <div className="border border-input px-6 py-4 mt-16 rounded-md  justify-center flex flex-col gap-10 items-center">
                    <h1 className="font-semibold text-white text-2xl ">Response</h1>
                    {imageUrl && <Image src={imageUrl} height={100} width={200} alt="pdoduct" className="rounded-md flex " />}
                    {data && <div className="flex justify-between gap-10 flex-col">
                        <div className="text-white">
                            <h1 className="text-lg text-gray-400">{data?.foodQueryResponse?.chatMessage?.answer}</h1>
                        </div>
                        <ProductList data={data} />
                    </div>
                    }
                </div>} */}
            </Container>
        </section >
    )
}
