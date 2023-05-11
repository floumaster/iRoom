import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPurposes = createAsyncThunk('getPurposes', async function() {
    const response = await fetch(`http://localhost:3000/purpose`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const createPurpose = createAsyncThunk('createPurpose', async function(data) {
    const response = await fetch(`http://localhost:3000/purpose/addPurpose`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

const purposesSlice = createSlice({
    name: 'purposes',
    initialState: {
        purposes: []
    },
    extraReducers: {
        [getPurposes.fulfilled]: (state, action) => {
            state.purposes = action.payload
        },
        [createPurpose.fulfilled]: (state, action) => {
            state.purposes.push(action.payload)
        }
    }
})

export default purposesSlice.reducer