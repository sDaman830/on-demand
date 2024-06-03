import React from 'react'
import Container from '../BasicLayout/Container'
import Image from 'next/image'

function Response() {
  return (
    <section>
      <Container>
        <div className='border border-input px-8 py-6 rounded-md'>
            <div className=''>
            <h1 className='text-white font-medium text-xl'>Here is your Respons :</h1>
            <div className='flex'>
                <div className='basis-4/5 flex flex-col gap-2 mt-6'>
                    <p className='text-gray-500'>Potato chips, especially salted ones, are high in sodium and fat, which can be detrimental for managing high blood pressure. Even the fat-reduced and unsalted versions still contain significant amounts of carbohydrates and calories, which may not be ideal
</p>
<p>Best Alternative for you :</p>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='p-4 rounded-md border border-ring mt-8 '>
                     <p className='text-white/60 font-medium text-xl mb-2'>Unsalted Potato Chips</p>
                     <p className='text-white text-white/50'> These are a better option compared to salted ones, but still should be consumed in moderation.
</p>
</div>
                     </div>
                </div>
              <Image height={300} width={300} src={"/images.jpeg"} alt='image' className='mt-4 text-center shrink-0 basis-1/5 rounded-md'/>
            </div>
            </div>
        </div>
      </Container>
    </section>
  )
}

export default Response
