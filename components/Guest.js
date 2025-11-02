import Image from 'next/image'
import React from 'react'

const Guest = () => {
    return (
        <>
            <main className=''>
                <section className='grid grid-cols-2 py-20 max-xl:grid max-xl:grid-cols-1'>

                    <div className='flex items-center justify-center py-5'>
                        <div className='relative'>
                            <Image src={'/image 3.jpg'} alt='Image' width={500} height={0} className='max-md:w-80 max-sm:w-68' />
                            <div>
                                <Image src={'/image 4.jpg'} alt='Image' width={400} height={0} className='max-md:w-70 max-sm:w-60 absolute -bottom-30 -right-15' />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-7 mt-32 ml-10 max-xl:justify-self-center max-xl:self-center'>
                        <div className='flex flex-col gap-5'>
                            <span className='font-body text-chamoisee font-semibold text-sm'>BE OUR GUEST</span>
                            <h2 className='text-6xl font-heading w-10/12'>Enjoy Authentic Aromatic Coffee</h2>
                            <p className='w-10/12 font-body text-gray-500 text-lg'>Experience the warmth of freshly brewed perfection — where every sip feels like home.</p>
                        </div>

                        <div>
                            <div className='flex items-center justify-start space-x-10 pb-5'>
                                <span>
                                    <Image src={'/guest 1.png'} alt='Coffee' width={70} height={0} optimized='true' preload='true' />
                                </span>
                                <div>
                                    <h3 className='font-heading text-2xl'>Extensive Menu</h3>
                                    <span className='font-body text-gray-500'>Our skilled team will never let you wait for too long.</span>
                                </div>
                            </div>
                            <div className='flex items-center justify-start space-x-10 pb-5'>
                                <span>
                                    <Image src={'/guest 2.png'} alt='Coffee' width={70} height={0} optimized='true' preload='true' />
                                </span>
                                <div>
                                    <h3 className='font-heading text-2xl'>Organic Coffee</h3>
                                    <span className='font-body text-gray-500'>We're proud to offer our guests unique blends.</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>
            </main>
        </>
    )
}

export default Guest
