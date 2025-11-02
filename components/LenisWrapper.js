'use client'
import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

const LenisWrapper = ({ children }) => {
    useLenis((lenis) => {
        // This runs every scroll frame
        console.log("scrolling...", lenis.scroll);
    });
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
}

export default LenisWrapper
