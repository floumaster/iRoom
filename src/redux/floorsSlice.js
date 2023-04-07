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

export default floorsSlice.reducer
//export const { addCategory, editCategory } = categorySlice.actions