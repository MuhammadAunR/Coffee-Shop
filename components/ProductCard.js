import Image from 'next/image'
import React from 'react'


const ProductCard = ({ image, name, desc, price }) => {

    return (
        <>
            <div className="relative font-body flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1">
                <div className="relative mx-3 mt-3 flex self-center h-60 overflow-hidden rounded-lg w-65 ">
                    <Image
                        fill
                        src={image}
                        alt="product image"
                        className="object-cover w-full transition-all duration-500 ease-in-out hover:scale-110"
                    />
                </div>
                <div className="mt-4 px-5 pb-5">
                    <h5 className="text-2xl font-bold text-slate-900">{name}</h5>
                    <span className='text-gray-600 font-semibold'>{desc}</span>
                    <div className="mt-2 mb-5 flex items-center justify-between">
                        <p>
                            <span className="text-3xl font-bold text-slate-900">${price}</span>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductCard
