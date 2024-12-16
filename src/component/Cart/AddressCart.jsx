import React from 'react'
import { Button, Card } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export const AddressCart = ({item , showButton , handleSelectAddress}) => {

  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon/>
        <div className='space-y-3 text-gray-500'>
            <h1 className='font-semibold text-lg text-white'>Home</h1>
            <p>
                123, Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quasi, quibusdam.
            </p>
            {showButton && (
                <Button variant='outlined' fullWidth onClick={() => handleSelectAddress(item)}>select</Button>
            )}
        </div>
    </Card>
  )
}



