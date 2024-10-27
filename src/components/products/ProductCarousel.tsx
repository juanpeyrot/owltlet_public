'use client';

import type { BaseProduct } from '@/types/product';
import { useEffect, useState } from 'react';
import { CarouselItem } from './CarouselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { getNewProducts } from '@/services/productService';
import { ClipLoader } from 'react-spinners';
import 'swiper/css/navigation';
import { useService } from '@/hooks/useService';

const ProductCarousel = () => {

  const { loading, result, execute } = useService<BaseProduct[]>(() => getNewProducts());

  useEffect(() => {
    execute();
  }, []);

  return (
    loading 
    ? <ClipLoader loading={loading} />
    : (
      <Swiper
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      navigation
      className='relative flex justify-center items-center w-full h-full'
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Navigation]}
      >
        {result?.map((p) => (
          <SwiperSlide key={p.publicId} className='flex justify-center items-center'>
            <div className="flex justify-center items-center w-full h-full">
              <CarouselItem product={p} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
};

export default ProductCarousel;
