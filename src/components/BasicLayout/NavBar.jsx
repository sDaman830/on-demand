"use client"

import React from 'react'
import Container from './Container'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'

function NavBar() {
    return (
        <header className='mx-8 py-2'>
            <nav className='font-medium flex justify-between items-center'>
                <div className='text-white mr-4 sm:text-2xl text-xl font-bold'>
                    Foodify.AI
                </div>
                <div className='flex gap-4 '>
                    <button className='glass 0 px-3 rounded-md text-white block font-medium transition'> <a href="https://666023e40a98f0d7e2614686--snazzy-profiterole-3751ff.netlify.app/" target="_blank" rel="noopener noreferrer">Docs</a></button>
                    <button className='bg-white rounded-md font-medium hover:bg-gray-200 transition'> <LogoutLink>Log out</LogoutLink></button>
                </div>
            </nav>
        </header>
    )
}

export default NavBar