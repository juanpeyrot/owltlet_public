'use client'

import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { useCart } from '@/hooks/useCart'
import { CartItem } from '@/types/cart'

export const AddToCartButton = ({product}: {product: CartItem}) => {
  const { addToCart } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button
      onClick={() => {
        addToCart(product)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full dark:bg-dark-title'>
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton