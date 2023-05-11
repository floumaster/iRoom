import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTimes = createAsyncThunk('getTimes', async function() {
    const response = await fetch(`http://localhost:3000/time`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const setTimes = createAsyncThunk('setTimes', async function(data) {
    const response = await fetch(`http://localhost:3000/time/setTimes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

const timesSlice = createSlice({
    name: 'floors',
    initialState: {
        times: [
        ]
    },
    reducers: {
        editTimes(state, action) {
            state.times = action.payload
        },
    },
    extraReducers: {
        [getTimes.fulfilled]: (state, action) => {
            state.times = action.payload
        },
        [setTimes.fulfilled]: (state, action) => {
            state.times = action.payload
        },
    }
})

export default timesSlice.reducer
export const { editTimes } = timesSlice.actions