import Skeleton from '@mui/material/Skeleton';

export const ProductDetailSkeleton = () => {
  return (
    <div className='flex flex-col h-full p-4 space-y-4 text-white rounded-md'>
      <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
      <Skeleton variant="text" width="60%" animation="wave" />
      <Skeleton variant="text" width="40%" animation="wave" />
      <Skeleton variant="text" width="30%" animation="wave" />
      <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
      <Skeleton variant="rectangular" width="100%" height={50} animation="wave" />
    </div>
  );
};
