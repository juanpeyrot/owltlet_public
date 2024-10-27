import { useEffect, useState, useCallback } from 'react';

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  children: React.ReactNode;
}

export const InfiniteScroll = ({ loadMore, hasMore, children }: InfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !isFetching &&
      hasMore
    ) {
      setIsFetching(true);
      const currentScrollY = window.scrollY;

      loadMore().finally(() => {
        setIsFetching(false);
        window.scrollTo(0, currentScrollY);
      });
    }
  }, [isFetching, hasMore, loadMore]);

  useEffect(() => {
    const debounceHandleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 200);
    };

    let timeout: NodeJS.Timeout;
    window.addEventListener('scroll', debounceHandleScroll);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching && hasMore) {
      handleScroll();
    }
  }, [isFetching, hasMore, handleScroll]);

  return (
    <div className='w-full'>
      {children}
    </div>
  );
};

