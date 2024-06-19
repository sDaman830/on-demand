"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

function StepOne({ selectedDisease, setSelectedDisease }) {
    const router = useRouter();
    return (
        <motion.div
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

                    <button className='bg-white rounded-full hover:bg-gray-200 transition text-lg px-12 font-medium' onClick={() => router.push("step=age")}>Continue</button>
                </motion.div>}
            </div>
        </motion.div>
    )
}

export default StepOne
