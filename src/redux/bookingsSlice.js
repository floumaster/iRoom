import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getBookings = createAsyncThunk('getBookings', async function() {
    const response = await fetch(`http://localhost:3000/booking`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const addBooking = createAsyncThunk('addBooking', async function(data) {
    const response = await fetch(`http://localhost:3000/booking/addBooking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

export const editBooking = createAsyncThunk('editBooking', async function(data) {
    const response = await fetch(`http://localhost:3000/booking/editBooking`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: []
    },
    extraReducers: {
        [getBookings.fulfilled]: (state, action) => {
            state.bookings = action.payload
        },
        [addBooking.fulfilled]: (state, action) => {
            state.bookings.push(action.payload)
        },
        [editBooking.fulfilled]: (state, action) => {
            state.bookings = state.bookings.map(booking => {
                if(booking.id === action.payload.id)
                    return action.payload
                else
                    return booking
            })
        }
    }
})

export default bookingsSlice.reducer