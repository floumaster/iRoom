import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getRecurrings = createAsyncThunk('getRecurrings', async function() {
    const response = await fetch(`http://localhost:3000/recurring`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

const recurringsSlice = createSlice({
    name: 'recurrings',
    initialState: {
        recurrings: []
    },
    reducers: {
        
    },
    extraReducers: {
        [getRecurrings.fulfilled]: (state, action) => {
            state.recurrings = action.payload
        },
    }
})

export default recurringsSlice.reducer
//export const { setAssets } = assetsSlice.actions