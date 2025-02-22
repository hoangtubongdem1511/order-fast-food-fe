import { Box, Button, Grid, Modal, TextField } from '@mui/material'
import { DateTimePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../component/State/Restaurant/Action';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initValues = {
    image: '',
    location: '',
    name: '',
    startedAt: null,
    endsAt: null
}

export const Events = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch();
  const {restaurant , ingredients, menu} = useSelector((store) => store)

  const [formValues , setFormValues] = React.useState(initValues)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEventAction({
      data: formValues , 
      restaurantId: restaurant.usersRestaurant?.id,
      jwt  
    }))
    console.log("submit",formValues);
    setFormValues(initValues);
  }
  

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  const handleDateChange = (date , dateType) => {
    const formatedDate = dayjs(date).format('MMMM DD, YYYY  hh:mm A');
    setFormValues({
      ...formValues,
      [dateType]: date
    })
  }
  return (
    <div>
      <div className='pt-5'>
        <Button onClick={handleOpen} variant='contained'>Create New events</Button>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                    name='image' 
                    label='Image URL' 
                    variant='outlined' 
                    fullWidth 
                    value={formValues.image}
                    onChange={handleFormChange} 
                />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                      name='location' 
                      label='Location' 
                      variant='outlined' 
                      fullWidth 
                      value={formValues.location}
                      onChange={handleFormChange} 
                  />
              </Grid>

              <Grid item xs={12}>
                <TextField
                    name='name' 
                    label='Event Name' 
                    variant='outlined' 
                    fullWidth 
                    value={formValues.name}
                    onChange={handleFormChange} 
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                  slotProps={{ textField: { variant: 'outlined' } }}
                  label='Start Date and Time' 
                  value={formValues.startedAt}
                  onChange= {(newValue) => 
                    handleDateChange(newValue , 'startedAt')
                  } 
                  inputFormat='MM/dd/yyyy hh:mm a'
                  className='w-full'
                  sx={{width: '100%'}} 
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                  slotProps={{ textField: { variant: 'outlined' } }}
                  label='End Date and Time' 
                  value={formValues.endsAt}
                  onChange= {(newValue) => 
                    handleDateChange(newValue , 'endsAt')
                  } 
                  inputFormat='MM/dd/yyyy hh:mm a'
                  className='w-full'
                  sx={{width: '100%'}} 
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      </div>
    </div>
  )
}
