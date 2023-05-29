import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const addFloor = createAsyncThunk('addFloor', async function(floor) {
    const response = await fetch(`http://localhost:3000/floor/addFloor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(floor)
    })
    const parsedResponse = await response.json()
    return floor
})

export const deleteFloor = createAsyncThunk('deleteFloor', async function(id) {
    const response = await fetch(`http://localhost:3000/floor/deleteFloor`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id})
    })
    const parsedResponse = await response.json()
    return id
})

export const editFloor = createAsyncThunk('editFloor', async function(floor) {
    const response = await fetch(`http://localhost:3000/floor/editFloor`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(floor)
    })
    const parsedResponse = await response.json()
    return floor
})

export const getFloors = createAsyncThunk('getFloors', async function() {
    const response = await fetch(`http://localhost:3000/floor`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

const floorsSlice = createSlice({
    name: 'floors',
    initialState: {
        floors: []
    },
    reducers: {
        setFloors(state, action) {
            state.floors = action.payload
        },
        createFloor(state, action) {
            state.floors.push(action.payload)
        },
        addRoomToFloor(state, action){
            state.floors.find(floor => floor.id === action.payload.floorId).roomsIds.push(action.payload.roomId)
        }
    },
    extraReducers: {
        [getFloors.fulfilled]: (state, action) => {
            state.floors = action.payload
        },
        [addFloor.fulfilled]: (state, action) => {
            state.floors.push(action.payload)
        },
        [deleteFloor.fulfilled]: (state, action) => {
            state.floors = state.floors.filter(floor => floor.id !== action.payload)
        },
        [editFloor.fulfilled]: (state, action) => {
            state.floors = state.floors.map(floor => {
                if(floor.id === action.payload.id)
                    return {
                        ...floor,
                        id: action.payload.id,
                        name: action.payload.name,
                    }
                else
                    return floor
            })
        },
    }
})

export default floorsSlice.reducer
export const { setFloors, createFloor, addRoomToFloor } = floorsSlice.actions