"use client"
import { React, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/Select"
import Container from "../BasicLayout/Container"
import UploadImage from "../BasicLayout/uploadButton"
import { Camera } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CaptureComp from "../ui/Camera"
import CameraComponent from "../ui/Camera"
import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
import Image from "next/image"
import axios from "axios"

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



export function SelectDemo() {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedDisease, setSelectedDisease] = useState("");
    const [data, setData] = useState(null);

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
        if (!age || !selectedDisease || (!text && !imageUrl)) return;



        const string1 = `I have ${selectedDisease} , My age is ${age} and I want to eat this ${text}. Tell me will this Okay for my body , Give its nutritional content , Recommend some alternative online`;

        const string2 = `I have ${selectedDisease} , My age is ${age} and I am attaching URL of the thing I am eating ${imageUrl}. Tell me will this Okay for my body , Give its nutritional content , Recommend some alternative online`;

        const string = imageUrl ? string2 : string1;

        async function getResponse() {
            const data = {
                query: string
            };

            axios.post('http://127.0.0.1:5000/chat', data)
                .then(response => {
                    console.log(response.data); // Handle the response data from the server
                })
                .catch(error => {
                    console.error(error); // Handle any errors that occur during the request
                });
        }

        getResponse();
    }

    console.log(selectedDisease, age, text)
    return (
        <section>
            <Container>
                <h1 className='font-semibold text-white text-center mb-2 text-2xl  bg-gradient-to-r from-[#0066FE] to-[#3BCD92]  text-transparent bg-clip-text mt-12'>Know what is better for you
                </h1>
                <p className="text-center text-xl text-gray-500 mb-12">Enter details to get started</p>
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="grid sm:grid-cols-8 sm:gap-12 items-center grid-cols-1">
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


                    <p className="text-gray-500">or you can upload the image Instead of What are you Eating</p>
                    <div className="flex gap-10 items-center sm:flex-row flex-col">
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

                        <UploadImage setLoading={setLoading} setImageUrl={setImageUrl} setData={setData} selectedDisease={selectedDisease} age={age} />
                    </div>
                </div>

                <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
                <div className="flex justify-center items-center"><button className="font-semibold bg-[#005CE8] hover:bg-[#005CE8]/60 transition text-white px-8 py-3 rounded-md text-lg" onClick={handleClick()}>FoodiFy Me</button></div>


                {imageUrl && <div className="border border-input px-6 py-4 mt-16 rounded-md">

                    <h1 className="font-semibold text-white text-2xl mb-8">Response</h1>
                    {/* // Render according top the Data */}
                    <div className="flex justify-between gap-10">
                        <div>{data}</div>
                        <Image src={imageUrl} height={100} width={200} alt="pdoduct" className="rounded-md" />
                    </div>
                </div>}

            </Container>
        </section>
    )
}
