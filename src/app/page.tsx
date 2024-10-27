import { BrandNew } from "@/components/BrandNew";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Hero } from "@/components/Hero";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Link from "next/link";
import { lazy, Suspense } from "react";
import { ClipLoader } from "react-spinners";

const WhyUs = lazy(() => import('../components/WhyUs'));

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-10 mx-auto text-center flex flex-col items-center max-w-3xl bg-transparent">
        <Hero />
        <p className="mt-6 text-lg max-w-prose text-muted-foreground dark:text-dark-text">
          The place where innovation and technology meet. Explore our selection of next-generation devices, precisely selected to elevate your digital experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="px-5 py-3 rounded-lg border-none bg-black text-white dark:bg-dark-title">
            <Link href="/products">Shop Now</Link>
          </button>
        </div>
        
        <BrandNew />

        <section className="mt-16 w-full text-left">
          <h2 className="text-2xl font-bold dark:text-dark-title">Trust our customers</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg dark:bg-[#7952B3]">
              <p className="text-sm text-muted-foreground dark:text-dark-text">"Amazing products! The quality and innovation are unmatched. Highly recommend to anyone looking for the best tech out there."</p>
              <p className="mt-4 text-sm font-semibold text-black">- Harlee Solomon</p>
            </div>
            <div className="bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg dark:bg-[#7952B3]">
              <p className="text-sm text-muted-foreground dark:text-dark-text">"Great customer service and fast shipping. The products have exceeded my expectations."</p>
              <p className="mt-4 text-sm font-semibold text-black">- Alayna Baker</p>
            </div>
          </div>
        </section>
        <CategoryGrid />
        <Suspense fallback={<ClipLoader/>}>
					<WhyUs />
				</Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
