import { Divider, Modal , Grid} from '@mui/material'
import React from 'react'
import {CartItem} from './CartItem'
import {AddressCart} from './AddressCart'
import { Button, Card , TextField} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { AddLocation } from '@mui/icons-material';
import { Box } from '@mui/system';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';

// const items = [1,1]

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline:"none",
    boxShadow: 24,
    p: 4,
  };
const initialValues = {
    streetAddress: '',
    state: '',
    pincode: '',
    city: ''
}

// const validationSchema = Yup.object.shape({
//     streetAddress: Yup.string().required('Street Address is required'),
//     state: Yup.string().required('State Address is required'),
//     pincode: Yup.required('Pincode Address is required'),
//     city: Yup.string().required('City Address is required')
// })

const Cart = () => {
    const createOrderUsingSelectAddress = (item) => {}
    const handleOpenAddressModel = () => setOpen(true);
    const [open, setOpen] = React.useState(false);
    const {cart , auth} = useSelector(store => store)
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const data = {
            jwt: localStorage.getItem('jwt'),
            order: {
                restaurantId: cart.cartItems[0].food?.restaurant.id,
                deliveryAddress: {
                    fullName: auth.user?.fullName,
                    streetAddress: values.streetAddress,
                    city: values.city,
                    state: values.state,
                    postalCode: values.pincode,
                    country: 'Viet Nam'
                }
            }
        }
        dispatch(createOrder(data))
        console.log("form value", values)
    }

  return (
    <div>
        <main className='lg:flex justify-between'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
                {cart.cartItems.map((item) => (
                    <CartItem item ={item}/>
                ))}
            <Divider/>
            <div className='billlDetails px-5 text-sm'>
                <p className='font-extralight py-5'>Bill Detail</p>
                <div className='space-y-3'>
                    <div className='flex justify-between text-gray-400'>
                        <p>Item total</p>
                        <p>{cart.cart?.total}$</p>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>Delivery fee</p>
                        <p>59$</p>
                    </div>
                    <div className='flex justify-between text-gray-400'>
                        <p>Restaurant Change</p>
                        <p>59$</p>
                    </div>
                    <Divider/>
                </div>
                <div className='flex justify-between text-gray-400'>
                    <p>Total pay</p>
                    <p>{cart.cart?.total+59+59}$</p>
                </div>
            </div>
            </section>
            <Divider orientation='vertical' flexItem/>
            <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                <div>
                    <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                    <div className='flex gap-5 flex-wrap justify-center'>
                        {/* {[1].map((item) => (
                            <AddressCart handleSelectAddress={createOrderUsingSelectAddress} item={item} showButton={true}/>
                        ))} */}
                        <Card className='flex gap-5 w-64 p-5'>
                            <AddLocation/>
                            <div className='space-y-3 text-gray-500'>
                                <h1 className='font-semibold text-lg text-white'>Add new Address</h1>
                                    <Button variant='outlined' fullWidth onClick={handleOpenAddressModel}>Add</Button>

                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handleSubmit}
                >
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Field
                            as={TextField}
                            name='streetAddress'
                            label='Street address'
                            fullWidth
                            variant='outlined'
                            // error={!ErrorMessage('streetAddress')}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg) => <span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                            as={TextField}
                            name='ward'
                            label='Ward'
                            fullWidth
                            variant='outlined'
                            // error={!ErrorMessage('streetAddress')}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg) => <span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                            as={TextField}
                            name='district'
                            label='District'
                            fullWidth
                            variant='outlined'
                            // error={!ErrorMessage('streetAddress')}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg) => <span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field
                            as={TextField}
                            name='city'
                            label='City'
                            fullWidth
                            variant='outlined'
                            // error={!ErrorMessage('streetAddress')}
                            // helperText={
                            //     <ErrorMessage>
                            //         {(msg) => <span className='text-red-600'>{msg}</span>}
                            //     </ErrorMessage>
                            // }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth variant='contained' type='submit' color='primary'>Delivery here</Button>
                        </Grid>
                    </Grid>
                </Form>
                </Formik>
            </Box>
        </Modal>
    </div>
  )
}

export default Cart