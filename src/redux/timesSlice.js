import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getTimes = createAsyncThunk('getTimes', async function() {
    console.log('getTimes')
    const response = await fetch(`http://localhost:3000/time`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(response)
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

    }
})

export default timesSlice.reducer
export const { editTimes } = timesSlice.actions