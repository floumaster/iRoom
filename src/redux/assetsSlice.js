import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAssets = createAsyncThunk('getAssets', async function() {
    const response = await fetch(`http://localhost:3000/assets`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const createAsset = createAsyncThunk('createAsset', async function(data) {
    const response = await fetch(`http://localhost:3000/assets/addAsset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

const assetsSlice = createSlice({
    name: 'assets',
    initialState: {
        assets: []
    },
    extraReducers: {
        [getAssets.fulfilled]: (state, action) => {
            state.assets = action.payload
        },
        [createAsset.fulfilled]: (state, action) => {
            state.assets.push(action.payload)
        }
    }
})

export default assetsSlice.reducer