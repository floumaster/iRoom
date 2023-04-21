import { createSlice } from '@reduxjs/toolkit'

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [
            {
                id: 'fdsgdsg',
                dates: [
                    '2023-01-01'
                ],
                timeStart: '17:00',
                timeEnd: '18:45',
                userId: '',
                teamId: 'fdsgdsg',
                roomId: 'khagkjfdsflk',
                description: '',
                purposeId: 'loiuoiuo',
                title: 'kekw'
            },
            {
                id: 'asdfsadf',
                dates: [
                    '2023-01-01'
                ],
                timeStart: '12:00',
                timeEnd: '14:45',
                userId: '',
                teamId: 'fdghfdgh',
                roomId: 'fdghfdgh',
                description: '',
                purposeId: 'klasjdffkj',
                title: 'sdkf'
            },
            {
                id: 'dfghfdghf',
                dates: [
                    '2023-01-01'
                ],
                timeStart: '08:00',
                timeEnd: '21:00',
                userId: '',
                teamId: 'cvbncvbn',
                roomId: 'awerawer',
                description: '',
                purposeId: 'kljsdafsdlak',
                title: 'lwekjr'
            },
        ]
    },
    reducers: {
        addBooking(state, action) {
            state.bookings.push(action.payload)
        },
        editBooking(state, action){
            state.bookings = state.bookings.map(booking => {
                if(booking.id === action.payload.id)
                    return action.payload
                else
                    return booking
            })
        }
    }
})

export default bookingsSlice.reducer
export const { addBooking, editBooking } = bookingsSlice.actions