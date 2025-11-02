'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const OurMenu = () => {

    const router = useRouter()
    const goToMenu = () => {
        router.push('/menu')
    }

    const products = [
        { name: "Espresso", price: 11, desc: "A small portion (30 ml) of pure, strong, aromatic coffee." },
        { name: "Cappuccino", price: 15, desc: "Espresso with steamed milk and foam for a creamy texture." },
        { name: "Latte", price: 14, desc: "Espresso mixed with more milk, topped with light foam." },
        { name: "Mocha", price: 16, desc: "Chocolate-flavored coffee drink made with espresso and milk." },
        { name: "Americano", price: 10, desc: "Espresso diluted with hot water, smooth and balanced." },
        { name: "Macchiato", price: 13, desc: "Espresso topped with a small amount of steamed milk." },
        { name: "Flat White", price: 14, desc: "Smooth espresso-based coffee with velvety milk." },
        { name: "Affogato", price: 17, desc: "Espresso poured over a scoop of vanilla ice cream." },
    ];

    const half = Math.ceil(products.length / 2);
    const firstCol = products.slice(0, half);
    const secondCol = products.slice(half);

    return (
        <>
            {/* <main className='absolute transform -translate-x-[50%] -translate-y-[50%] left-[50%] top-[50%] w-full'> */}
            <main className='py-32 w-full'>

                <section className='flex flex-col space-y-3 justify-center items-center mb-10'>
                    <div className='font-body text-chamoisee'>OUR MENU</div>
                    <h2 className='font-heading text-5xl'>Our Specials</h2>
                    <div className='pt-5'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none"><g><path d="M0.862 5.18805C2.66 5.86472 4.139 6.59939 5.299 7.39205C6.459 8.16539 7.503 9.09339 8.431 10.1761C9.33967 9.13205 10.403 8.21372 11.621 7.42105C12.839 6.62839 14.3663 5.88405 16.203 5.18805L16.406 5.68105C14.5693 6.51239 13.013 7.45972 11.737 8.52305C10.4417 9.58639 9.37833 10.8624 8.547 12.3511H8.518C7.68667 10.8624 6.633 9.58639 5.357 8.52305C4.06167 7.45972 2.49567 6.51239 0.658999 5.68105L0.862 5.18805ZM0.862 0.113052C2.66 0.789719 4.139 1.52439 5.299 2.31705C6.459 3.09039 7.503 4.01839 8.431 5.10105C9.33967 4.05705 10.403 3.13872 11.621 2.34605C12.839 1.55339 14.3663 0.809052 16.203 0.113052L16.406 0.606053C14.5693 1.43739 13.013 2.38472 11.737 3.44805C10.4417 4.51139 9.37833 5.78739 8.547 7.27605H8.518C7.68667 5.78739 6.633 4.51139 5.357 3.44805C4.06167 2.38472 2.49567 1.43739 0.658999 0.606053L0.862 0.113052Z" fill="#333333"></path></g></svg>
                    </div>
                </section>

                {/* <section className='flex justify-evenly gap-20 w-10/12 mx-auto'> */}
                <section className='grid grid-cols-1 gap-20 w-full px-20 lg:grid lg:grid-cols-2'>
                    <section className='flex flex-col gap-5'>
                        {firstCol.map((item, index) => {
                            return <div key={index}>
                                <div className='flex items-center justify-between'>
                                    <span className='font-heading text-3xl'>{item.name}</span>
                                    <span className='font-heading text-2xl'>${item.price}</span>
                                </div>
                                <div className='w-10/11 font-body text-gray-700'>{item.desc}</div>
                            </div>
                        })}

                    </section>
                    <section className='flex flex-col gap-5'>
                        {secondCol.map((item, index) => {
                            return <div key={index}>
                                <div className='flex items-center justify-between'>
                                    <span className='font-heading text-3xl'>{item.name}</span>
                                    <span className='font-heading text-2xl'>${item.price}</span>
                                </div>
                                <div className='w-10/11 font-body text-gray-700'>{item.desc}</div>
                            </div>
                        })}
                    </section>
                </section>
                <button
                    onClick={goToMenu}
                    className="mt-15 flex self-center place-self-center font-body text-lg rounded-full bg-tea-green px-9 py-3 cursor-pointer hover:text-white transition-colors duration-500 relative overflow-hidden before:absolute before:content-[''] before:h-full  before:w-full before:transform before:scale-x-0 hover:before:scale-x-100 before:origin-center before:left-0 before:rounded-full before:top-0 before:bg-umber before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-500 before:ease-in-out before:-z-1 z-10">View More</button>
            </main>
        </>
    )
}

export default OurMenu
