'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader, MoreVertical, Plus, Trash, UserRound } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';
import { NextRequest } from 'next/server';
import { signOut } from 'next-auth/react';


const Admin = () => {

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [delLoader, setDelLoader] = useState(null)

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


    const handleDeleteProduct = async (id) => {
        try {
            setDelLoader(id)
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            const response = await fetch(`/api/addProduct/${id}`, requestOptions)
            const data = await response.json()
            if (response.ok) {
                let remainingProducts = product.filter(item => {
                    return item.public_id !== id
                })
                setProduct(remainingProducts)
                setDelLoader(null)
                toast.success('Product deleted from catalog.')
            }
        } catch (error) {
            setDelLoader(null)
            console.error("Failed to delete!", error)
            return NextRequest.json({ success: false, message: error })
        }
    }

    const handleLogOut = () => {
        toast.info("Logging out...");
        signOut({
            callbackUrl: '/login',
        })
    }


    return (
        <>
            <ToastContainer />
            <main className='2xl:w-[1536px] mx-auto'>
                <nav className="flex justify-between items-center w-full 2xl:w-[1536px] bg-parchment transition-all duration-300 ease-in-out hover:backdrop-blur-lg py-2 px-7">
                    <div className='flex items-center gap-1'>
                        <UserRound color='gray' size={34} />
                        {/* <h1 className='font-body font-extrabold tracking-wider text-2xl'>Admin Panel</h1> */}
                    </div>
                    <ul className='flex items-center justify-center space-x-7 text-xl font-semibold font-body'>
                        <li className="hover-underline"><Link href={'/'}>Home</Link></li>
                        <li
                            className="transition-all ease-initial cursor-pointer relative hover:before:content-[''] hover:before:bg-blue-600 before:h-[3px] before:w-0 hover:before:w-full before:absolute before:top-6 before:transform before:-translate-x-1/2 before:left-1/2 before:bottom-0 before:transition-all before:duration-300 before:ease-in-out hover:text-blue-600">
                            <Link href={'/login'} onClick={handleLogOut}>Logout</Link>
                        </li>
                    </ul>
                </nav>


                <section className='bg-parchment/50 h-full py-10 px-5'>
                    <section className='bg-parchment/70 rounded-lg border-[1px] border-chamoisee h-full p-5 mb-5'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-2xl font-bold font-body'>Product List</h2>
                            <Link href={'/addProductToMenu'}>
                                <button
                                    className="flex self-start items-center justify-center gap-2 font-body text-lg rounded-lg bg-blue-300 px-9 py-3 cursor-pointer hover:text-white transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full  before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-lg before:top-0 before:bg-blue-500 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10">
                                    <span><Plus /></span>
                                    <span className='font-body text-lg max-sm:hidden'>Add Product</span>
                                </button>
                            </Link>
                        </div>
                    </section>
                    <section className='bg-parchment/70 rounded-lg border-[1px] border-chamoisee h-full py-10 px-5 max-lg:overflow-x-auto'>


                        <div className="flex justify-between items-center font-semibold border-b border-gray-500 p-3 mb-3 bg-parchment text-umber max-lg:w-5xl">
                            <div className="w-10 text-center">No.</div>
                            <div className="w-20 text-center">Image</div>
                            <div className="flex-[1] px-2">Name</div>
                            <div className="flex-[5] px-2">Description</div>
                            <div className="w-24 text-center">Price</div>
                        </div>

                        {isLoading && <div><Loader size={34} className='loader flex self-center justify-self-center' /></div>}
                        {product.map((product, index) => (
                            <div
                                key={index}
                                className="max-lg:w-5xl flex items-center justify-between p-3 mb-4 border-b border-chamoisee bg-parchment transition-transform duration-300 ease-in-out hover:-translate-y-2" >
                                <div className="w-10 text-center font-medium text-umber">
                                    {index + 1}.
                                </div>
                                <div className="w-20 flex justify-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 rounded-full object-cover" />
                                </div>
                                <div className="flex-1 px-2 font-body font-semibold text-xl text-umber">
                                    {product.name}
                                </div>
                                <div className="flex-[5] px-2 text-gray-700 font-body">
                                    {product.desc}
                                </div>
                                <div className="w-24 flex items-center justify-end space-x-4">
                                    <span className="font-semibold text-umber">
                                        ${product.price}
                                    </span>

                                    <span className="relative flex items-center justify-center w-6 h-6">
                                        {delLoader === product.public_id ? (
                                            <Loader className="loader w-5 h-5 text-umber animate-spin" />
                                        ) : (
                                            <span className="group">
                                                <Trash
                                                    onClick={() => handleDeleteProduct(product.public_id)}
                                                    className="w-5 h-5 text-umber cursor-pointer hidden group-hover:block transition-opacity duration-300"
                                                />
                                                <MoreVertical
                                                    className="w-5 h-5 text-umber cursor-pointer group-hover:hidden transition-opacity duration-300"
                                                />
                                            </span>
                                        )}
                                    </span>

                                </div>
                            </div>
                        ))}
                        {product.length === 0 && (
                            <div className='text-2xl font-body text-center pt-5'>
                                No product available
                            </div>
                        )}

                    </section>
                </section>
            </main>
        </>
    )
}

export default Admin
