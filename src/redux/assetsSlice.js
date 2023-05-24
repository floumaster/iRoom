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

export const editAsset = createAsyncThunk('editAsset', async function(data) {
    const response = await fetch(`http://localhost:3000/assets/editAsset`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const parsedResponse = await response.json()
    return data
})

export const deleteAsset = createAsyncThunk('deleteAsset', async function(id) {
    const response = await fetch(`http://localhost:3000/assets/deleteAsset`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    })
    const parsedResponse = await response.json()
    return id
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
        },
        [deleteAsset.fulfilled]: (state, action) => {
            state.assets = state.assets.filter(asset => asset.id !== action.payload)
        },
        [editAsset.fulfilled]: (state, action) => {
            state.assets = state.assets.map(asset => {
                if(asset.id === action.payload.id)
                    return action.payload
                else
                    return asset
            })
        }
    }
})

export default assetsSlice.reducer