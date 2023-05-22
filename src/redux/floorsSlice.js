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
    }
})

export default floorsSlice.reducer
export const { setFloors, createFloor, addRoomToFloor } = floorsSlice.actions