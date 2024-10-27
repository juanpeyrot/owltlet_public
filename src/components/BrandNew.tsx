import ProductCarousel from "./products/ProductCarousel";
import 'swiper/css';

export const BrandNew = () => {  
  return (
      <section className="flex flex-col justify-center items-center gap-5 w-full mt-10">
      <div className="w-full flex justify-start items-center">
        <h2
        className="text-2xl font-bold dark:text-dark-title"
        >Brand new
        </h2>
      </div>
      <div className="w-full flex justify-center items-center">
        <ProductCarousel/>
      </div>
    </section>
  )
}
