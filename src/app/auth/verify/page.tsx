'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import { verifyAccount } from '@/services/userService';
import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import { useService } from '@/hooks/useService';

const Page = () => {
  const searchParams = useSearchParams();
  
  const [token, setToken] = useState<string | null>(null);

  const { error, successMessage, loading, execute } = useService<null>(() => verifyAccount(token ?? ''));

  useEffect(() => {
    const queryToken = searchParams?.get('token') ?? null;
    setToken(queryToken);
  }, [])

  useEffect(() => {
    if (!token) return;
    execute();
  }, [token])

  return (
    <MaxWidthWrapper>
        <div className="min-h-screen w-full dark:bg-dark-bg flex flex-col justify-center items-center p-6">
          {loading 
          ? <span className="text-white text-lg animate-pulse">Loading...</span>
          : (
            <div className="bg-orange-200 dark:bg-gray-700 w-full shadow-lg rounded-lg text-center p-8 max-w-md flex flex-col items-center">
            <span className={`text-4xl font-semibold ${successMessage ? 'text-green-600' : 'text-red-600'}`}>
              {successMessage ? 'Yey! ✅' : 'Oops... 😥'}
            </span>
            <span className="text-lg text-gray-800 dark:text-gray-300 mt-4">
              {error ?? successMessage}
            </span>
            <div className="mt-6">
              {
                successMessage 
                ? (
                  <span className="text-gray-600 dark:text-gray-400">
                    You can now{' '}
                    <Link href="/auth/log-in" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors">
                      log in
                    </Link>{' '}
                    and start your journey!
                  </span>)
                : (
                  <span className="text-lg font-semibold text-gray-600 dark:text-gray-400 mt-6">
                    Please, ensure your email is not already veryfied by <Link href="/auth/log-in" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors">
                    logging in
                    </Link>{' '}
                  </span>
                )
              }
            </div>
          </div>
          )}
          
          
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
