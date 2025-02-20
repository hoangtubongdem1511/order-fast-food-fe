import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';


const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt')
    const {restaurant, ingredients} = useSelector((store) => store)
    const [formData, setFormData] = useState({
        Name: '',
        CategoryId: ''
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            restaurantId: restaurant.usersRestaurant.id,
            
        }
        dispatch(createIngredient({data, jwt}))
        console.log(data)

        
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,[name]:value
            
        })
    }
  return (
    <div>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient</h1>    
            <form className='space-y-5' onSubmit={handleSubmit}>
            <TextField 
                fullWidth 
                id='name' 
                label='Name' 
                name='name' 
                variant='outlined' 
                onChange={handleInputChange} 
                value={formData.categoryName}
                >
            </TextField>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.ingredientCategoryId}
                    label="Category"
                    onChange={handleInputChange}
                    name='categoryId'
                >
                    {ingredients.category.map((item) => (<MenuItem value={item.id}>{item.name}</MenuItem>))}
                    
                    
                </Select>
            </FormControl>

            <Button variant='contained' type='submit' color='primary'>
                Create Ingredient
            </Button>
            </form>
        </div>
    </div>
  )
}

export default CreateIngredientForm