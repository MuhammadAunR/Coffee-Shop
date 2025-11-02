'use client'
import ProductCard from '@/components/ProductCard'
import { CircleArrowLeft, Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Menu = () => {
    const [product, setProduct] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    async function handleGetProduct() {
        setIsLoading(true)
        try {
            let response = await fetch("/api/addProduct")
            let result = await response.json()
            setProduct(result.result)
            console.log(product)
            setIsLoading(false)
        } catch (error) {
            console.error("Error Displaying Product", error)
            Response.json({ success: false, message: 'Error Showing Product' })
        }
    }

    useEffect(() => {
        handleGetProduct()
    }, [])

    const handleGoToHome = () => {
        router.push('/')
    }
    const handleGoToDashboard = () => {
        router.push('/login')
    }


    return (
        <>
            <main className=' bg-conic-180 from-olivine via-tea-green to-parchment h-screen'>
                <nav className='fixed top-5 w-full flex items-center justify-between px-10 py-1'>
                    <CircleArrowLeft
                        onClick={handleGoToHome}
                        size={32}
                        className='transition-all duration-300 ease-in-out hover:bg-parchment hover:p-1 rounded-full' />
                    <button
                        onClick={handleGoToDashboard}
                        className="font-body font-semibold text-gray-700 hover:text-black text-lg transition-all ease-initial cursor-pointer relative hover:before:content-[''] hover:before:bg-umber before:h-[3px] before:w-0 hover:before:w-full before:absolute before:top-6 before:transform before:-translate-x-1/2 before:left-1/2 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out ">Admin Panel</button>
                </nav>
                <section className='flex flex-col gap-2 items-center justify-center py-18'>
                    <h4 className='font-body text-umber text-2xl'>OUR MENU</h4>
                    <h1 className='font-heading text-5xl font-bold text-center'>PLACE YOUR ORDER</h1>
                </section>
                <section className='w-10/12 mx-auto flex gap-5 justify-center flex-wrap py-1'>

                    {product && product.length > 0 ? (
                        product.map((item, index) => {
                            return (
                                <ProductCard
                                    key={index}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    desc={item.desc}
                                />
                            )
                        })) : (
                        <div className='w-full flex flex-col items-center gap-5 py-10'>
                            <p className='text-3xl text-gray-600'>No products available</p>
                            <Loader className=' text-gray-600 loader' />
                        </div>
                    )}

                </section>
            </main>
        </>
    )
}

export default Menu
