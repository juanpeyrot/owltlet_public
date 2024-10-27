import { lazy, Suspense } from 'react';
import { ClipLoader } from 'react-spinners';

const Categories = lazy(() => import('./Categories'));

export const CategoryGrid = () => {
  return (
    <section className="flex flex-col justify-center items-center gap-5 w-full">
      <div className="w-full flex justify-start items-center">
        <h2 className="text-2xl font-bold dark:text-dark-title pt-5">
          Explore
        </h2>
      </div>
      <Suspense fallback={<ClipLoader />}>
				<Categories />
			</Suspense>
    </section>
  );
};
