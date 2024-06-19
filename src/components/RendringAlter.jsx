import { ArrowUpRight } from 'lucide-react';
import React from 'react';

const ProductList = ({ data }) => {
    // Extract the chatMessage from alternativesResponse
    const chatMessage = data?.alternativesResponse.chatMessage;
    // Extract products from chatMessage
    const products = chatMessage?.answer?.split('\n\n').map(item => {
        // Split each product details into lines
        const lines = item?.split('\n');
        // Extract name, price, and link from lines
        const name = lines[0]?.replace('**', '').trim(); // Remove Markdown bold markers and trim spaces
        const price = lines[1]?.trim(); // Trim spaces
        const link = lines[2]?.split('(')[1]?.replace(')', ''); // Extract link from Markdown link

        return {
            name,
            price,
            link
        };
    });

    return (
        <div>
            <ul className='flex flex-col gap-8 mt-6'>
                {products?.map((product, index) => (
                    <li key={index} className='flex flex-col gap-2'>
                        <h3 className='text-lg text-gray-300'>{product?.name.replace('**', '')}</h3>
                        {product?.price && <p className='text-gray-300'><strong className='text-gray-200'>Price   : </strong>{product?.price?.replace("- Price:", "")}</p>}
                        {product?.link && < div className='group flex gap-1 text-blue-600 items-center'>
                            <a href={product?.link} target="_blank" rel="noopener noreferrer" className=' underline '>Product Link </a>
                            <div className='group-hover:rotate-45 transition duration-300'><ArrowUpRight size={24} /></div>
                        </div>}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default ProductList;
