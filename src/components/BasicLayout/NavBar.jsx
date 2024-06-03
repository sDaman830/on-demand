import React from 'react'
import Container from './Container'

function NavBar() {
    return (
        <header className='mx-8 py-6'>
            <nav className='font-medium flex justify-between'>
                <div className='flex gap-8 items-center'>
                    <div className='text-white mr-4'>
                        <h1 className='text-lg'>Foodify.AI</h1>
                    </div>
                    <div className='flex gap-6 text-gray-300'>
                        <div>Home</div>
                        <div>Product</div>
                        <div>Blog</div>
                        <div>About us</div>
                    </div>
                </div>
                <button className='font-semibold bg-[#005CE8] text-white px-8 py-3 rounded-md text-lg'>Dashbaord</button>
            </nav>
        </header>
    )
}

export default NavBar