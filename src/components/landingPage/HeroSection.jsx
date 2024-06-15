"use client"

import React, { useRef } from 'react'
import Container from '../BasicLayout/Container'
import { PlaceHolderUI } from '../ui/HeroInput'
import { motion, useScroll } from "framer-motion"
import UiLoader from '../ui/Loader'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


function HeroSection() {
    return (
        <section className='md:h-[78vh] flex justify-center items-center md:py-0'>
            <Container className={"py-16"}>
                <div className='flex justify-center md:gap-6 gap-4 flex-col items-center'>
                    <p className='text-3xl  bg-gradient-to-r from-[#0066FE] to-[#3BCD92]  text-transparent bg-clip-text'>AI powered Food Safety, consultancy</p>
                    <h1 className='sm:text-6xl text-3xl  text-white sm:text-center'>Get Optimal Food Recommendations
                    </h1>
                    <h2 className='text-2xl sm:text-center sm:w-10/12 text-gray-400'> Get to know more about the food that suits to your personal needs better
                    </h2>
                </div>
            </Container>
        </section>
    )
}

export default HeroSection