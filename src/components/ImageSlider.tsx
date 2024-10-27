"use client"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import type SwiperType from 'swiper'
import { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import { BaseProduct } from '@/types/product'
import { useRouter } from 'next/navigation'

interface ImageSliderProps {
  products: BaseProduct[]
}

export const ImageSlider = ({ products }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(
    null
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (products.length ?? 0) - 1,
  });

  const router = useRouter();

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (products.length ?? 0) - 1,
      })
    })
  }, [swiper, products])

  const handleGetALook = () => {
    router.push(`/products/${products[activeIndex]._id}`)
  }

  const activeStyles =
    'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'
  const inactiveStyles = 'hidden text-gray-400'

  return (
    <div className='group relative bg-transparent aspect-square overflow-hidden rounded-xl'>
      <div className='absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition flex items-center justify-center'>
        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slidePrev()
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isBeginning,
          })}
          aria-label='previous image'>
          <ChevronLeft className='h-4 w-4 text-zinc-700' />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            handleGetALook()
          }}
          className='transition bg-white text-primary-800 border-2 border-zinc-300 hover:bg-primary-300 h-8 w-auto px-4 z-50 rounded-full'>
          <Eye className='text-zinc-700'/>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault()
            swiper?.slideNext()
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100': !slideConfig.isEnd,
          })}
          aria-label='next image'>
          <ChevronRight className='h-4 w-4 text-zinc-700' />
        </button>
      </div>


      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
        className='h-full w-full'>
        {products.map(p => (
          <SwiperSlide
            key={p._id as string}
            className='-z-10 relative h-full w-full'>
              <CldImage
                className='-z-10 object-contain h-full w-full object-center p-3'
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${p.publicId}.png`}
                width={200}
                height={200}
                alt='Product image'
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}