import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getRooms = createAsyncThunk('getRooms', async function() {
    const response = await fetch(`http://localhost:3000/room`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const parsedResponse = await response.json()
    return parsedResponse
})

export const createRoom = createAsyncThunk('createRoom', async function(data) {
    const processedData = {
        room: data,
        assetsIds: data.assetsIds
    }
    const response = await fetch(`http://localhost:3000/room/addRoom`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData)
    })
    const parsedResponse = await response.json()
    return data
})

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: []
    },
    reducers: {
        setRooms(state, action) {
            state.rooms = action.payload
        },
        addBookingToRoom(state, action){
            state.rooms.find(room => room.id === action.payload.roomId).bookingsIds.push(action.payload.bookingId)
        },
    },
    extraReducers: {
        [getRooms.fulfilled]: (state, action) => {
            state.rooms = action.payload.map(room => ({
                ...room,
                capacity: parseInt(room.capacity)
            }))
        },
        [createRoom.fulfilled]: (state, action) => {
            state.rooms.push(action.payload)
        },
    }
})

export default roomsSlice.reducer
export const { setRooms, addBookingToRoom } = roomsSlice.actions