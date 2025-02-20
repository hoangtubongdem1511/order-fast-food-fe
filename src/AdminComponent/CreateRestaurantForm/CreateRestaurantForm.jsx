import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { uploadToCloudaniry } from '../util/UploadToCloudaniry';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../../component/State/Restaurant/Action';

const initialValues = {
  name: '',
  description: '',
  cuisineType: '',
  streetAddress: '',
  city: '',
  ward: '',
  district: '',
  country: '',
  email: '',
  mobile: '',
  twitter: '',
  instagram: '',
  openingHours: 'Mon - Sun 9:00 AM - 9:00 PM',
  images: []
}

const CreateRestaurantForm = () => {
  const [uploadImage  , setUpLoadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        cuisineType: values.cuisineType,
        address: {
          streetAddress: values.streetAddress,
          city: values.city,
          ward: values.ward,
          district: values.district,
          country: values.country,
        },
        contactInformation: {
          email: values.email,
          mobile: values.mobile,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images
      };
      console.log("data ---" , data);

      dispatch(createRestaurant({data , token: jwt}));
    }
  })

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUpLoadImage(true);
    const image = await uploadToCloudaniry(file);
    formik.setFieldValue('images', [...formik.values.images, image]);
    setUpLoadImage(false);
  }

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue('images', updatedImages);
  }
  return (
    <div className='py-10 px-5 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl '>
        <h1 className=' font-bold text-2xl text-center py-2'>
          Add New Restaurant
        </h1>

        <form onSubmit={formik.handleSubmit} className='space-y-4'>
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' item xs={12}>

              <input 
              accept='image/*' 
              id='fileInput' 
              style={{display: 'none'}} 
              onChange={handleImageChange}
              type='file'
              />
              
              <label htmlFor='fileInput' className='relative'>
                <span className='w-24  h-24 cursor-pointer flex justify-center items-center p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternateIcon className='text-white'/>
                </span>
                {
                  uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress/>
                  </div>
                }
              </label>
              <div className='flex flex-wrap  gap-2'>
                {formik.values.images.map((image, index) => 
                <div className='relative'>
                  <img 
                    className='w-24 h-24 object-cover'
                    key={index}
                    src={image}
                    alt=''
                  />
                  <IconButton 
                  onClick={() => handleRemoveImage(index)} 
                  size='small'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    outline: 'none',
                  }}
                  >
                    <CloseIcon sx={{fontSize:"1rem"}}/> 
                  </IconButton>  
                </div> 
                )}
              </div>

            </Grid>
            <Grid item xs={12}>
              <TextField 
              fullWidth 
              id='name' 
              label='Name' 
              name='name' 
              variant='outlined' 
              onChange={formik.handleChange} 
              value={formik.values.name}
              >

              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField 
              fullWidth 
              id='description' 
              label='Description' 
              name='description' 
              variant='outlined' 
              onChange={formik.handleChange} 
              value={formik.values.description}
              >

              </TextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField 
              fullWidth 
              id='cuisineType' 
              label='Cuisine Type' 
              name='cuisineType' 
              variant='outlined' 
              onChange={formik.handleChange} 
              value={formik.values.cuisineType}
              >

              </TextField>
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='openingHours'
                label='Opening Hours'
                name='openingHours'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='streetAddress'
                label='Street Address'
                name='streetAddress'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.streetAddress}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='city'
                label='City'
                name='city'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.city}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='ward'
                label='Ward'
                name='ward'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.ward}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField
                fullWidth
                id='district'
                label='District'
                name='district'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.district}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id='country'
                label='Country'
                name='country'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.country}
              />
            </Grid>

            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='email'
                label='Email'
                name='email'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='mobile'
                label='Mobile'
                name='mobile'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='twitter'
                label='Twitter'
                name='twitter'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.twitter}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id='instagram'
                label='Instagram'
                name='instagram'
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.instagram}
              />
            </Grid>
          </Grid>
          <Button className='mt-4' variant='contained' color='primary' type='submit'>Create Restaurant</Button>
        </form>
      </div>
    </div>
  )
}

export default CreateRestaurantForm