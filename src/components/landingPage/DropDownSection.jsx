"use client"
import { React, useState } from "react"
import Container from "../BasicLayout/Container"
import UploadImage from "../BasicLayout/uploadButton"
import { Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CameraComponent from "../ui/BurgerAlter"
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import Image from "next/image"
import DiabetesFriendlyDosaAlternatives from "../ui/DiabitiesDosa"
import DiabetesFriendlyBurgerAlternatives from "../ui/Burger"
import { toast } from "react-toastify";
import { TostStyle } from "@components/libs/constant";
import axios from "axios";
import ProductList from "../RendringAlter";
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

const arr = [{
    component: <DiabetesFriendlyDosaAlternatives />
},
{
    component: <DiabetesFriendlyBurgerAlternatives />
}
]

export function SelectDemo() {
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState("");
    const [data, setData] = useState(null);
    const [curloadingState, setLoadingState] = useState();


    // State to store selected disease
    const [age, setAge] = useState(""); // State to store age
    const [text, setText] = useState(""); // State to store text input


    const handleDiseaseChange = (event) => {
        setSelectedDisease(event.target.value); // Update disease state on selection change
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value); // Update age state on input change
    };

    const handleTextChange = (event) => {
        setText(event.target.value); // Update text state on input change
    };


    function handleClick() {
        if (!age || !selectedDisease) {
            toast.error("Sorry , You have to give us your age and Disease", TostStyle)
        }
        else if ((!text && !imageUrl)) {
            toast.error("Please share what you are eating or upload an image of your meal!", TostStyle)
        } else {
            async function getResponse() {
                const data = {
                    age: age,
                    disease: selectedDisease,
                    url: imageUrl,
                    food: text
                }
                try {
                    setLoadingState(loadingStates);
                    setLoading(true);
                    const res = await axios.post("http://localhost:4000/chat", data);
                    if (res.status == 200) setData(res.data);
                }
                catch (error) {
                    toast.error(error.message || "Something went wrong Please try again later", TostStyle
                    )
                } finally {
                    setLoading(false);
                }
            }
            getResponse();
        }
    }

    return (
        <section>
            <Container>
                <h1 className='font-semibold text-white text-center mb-2 text-3xl  bg-gradient-to-r from-[#0066FE] to-[#3BCD92]  text-transparent bg-clip-text mt-12'>Know what is better for you
                </h1>
                <p className="text-center text-xl text-gray-500 md:mb-12 mb-6">Enter details to get started</p>
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="grid sm:grid-cols-8 sm:gap-12 items-center grid-cols-1 w-full md:w-[80%]">
                        <div className="sm:col-span-2" >
                            <input placeholder="Enter your Diseses" className="py-2 mt-5 rounded-md px-2 w-full bg-[#161616] border border-input bg-background text-white" onChange={handleDiseaseChange} value={selectedDisease} />
                        </div>
                        <div className="sm:col-span-2" >
                            <input placeholder="Tell me your Age" className="py-2 mt-5 rounded-md px-2 w-full bg-[#161616] border border-input bg-background text-white" type="number" onChange={handleAgeChange} value={age} />
                        </div>

                        <div className="sm:col-span-4">
                            <input placeholder="Tell me what you are eating" className="py-2 mt-5 rounded-md px-2 w-full bg-[#161616] border border-input bg-background text-white" onChange={handleTextChange} value={text} />
                        </div>

                    </div>


                    <p className="text-gray-500">You can upload the image Instead of What are you Eating</p>
                    <div className="flex gap-6 items-center sm:flex-row flex-col">
                        <Dialog>
                            <DialogTrigger> <div className="text-gray-500 border border-input rounded-md py-4 px-10 w-[20rem] flex flex-col gap-4 items-center cursor-pointer">
                                <Camera size={72} />
                                <p className="text-center">Click the photo and get the information right now</p>
                            </div></DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogDescription>
                                        <CameraComponent />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>

                        <UploadImage setLoading={setLoading} setImageUrl={setImageUrl} setLoadingState={setLoadingState} />
                    </div>
                </div>

                <Loader loadingStates={curloadingState} loading={loading} duration={1000} />
                <div className="flex justify-center items-center"><button className="font-semibold bg-[#005CE8] hover:bg-[#005CE8]/60 transition text-white px-8 py-3 rounded-md text-lg" onClick={handleClick}>FoodiFy Me</button></div>


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
                </div>}


            </Container>
        </section>
    )
}
