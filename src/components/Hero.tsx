import Image from "next/image";
import MaxWidthWrapper from "./common/MaxWidthWrapper";

export const Hero = () => {
  return (
    <MaxWidthWrapper>
      <section className="relative h-screen bg-center bg-no-repeat bg-cover bg-black max-h-60 rounded-md">
        <div className="relative z-10 flex items-center h-full">
          <article className="text-white w-[50%] h-full flex flex-col justify-center p-6 gap-3">
            <h2 className="text-3xl md:text-5xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Reach the next level
            </h2>
            <p className="text-lg md:text-xl lg:text-xl font-light text-gray-300 tracking-wide">
              with the biggest outlets of the market
            </p>
          </article>
          <picture className="w-[50%] relative bottom-0 right-0 h-full flex justify-end items-end">
            <Image width={200} height={200} priority src="/hero-products.webp" alt="products" className="w-52 h-52 rounded-md" />
          </picture>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
