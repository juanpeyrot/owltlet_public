import { BaseProduct } from '@/types/product';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';

export const CarouselItem = ({ product }: { product: BaseProduct }) => {
  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

  return (
    <div className="flex flex-col items-center">
      <CldImage
        alt={product.name}
        src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1724531867/owltlet/products/${product.publicId}.png`}
        width={100}
        height={100}
        className="w-32 h-32 object-contain mx-auto"
      />
      <Link 
      href={`/products/${product._id}`} 
      className="mt-2 text-lg font-semibold cursor-pointer"
      >{truncateName(product.name, 19)}
      </Link>
      <p className="text-sm text-gray-600 dark:text-dark-text">${product.price.toFixed(2)}</p>
      {product.discountPercentage && (
        <p className="text-sm text-red-500">
          {product.discountPercentage}% off
        </p>
      )}
    </div>
  );
};
