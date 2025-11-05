'use client'
import React, { useRef } from 'react'
import { useState } from 'react'
import { Upload, Loader, CircleArrowLeft } from 'lucide-react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AddProductToMenu = () => {

    const fileInputRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [fileUpload, setFileUpload] = useState(null)
    const [preview, setPreview] = useState(null)
    const [productDetails, setProductDetails] = useState(
        {
            name: "",
            desc: "",
            price: "",
            image: ""
        }
    )

    const successToast = (message) => toast.success(message)
    const warningToast = (message) => toast.warning(message)
    const defaultToast = (message) => toast(message)

    // const handleCancelProduct = () => {
    //     let result = window.confirm('Are Your sure to cancel!')
    //     if (result) {
    //         setProductDetails(
    //             {
    //                 name: "",
    //                 desc: "",
    //                 price: "",
    //                 image: ""
    //             }
    //         )
    //         setIsLoading(false)
    //         warningToast("Product Upload Cancelled")
    //         return;
    //     }

    // }

    async function uploadToCloudinary() {
        const formdata = new FormData();
        setIsLoading(true)
        formdata.append("file", fileUpload);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        try {
            let response = await fetch("/api/uploadImage", requestOptions)
            let result = await response.json()
            return result;
        } catch (error) {
            Response.error({ success: false, error: true, message: error })
        }
    }

    const handleFileUpload = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.warn("No file selected");
            warningToast('No file selected!')
            return;
        }
        setFileUpload(e.target.files[0])
        let filePreview = URL.createObjectURL(e.target.files[0])
        setPreview(filePreview)

    }

    const handleResetProduct = () => {
        if (preview) {
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setPreview(null)
            defaultToast('File Removed.')
        } else defaultToast("No File exists.")
    }

    async function handleAddProduct(e) {

        e.preventDefault();
        if (productDetails.name.trim() && productDetails.desc.trim() && productDetails.price.trim() && preview) {

            setIsLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let res = await uploadToCloudinary()

            const raw = JSON.stringify({
                "public_id": res.id,
                "name": productDetails.name,
                "desc": productDetails.desc,
                "price": productDetails.price,
                "image": res.url
            });


            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };
            fetch("/api/addProduct", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    successToast('Product Added Successfully.')
                    setIsLoading(false)
                    setProductDetails(
                        {
                            name: "",
                            desc: "",
                            price: "",
                            image: ""
                        }
                    )
                })
                .catch((error) => console.error(error));
        } else {
            warningToast('All Input fields required!')
        }
    }


    const router = useRouter()
    const handleGoToHome = () => {
        router.push('/adminPanel')
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <main className='h-[100vh] py-15'>
                <CircleArrowLeft
                    onClick={handleGoToHome}
                    size={32}
                    className='fixed top-5 left-5 transition-all duration-300 ease-in-out hover:bg-parchment hover:p-1 rounded-full' />
                <section className='h-fit max-lg:w-full 2xl:w-[756px] mx-auto ring-1 ring-gray-400 rounded-lg bg-white py-10 font-body'>

                    <div className='text-center'>
                        <h2 className='text-3xl font-bold'>Add Product</h2>
                    </div>


                    <div className='w-10/11 mx-auto flex flex-col gap-1'>
                        <label>Preview File</label>
                        <div className='h-[250px] border-2 border-gray-400 border-dashed rounded-lg overflow-hidden flex items-center justify-center'>
                            {preview ? (
                                <div className="h-fit w-1/2 mx-auto rounded-lg overflow-hidden">
                                    <Image
                                        src={preview}
                                        alt="Preview"
                                        className="object-contain rounded-lg"
                                        width={300}
                                        height={250}
                                    />
                                </div>
                            ) : (
                                <span className='text-gray-500'>No File Selected</span>
                            )}
                        </div>

                        <div className='flex justify-self-end self-end'>
                            <button
                                onClick={handleResetProduct}
                                className='bg-gray-200 hover:bg-gray-300 transition-colors duration-300 ease-in-out mx-auto py-1 px-3 rounded-lg text-lg my-2'>Reset</button>
                        </div>
                    </div>

                    <>
                        <div className='w-10/11 mx-auto flex flex-col gap-1 my-5 relative'>
                            <input
                                type="file"
                                id="fileUpload"
                                className='hidden'
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                disabled={isLoading}
                            />
                            <label>Product Image<span className='text-red-500'>*</span></label>
                            <label
                                htmlFor="fileUpload"
                                className={`flex flex-col items-center justify-center gap-2 w-full h-[20vh] rounded-lg border-2 border-gray-400 border-dashed hover:bg-gray-100 transition-colors ease-in-out duration-300 cursor-pointer
                                ${isLoading ? "opacity-40 cursor-not-allowed" : ""} `}>
                                <Upload color='gray' />
                                <span className='text-gray-600 text-lg'>Upload Image</span>
                                <span className='text-gray-600 text-[12px]'>PNG, JPG up to 10MB</span>

                            </label>
                        </div>
                    </>

                    <div className='w-10/11 mx-auto flex flex-col gap-1 my-5'>
                        <label>Product Name<span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            value={productDetails.name || ""}
                            onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                            placeholder='Enter product name'
                            disabled={isLoading}
                            className='disabled:cursor-not-allowed pl-3 p-2 rounded-lg outline-none border-[2px] border-gray-300 transition-all duration-300 ease-in-out focus-within:border-[2px] focus-within:border-gray-500 bg-transparent' />
                    </div>

                    <div className='w-10/11 mx-auto flex flex-col gap-1 my-5'>
                        <label>Product Details<span className='text-red-500'>*</span></label>
                        <textarea
                            type="text"
                            rows={3}
                            value={productDetails.desc || ""}
                            disabled={isLoading}
                            onChange={(e) => setProductDetails({ ...productDetails, desc: e.target.value })}
                            placeholder='Enter product details here.....'
                            className='disabled:cursor-not-allowed pl-3 p-2 rounded-lg outline-none border-[2px] border-gray-300 transition-all duration-300 ease-in-out focus-within:border-[2px] focus-within:border-gray-500 bg-transparent'></textarea>
                    </div>

                    <div className='w-10/11 mx-auto flex flex-col gap-1 my-5 relative'>
                        <label>Price ($)<span className='text-red-500'>*</span></label>
                        <span className="absolute left-3 top-[3.1rem] -translate-y-1/2 text-gray-500">$</span>
                        <input
                            type="number"
                            value={productDetails.price || ""}
                            disabled={isLoading}
                            onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
                            placeholder='0.00'
                            className='disabled:cursor-not-allowed pl-6 p-2 rounded-lg outline-none border-[2px] border-gray-300 transition-all duration-300 ease-in-out focus-within:border-[2px] focus-within:border-gray-500 bg-transparent' />
                    </div>

                    <div className='w-10/11 mx-auto flex items-center justify-center gap-5 mt-10'>
                        <button
                            onClick={handleAddProduct}
                            disabled={isLoading}
                            className='bg-blue-400 hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out w-full py-3 rounded-lg text-lg disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-70'>
                            {isLoading ? <Loader className='loader flex self-center justify-self-center' /> : "Add Product"}
                        </button>
                    </div>
                </section>
            </main >
        </>
    )
}

export default AddProductToMenu

