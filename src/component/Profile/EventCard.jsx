import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

export const EventCard = () => {
  return (
    <div >
        <Card sx={{width:345}}>
            <CardMedia 
            sx={{height:345}}
            image='https://cdn.pixabay.com/photo/2020/10/29/13/34/table-5696243_1280.jpg'
            />

            <CardContent>
                <Typography variant='h5'>
                    America fast food
                </Typography>

                <Typography variant='body2'>
                    50% off on all items
                </Typography>

                <div className='py-2 space-y-2'>
                    <p>{"texas"}</p>
                    <p className='text-sm text-blue-500'>February 14, 2024 12:00 AM</p>
                    <p className='text-sm text-red-500'>February 15, 2024 12:00 AM</p>
                </div>
            </CardContent>

            {true && <CardActions>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>}
        </Card>
    </div>
  )
}
