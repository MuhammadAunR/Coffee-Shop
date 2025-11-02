import { Contact, MapPinned } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const ContactUs = () => {
    return (
        <>
            <section className='flex items-center justify-between max-lg:flex-wrap gap-10 w-10/12 mx-auto pt-40'>
                <div className='md:w-1/2 flex flex-col gap-5'>
                    <span className='font-body text-sm text-chamoisee'>CONTACT US</span>
                    <h3 className='font-heading text-6xl'>Get in Touch</h3>
                    <p className='w-full md:w-10/12 text-gray-500'>
                        We invite you every day to enjoy the incredibly delicious coffee drinks of our institution, prepared especially for you. Enjoy a delicious espresso, flat white or cappuccino in our delightful location.</p>
                </div>

                <div className='flex gap-4'>
                    <span><MapPinned /></span>
                    <div className='flex flex-col gap-1'>
                        <span className='font-heading text-2xl font-semibold'>Address</span>
                        <span className='font-body text-gray-500'>Germany</span>
                        <address className='font-body text-gray-500'>785 15h Street, Office 478
                            Berlin, De 81566</address>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <span><Contact /></span>
                    <div className='flex flex-col gap-1'>
                        <span className='font-heading text-2xl font-semibold'>Contact Details</span>
                        <div
                            className="relative py-2 cursor-pointer text-umber 
                            before:content-[''] before:absolute before:left-0 before:bottom-1 
                            before:h-[2.5px] before:w-full before:bg-umber before:transition-all before:duration-500 before:ease-in-out 
                            hover:before:left-1/2 hover:before:w-0 hover:before:opacity-0">maunrasheed.dev@gmail.com</div>
                        <div className='font-body'>+92 328 6536520</div>
                    </div>
                </div>
            </section>

            <section className='pt-16'>

                <div className="grid grid-cols-10 grid-rows-1 gap-0 w-full h-[55vh]">
                    <div className="col-span-2 row-span-3 overflow-hidden relative">
                        <Image
                            src={'/Footer 1.jpg'}
                            alt='Image'
                            fill
                            quality={85}
                            loading='lazy'
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-3 overflow-hidden relative">
                        <Image
                            src={'/Footer 2.jpg'}
                            alt='Image'
                            fill
                            quality={85}
                            loading='lazy'
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-5 overflow-hidden relative">
                        <Image
                            src={'/Footer 3.jpg'}
                            alt='Image'
                            fill
                            quality={85}
                            loading='lazy'
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-7 overflow-hidden relative">
                        <Image
                            src={'/Footer 4.jpg'}
                            alt='Image'
                            fill
                            quality={85}
                            loading='lazy'
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-9 overflow-hidden relative">
                        <Image
                            src={'/Footer 5.jpg'}
                            alt='Image'
                            fill
                            quality={85}
                            loading='lazy'
                            className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out" />
                    </div>
                </div>

            </section>
        </>
    )
}

export default ContactUs
