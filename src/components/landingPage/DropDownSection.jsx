"use client"
import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/Select"
import Container from "../BasicLayout/Container"
import UploadImage from "../BasicLayout/uploadButton"
import { Camera } from 'lucide-react';
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import CaptureComp from "../ui/Camera"
import CameraComponent from "../ui/Camera"



export function SelectDemo() {

    const router = useRouter();

    return (
        <section>
            <Container>
                <h1 className='font-semibold text-white text-center mb-2 text-2xl  bg-gradient-to-r from-[#0066FE] to-[#3BCD92]  text-transparent bg-clip-text mt-12'>Know what is better for you
                </h1>
                <p className="text-center text-xl text-gray-500 mb-12">Enter details to get started</p>
                <div className="flex flex-col gap-10 justify-center items-center">
                    <div className="grid sm:grid-cols-8 sm:gap-12 items-center grid-cols-1">
                        <Select >
                            <SelectTrigger className="sm:col-span-2" >
                                <SelectValue placeholder="Select a Disease" className="text-white" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Common Diseases</SelectLabel>
                                    <SelectItem value="type1_diabetes">Type 1 Diabetes</SelectItem>
                                    <SelectItem value="high_bp">High Blood Pressure (Hypertension)</SelectItem>
                                    <SelectItem value="asthma">Asthma</SelectItem>
                                    <SelectItem value="arthritis">Arthritis</SelectItem>
                                    <SelectItem value="chronic_kidney_disease">Chronic Kidney Disease</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Cardiovascular Diseases</SelectLabel>
                                    <SelectItem value="coronary_artery_disease">Coronary Artery Disease</SelectItem>
                                    <SelectItem value="heart_failure">Heart Failure</SelectItem>
                                    <SelectItem value="stroke">Stroke</SelectItem>
                                    <SelectItem value="peripheral_artery_disease">Peripheral Artery Disease</SelectItem>
                                    <SelectItem value="congenital_heart_disease">Congenital Heart Disease</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Respiratory Diseases</SelectLabel>
                                    <SelectItem value="copd">Chronic Obstructive Pulmonary Disease (COPD)</SelectItem>
                                    <SelectItem value="lung_cancer">Lung Cancer</SelectItem>
                                    <SelectItem value="pulmonary_fibrosis">Pulmonary Fibrosis</SelectItem>
                                    <SelectItem value="sleep_apnea">Sleep Apnea</SelectItem>
                                    <SelectItem value="bronchiectasis">Bronchiectasis</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Neurological Diseases</SelectLabel>
                                    <SelectItem value="alzheimer">Alzheimer's Disease</SelectItem>
                                    <SelectItem value="parkinson">Parkinson's Disease</SelectItem>
                                    <SelectItem value="multiple_sclerosis">Multiple Sclerosis</SelectItem>
                                    <SelectItem value="epilepsy">Epilepsy</SelectItem>
                                    <SelectItem value="migraine">Migraine</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Cancer</SelectLabel>
                                    <SelectItem value="breast_cancer">Breast Cancer</SelectItem>
                                    <SelectItem value="prostate_cancer">Prostate Cancer</SelectItem>
                                    <SelectItem value="colorectal_cancer">Colorectal Cancer</SelectItem>
                                    <SelectItem value="skin_cancer">Skin Cancer</SelectItem>
                                    <SelectItem value="leukemia">Leukemia</SelectItem>
                                </SelectGroup>

                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="sm:col-span-2" >
                                <SelectValue placeholder="Select your age" className="text-white" />
                            </SelectTrigger>
                            <SelectContent>

                            </SelectContent>
                        </Select>
                        <div className="sm:col-span-4">
                            <input placeholder="Tell me what you are eating" className="py-2 mt-5 rounded-md px-2 w-full bg-[#161616] border border-input bg-background text-white" />
                        </div>
                    </div>


                    <p className="text-gray-500">OR</p>
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

                        <UploadImage />
                    </div>
                </div>



            </Container>
        </section>
    )
}
