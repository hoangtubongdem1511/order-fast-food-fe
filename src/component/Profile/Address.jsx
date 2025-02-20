import React from 'react'
import { AddressCart } from '../Cart/AddressCart'

export const Address = () => {
  const createOrderUsingSelectAddress = (item) => {}
  return (
    <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
      <div>
        <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
        <div className='flex gap-5 flex-wrap justify-between'>
          {[1, 1, 1, 1, 1, 1].map((item, index) => (
            <AddressCart key={index} handleSelectAddress={createOrderUsingSelectAddress} item={item} showButton={true} />
          ))}
        </div>
      </div>
    </section>
  )
}

