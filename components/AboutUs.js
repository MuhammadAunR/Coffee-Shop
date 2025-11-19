import Image from 'next/image'
import React from 'react'

const AboutUs = () => {
  return (
    <>
      <main className=''>
        <section className='grid grid-cols-2 py-20 max-xl:grid max-xl:grid-cols-1'>

          <div className='flex items-center justify-center py-5'>
            <div className='relative'>
              <Image src={'/image 1.jpg'} alt='Image' width={400} height={100} className='max-md:w-80 max-sm:w-50' />
              <div>
                <Image src={'/image 2.jpg'} alt='Image' width={350} height={0} className='max-md:w-70 max-sm:w-40 absolute -bottom-20 -right-25 max-sm:-right-15 max-sm:-bottom-15' />
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-7 justify-center mt-20 w-10/12 mx-auto'>
            <div className='flex flex-col gap-5'>
              <span className='font-body text-chamoisee font-semibold text-sm'>OUR COFFEE SHOP</span>
              <h2 className='text-6xl font-heading w-10/12'>We Combine Classics and Modernity</h2>
              <p className='w-10/12 font-body text-gray-500 text-lg'>We appreciate your trust greatly. Our clients choose us and our products because they know we are the best.</p>
            </div>

            <div>
              <div className='font-heading text-lg'>Mon-Fri: 9 AM - 22 PM</div>
              <div className='font-heading text-lg'>Saturday: 9 AM - 20 PM</div>
            </div>
          </div>

        </section>
      </main>
    </>
  )
}

export default AboutUs
