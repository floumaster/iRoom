import { createSlice } from '@reduxjs/toolkit'

const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [
            {
                id: 'fdsgdsg',
                dateStart: '2023-01-01T17:00',
                dateEnd: '2023-01-01T18:45',
                userId: '',
                teamId: 'fdsgdsg',
                roomId: 'khagkjfdsflk'
            },
            {
                id: 'asdfsadf',
                dateStart: '2023-01-01T12:00',
                dateEnd: '2023-01-01T14:45',
                userId: '',
                teamId: 'fdghfdgh',
                roomId: 'fdghfdgh'
            },
            {
                id: 'dfghfdghf',
                dateStart: '2023-01-01T10:00',
                dateEnd: '2023-01-01T20:00',
                userId: '',
                teamId: 'cvbncvbn',
                roomId: 'awerawer'
            },
        ]
    },
    // reducers: {
    //     addCategory(state, action) {
    //         state.categories.push(action.payload)
    //     },
    //     editCategory(state, action) {
    //         state.categories = state.categories.map(category => {
    //             if(category.id === action.payload.id){
    //                 return {
    //                     ...category,
    //                     name: action.payload.name,
    //                     color: action.payload.color,
    //                     iconName: action.payload.iconName,
    //                     id: action.payload.id
    //                 }
    //             }
    //             return category
    //         })
    //     }
    // }
})

export default bookingsSlice.reducer
//export const { addCategory, editCategory } = categorySlice.actions