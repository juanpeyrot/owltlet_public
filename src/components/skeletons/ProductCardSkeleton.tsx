import Skeleton from '@mui/material/Skeleton';

export const ProductCardSkeleton = () => {
	return (
		<div className='flex flex-col h-full'>
			<Skeleton variant="rounded" height={200} />
			<Skeleton variant="text"/>
			<Skeleton variant="text"/>
			<Skeleton variant="text"/>
		</div>	
	)
}
