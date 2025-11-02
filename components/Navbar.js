'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DropDown from './DropDown'

const Navbar = () => {

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
            <nav className="top-7 z-50 flex justify-between items-center w-full 2xl:w-[1521px] bg-parchment/50 transition-all duration-300 ease-in-out hover:backdrop-blur-sm py-2 px-7 fixed">
                <div className='invert'>
                    <Image src={'/logo.png'} alt='Logo' width={200} height={0} optimized="true" preload="true" />
                </div>
                <div className='flex items-center justify-center'>
                    <ul className='items-center justify-center space-x-7 text-xl font-semibold font-body hidden lg:flex'>
                        {navOptions.map((item, index) => {
                            return (
                                <li key={index} onClick={() => scrollToSection(item.path)} className="transition-all ease-initial cursor-pointer relative hover:before:content-[''] hover:before:bg-umber before:h-[3px] before:w-0 hover:before:w-full before:absolute before:top-6 before:transform before:-translate-x-1/2 before:left-1/2 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out">{item.nav}</li>
                            )
                        })}
                        <li
                            className="transition-all ease-initial cursor-pointer relative hover:before:content-[''] hover:before:bg-umber before:h-[3px] before:w-0 hover:before:w-full before:absolute before:top-6 before:transform before:-translate-x-1/2 before:left-1/2 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out">
                            <Link href={'/login'} target='_blank'>Admin Panel</Link>
                        </li>
                    </ul>
                    <span className='lg:hidden'>
                    <DropDown />
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar
