import { createSlice } from '@reduxjs/toolkit'

const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {
        rooms: [
            {
                id: 'khagkjfdsflk',
                name: 'Room 1',
                capacity: 100,
                assetsIds: [
                    'fdsgdsg',
                    'sdfgsdfg',
                    'fdghfdgh',
                ],
                bookingsIds: [
                    'fdsgdsg',
                ]
            },
            {
                id: 'sadfsadf',
                name: 'Room 2',
                capacity: 200,
                assetsIds: [
                    'reyt',
                    'dfghfdgh',
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'reyt'
                ]
            },
            {
                id: 'asdfsadf',
                name: 'Room 3',
                capacity: 300,
                assetsIds: [
                    'sdfgsdfg',
                    'fdghfdgh',
                    'reyt',
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'gdjsfglk'
                ]
            },
            {
                id: 'sdgfdsg',
                name: 'Room 4',
                capacity: 200,
                assetsIds: [
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'gdjsfglk'
                ]
            },
            {
                id: 'fghdfgh',
                name: 'Room 5',
                capacity: 200,
                assetsIds: [
                    'fdsgdsg',
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'gdjsfglk'
                ]
            },
            {
                id: 'ertergt',
                name: 'Room 6',
                capacity: 200,
                assetsIds: [
                    'fdsgdsg'
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'gdjsfglk'
                ]
            },
            {
                id: 'fdghfdgh',
                name: 'Room 7',
                capacity: 300,
                assetsIds: [
                    'fdsgdsg'
                ],
                bookingsIds: [
                    'asdfsadf'
                ]
            },
            {
                id: 'ghjgfhj',
                name: 'Room 8',
                capacity: 200,
                assetsIds: [
                    'fdsgdsg'
                ],
                bookingsIds: [
                    'jgkldfs',
                    'dsjhgdfks',
                    'gdjsfglk'
                ]
            },
            {
                id: 'awerawer',
                name: 'Room 9',
                capacity: 100,
                assetsIds: [
                    'fdsgdsg'
                ],
                bookingsIds: [
                    'dfghfdghf'
                ]
            }
        ]
    },
    reducers: {
        setRooms(state, action) {
            state.rooms = action.payload
        },
        addBookingToRoom(state, action){
            state.rooms.find(room => room.id === action.payload.roomId).bookingsIds.push(action.payload.bookingId)
        }
    }
})

export default roomsSlice.reducer
export const { setRooms, addBookingToRoom } = roomsSlice.actions