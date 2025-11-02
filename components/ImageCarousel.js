'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'

const ImageCarousel = () => {

  const slides = [
    {
      src: '/slide 1.jpg',
      title: 'Coffee Shop',
      desc: 'Step into the aroma-filled world where every cup tells a story.'
    },
    {
      src: '/slide 2.jpg',
      title: 'Coffee Accessories',
      desc: 'From elegant mugs to precise brewers — crafted to elevate your coffee ritual.'
    },
    {
      src: '/slide 4.jpg',
      title: 'Pretty Cup Of Coffee',
      desc: 'Aesthetic vibes meet rich flavor — crafted just for your moments of peace.'
    },
    {
      src: '/slide 6.jpg',
      title: 'Beans',
      desc: 'From farm to cup — pure, authentic, and full of life essence.'
    }
  ]


  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: false
        }}
        speed={1200}
        className="w-full h-screen shadow-lg overflow-hidden">
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full group">
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  quality={85}
                  className="object-cover transition-transform duration-[6000ms] ease-in-out group-[.swiper-slide-active]:scale-110" />
                <div className="absolute bottom-[50%] right-[50%] w-1/2 translate-x-[50%] translate-y-[50%] bg-parchment/50 text-black p-4 transition-all ease-in-out duration-300 hover:backdrop-blur-sm cursor-pointer">
                  <h2 className="text-5xl lg:text-7xl font-semibold text-center pb-3 font-heading">{slide.title}</h2>
                  <p className="text-xl text-center font-body font-semibold">{slide.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default ImageCarousel
