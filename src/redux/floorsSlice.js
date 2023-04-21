import { createSlice } from '@reduxjs/toolkit'

const floorsSlice = createSlice({
    name: 'floors',
    initialState: {
        floors: [
            {
                id: 'fjhsg',
                name: 'One',
                number: 1,
                roomsIds: [
                    'awerawer',
                    'sdfsa',
                    'fdghfdgh'
                ]
            },
            {
                id: 'gfhjfgh',
                name: 'Two',
                number: 2,
                roomsIds: [
                    'ertergt',
                    'fghdfgh',
                    'sdgfdsg'
                ]
            },
            {
                id: 'xcvbcvxb',
                name: 'Three',
                number: 3,
                roomsIds: [
                    'asdfsadf',
                    'sadfsadf',
                    'khagkjfdsflk'
                ]
            }
        ]
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
    }
})

export default floorsSlice.reducer
export const { setFloors, createFloor, addRoomToFloor } = floorsSlice.actions