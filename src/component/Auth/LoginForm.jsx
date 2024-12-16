import { Typography , TextField, Button } from '@mui/material'
import { Form, Formik, Field } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'

const initalValues = {
  email: '',
  password: ''
}

export const LoginForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values, navigate}))
  }


  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initalValues}>
        <Form>
          
        <Field
          as={TextField}
          name='email'
          label='email'
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <Field
          as={TextField}
          name='password'
          label='password'
          fullWidth
          variant='outlined'
          margin='normal'
        />
        <Button sx={{mt:2 , padding:'1rem'}} fullWidth type='submit' variant='contained'>
          Login
        </Button>

        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{mt:3}}>
        Don't have an account?
        <Button size='small' onClick={() => navigate('/account/register')}>
          Register
        </Button>
      </Typography>

    </div>
  )
}