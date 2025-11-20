'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';

const DropDown = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef()

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

    const handleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    useEffect(() => {
        const handleClickOutSide = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setShowDropDown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutSide)
        return () => document.addEventListener("mousedown", handleClickOutSide)

    }, [])


    return (
        <div ref={dropDownRef} className="relative inline-block text-left z-50 ">
            <button
                onClick={handleDropDown}
                className="text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center transition-all duration-300 ease-in-out hover:rotate-180"
                type="button"
            >
                <Menu />
            </button>

            {showDropDown && (
                <div
                    className="absolute right-0 mt-2 divide-y divide-gray-100 rounded-lg shadow-lg w-44  bg-parchment/50 transition-all duration-300 ease-in-out hover:backdrop-blur-sm"
                >
                    <ul className="py-2 text-md font-semibold">
                        {navOptions.map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => {
                                        scrollToSection(item.path);
                                        setShowDropDown(false)
                                    }}
                                    className="block px-4 py-2  transition-all ease-in-out hover:backdrop-blur-sm text-black cursor-pointer">{item.nav}
                                </li>
                            )
                        })}
                    </ul>
                    <div className="py-2">
                        <Link href="/adminPanel"
                            onClick={() => setShowDropDown(false)}
                            className="block px-4 py-2 text-md font-semibold text-black  transition-all ease-in-out hover:backdrop-blur-sm">
                            Admin Panel
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
