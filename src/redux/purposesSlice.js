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

export const editPurpose = createAsyncThunk('editPurpose', async function(data) {
    const response = await fetch(`http://localhost:3000/purpose/editPurpose`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

export const deletePurpose = createAsyncThunk('deletePurpose', async function(id) {
    const response = await fetch(`http://localhost:3000/purpose/deletePurpose`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    })
    const parsedResponse = await response.json()
    return id
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
        },
        [deletePurpose.fulfilled]: (state, action) => {
            state.purposes = state.purposes.filter(purpose => purpose.id !== action.payload)
        },
        [editPurpose.fulfilled]: (state, action) => {
            state.purposes = state.purposes.map(purpose => {
                if(purpose.id === action.payload.id)
                    return action.payload
                else
                    return purpose
            })
        }
    }
})

export default purposesSlice.reducer