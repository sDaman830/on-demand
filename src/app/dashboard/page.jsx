"use client"

import Container from "@components/components/BasicLayout/Container";
import NavBar from "@components/components/BasicLayout/NavBar";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MultiStepLoader as Loader } from "@components/components/ui/multi-step-loader";
import axios from "axios"

import StepOne from "@components/components/steps/stepOne";
import StepTwo from "@components/components/steps/stepTwo";
import StepThree from "@components/components/steps/stepthree";
import UploadSection from "@components/components/landingPage/UploadSection";
import Image from "next/image";
import { toast } from "react-toastify";
import { TostStyle } from "@components/libs/constant";


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


function Dashboard() {
    const [selectedDisease, setSelectedDisease] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [curloadingState, setLoadingState] = useState();


    const [imageUrl, setImageUrl] = useState("");

    // State to store selected disease
    const [age, setAge] = useState(""); // State to store age
    const [text, setText] = useState(""); // State to store text input

    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const searchParams = useSearchParams();
    const step = searchParams?.get("step");
    const steps = useMemo(() => {
        return [
            {
                title: "disease",
                component: (
                    <StepOne selectedDisease={selectedDisease}
                        setSelectedDisease={setSelectedDisease} />
                ),
            },
            {
                title: "age",
                component: (
                    <StepTwo />
                ),
            },
            {
                title: "food",
                component: (
                    <StepThree />
                ),
            },
        ];
    }, []);

    useEffect(
        function () {
            // Finding current step for registration
            if (step) {
                const currentStep = steps.findIndex((item) => item.title === step);
                setCurrentStep(currentStep);
            } else setCurrentStep(0);

        },
        [step, steps]
    );



    const isResetActice = age || selectedDisease || imageUrl || text || data;


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
                    const res = await axios.post("http://localhost:4000/api/chat", data);
                    if (res.status == 200) {
                        if (DataPresnt) {
                            setData(DataPresnt)
                        }
                        else setData(res.data);
                    }
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
        <section className={`bg-[#2234ae]/10 h-screen ${currentStep === 2 ? "overflow-y-scroll" : ""} pb-16`}>
            <NavBar />
            <Container>
                {currentStep === 0 && <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center flex-col mt-16">
                    <div className="mb-8 flex justify-center flex-col items-center md:gap-8 gap-6">
                        <h1 className="md:text-5xl text-3xl text-center text-white">What health issue are you facing?</h1>
                        <h1 className="text-gray-400 md:w-2/3 text-center md:text-xl">Share your concerns with us. Don't worry, we're here to help you find the best alternatives so you can maintain your diet without sacrificing your well-being.</h1>
                        <input
                            className="glass relative text-sm sm:text-base z-50 border-none text-white bg-transparent rounded-full focus:outline focus:ring-1 focus:outline-1 pl-6 px-8 py-2 max-w-xl w-full md:mt-4 mx-10 focus:outline-white"
                            placeholder="For example, Diabetes, Blood Pressure"
                            value={selectedDisease}
                            type="text"
                            onChange={(e) => setSelectedDisease(e.target.value)
                            }
                        />
                        {selectedDisease && <motion.div initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, }}
                            transition={{ duration: 1 }}
                            exit={{ opacity: 0, duration: 1 }}

                        >

                            <button className='bg-white rounded-full hover:bg-gray-200 transition text-lg px-12 font-medium' onClick={() => router.push("?step=age")}>Continue</button>
                        </motion.div>}
                    </div>
                </motion.div>}

                {currentStep === 1 && <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center flex-col mt-16 ">
                    <div className="mb-8 flex justify-center flex-col items-center md:gap-8 gap-6">
                        <h1 className="md:text-5xl text-3xl text-center text-white">Whats your Age ?</h1>
                        <h1 className="text-gray-400 md:w-2/3 text-center md:text-xl">Age is just a number. It's never too late to start taking care of your health. Share your age with us so we can tailor our recommendations to better suit your needs.</h1>
                        <input
                            className="glass relative text-sm sm:text-base z-50 border-none text-white bg-transparent rounded-full focus:outline focus:ring-1 focus:outline-1 pl-6 px-8 py-2 max-w-xl w-full md:mt-4 mx-10 focus:outline-white"
                            placeholder="For eg , 10"
                            value={age}
                            type="number"
                            onChange={(e) => setAge(e.target.value)
                            }
                        />
                        {age && <motion.div initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, }}
                            transition={{ duration: 1 }}
                            exit={{ opacity: 0, duration: 1 }}

                        >

                            <button className='bg-white rounded-full hover:bg-gray-200 transition text-lg px-12 font-medium' onClick={() => router.push("?step=food")}>Continue</button>
                        </motion.div>}
                    </div>
                </motion.div>}

                {currentStep === 2 && <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center flex-col mt-16">
                    <div className="mb-8 flex justify-center flex-col items-center md:gap-8 gap-6">
                        <h1 className="md:text-5xl text-3xl text-center text-white">What you ar eating?</h1>
                        <h1 className="text-gray-400 md:w-2/3 text-center md:text-xl">Age is     Share with us what you are eating. Don't hesitate to tell us. Without knowing your diet, we won't be able to provide alternatives, and you might miss out on your favorite foods.
                        </h1>
                        <input
                            className="glass relative text-sm sm:text-base z-50 border-none text-white bg-transparent rounded-full focus:outline focus:ring-1 focus:outline-1 pl-6 px-8 py-2 max-w-xl w-full md:mt-4 mx-10 focus:outline-white"
                            placeholder="For eg , I am eating Burger with Coke"
                            value={text}
                            type="text"
                            onChange={(e) => setText(e.target.value)
                            }
                        />

                        <Loader loadingStates={curloadingState} loading={loading} duration={1000} />

                        <p className=" text-gray-500 mt-10">Don't worry if you don't know the exact name of the food. Just upload an image or click a picture of the food.
                        </p>
                        {text && <motion.div initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1, }}
                            transition={{ duration: 1 }}
                            exit={{ opacity: 0, duration: 1 }}

                        >

                            <button className='bg-white rounded-full hover:bg-gray-200 transition text-lg px-12 font-medium' onClick={handleClick}>Continue</button>
                        </motion.div>}
                    </div>
                    <UploadSection age={age} selectedDisease={selectedDisease} text={text} setImageUrl={setImageUrl} />

                    {(imageUrl || data) && <div className="border border-input px-6 py-4 mt-16 rounded-md  justify-center flex flex-col gap-10 items-center w-full">
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
                </motion.div>}
            </Container>
        </section>
    );
}

export default Dashboard;
