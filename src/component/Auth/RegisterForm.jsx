import React from 'react'
import { Typography , TextField, Button, Select } from '@mui/material'
import { Form, Formik, Field } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { registerUser } from '../State/Authentication/Action'

const initalValues = {
  fullName: '',
  email: '',
  password: '',
  role: ''
}

export default function RegisterForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('form values',values)
    dispatch(registerUser({userData:values, navigate}))
  }

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initalValues}>
        <Form>
          
        <Field
          as={TextField}
          name='fullName'
          label='full name'
          fullWidth
          variant='outlined'
          margin='normal'
        />
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
          type='password'
        />

        <FormControl fullWidth margin='normal'>
          <InputLabel id="role-simple-select-label">Role</InputLabel>
          <Field
          as={Select}
            labelId="role-simple-select-label"
            id="role-simple-select"
            name="role"
            // value={age}
            label="Role"
            // onChange={handleChange}
          >
            <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
            <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Restaurant owner</MenuItem>
          </Field>
        </FormControl>

        <Button sx={{mt:2 , padding:'1rem'}} fullWidth type='submit' variant='contained'>
          Register
        </Button>

        </Form>
      </Formik>

      <Typography variant='body2' align='center' sx={{mt:3}}>
        If have an account already?
        <Button size='small' onClick={() => navigate('/account/login')}>
          Login
        </Button>
      </Typography>

    </div>
  )
}
