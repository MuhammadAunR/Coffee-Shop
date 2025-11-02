'use client'
import Image from 'next/image'
import React from 'react'

const Footer = () => {

    const navOptions = [
        { path: 'home', nav: 'Home' },
        { path: 'menu', nav: 'Menu' },
        { path: 'aboutUs', nav: 'About' },
        { path: 'contactUs', nav: 'Contact' },
    ]

    const scrollToSection = (id) => {
        const section = document.getElementById(id)
        section?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <section className='text-white py-20'>

                <div className='flex items-center justify-center transform translate-y-20'>
                    <Image src={'/logo.png'} alt='Logo' width={200} height={0} optimized="true" preload="true" />
                </div>

                <div className='transform translate-y-30'>
                    <ul className='flex items-center justify-center space-x-7 text-xl font-semibold font-body'>
                        {navOptions.map((item, index) => {
                            return (
                                <li key={index} onClick={() => scrollToSection(item.path)} className="transition-all ease-initial cursor-pointer relative hover:before:content-[''] hover:before:bg-umber before:h-[3px] before:w-0 hover:before:w-full before:absolute before:top-6 before:transform before:-translate-x-1/2 before:left-1/2 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out">{item.nav}</li>
                            )
                        })}
                    </ul>
                </div>

            </section>
            <div className='h-[.5px] w-10/12 mx-auto bg-olivine my-4 transform translate-y-30'>
                <footer className='flex items-center justify-center pt-7 text-lg text-white font-body'>
                    <div>M AUN R &copy; 2025. All Rights Reserved.</div>
                </footer>
            </div>
        </>
    )
}

export default Footer
