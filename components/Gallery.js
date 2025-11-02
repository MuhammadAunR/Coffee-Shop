import React from 'react'
import Image from 'next/image'

const Gallery = () => {
    return (
        <>
            <div className="grid grid-cols-6 grid-rows-6 w-full h-[90vh]">
                <div className="col-span-2 row-span-6 relative overflow-hidden">
                    <Image
                        src="/gallery 1.jpg"
                        alt="Gallery 1"
                        fill
                        quality={85}
                        className="object-cover hover:scale-105 transition-all duration-700 ease-in-out"
                    />
                </div>

                <div className="col-span-2 row-span-3 col-start-3 relative overflow-hidden">
                    <Image
                        src="/gallery 2.jpg"
                        alt="Gallery 2"
                        fill
                        quality={85}
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                </div>

                <div className="col-span-2 row-span-3 col-start-3 row-start-4 relative overflow-hidden">
                    <Image
                        src="/gallery 3.jpg"
                        alt="Gallery 3"
                        fill
                        quality={85}
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                </div>

                <div className="col-span-2 row-span-3 col-start-5 row-start-1 relative overflow-hidden">
                    <Image
                        src="/gallery 4.jpg"
                        alt="Gallery 4"
                        fill
                        quality={85}
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                </div>

                <div className="col-span-2 row-span-3 col-start-5 row-start-4 relative overflow-hidden">
                    <Image
                        src="/gallery 5.jpg"
                        alt="Gallery 5"
                        fill
                        quality={85}
                        className="object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                </div>
            </div>


        </>
    )
}

export default Gallery
