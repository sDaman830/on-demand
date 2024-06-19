"use client"

import React, { useRef } from 'react'
import Container from '../BasicLayout/Container'
import { PlaceHolderUI } from '../ui/HeroInput'
import { motion, useScroll } from "framer-motion"
import UiLoader from '../ui/Loader'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from 'next/navigation'


function HeroSection() {
    const router = useRouter();
    return (
        <motion.section initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }} className='flex-1 justify-center items-center py-auto mt-10'>
            <Container className={"py-16"}>
                <div className='flex justify-center md:gap-6 gap-4 flex-col items-center'>
                    <p className='text-3xl  bg-gradient-to-r from-[#0066FE] to-[#3BCD92]  text-transparent bg-clip-text'>AI powered Food Safety, consultancy</p>
                    <h1 className='sm:text-6xl text-3xl  text-white sm:text-center'>Get Optimal Food Recommendations
                    </h1>
                    <h2 className='text-2xl sm:text-center sm:w-10/12 text-gray-300'> Get to know more about the food that suits to your personal needs better
                    </h2>
                    {/* <PlaceHolderUI /> */}
                    <div className='flex gap-4 '>
                        <button className='glass  px-10 rounded-full text-white block  transition'> <a href="https://666023e40a98f0d7e2614686--snazzy-profiterole-3751ff.netlify.app/" target="_blank" rel="noopener noreferrer">Explore Docs</a></button>
                        <button className='px-10 bg-white rounded-full font-medium hover:bg-gray-200 transition' onClick={() => router.push("/dashboard?step=disease")}> Try it Now</button>
                    </div>
                </div>
            </Container>
        </motion.section>
    )
}

export default HeroSection