import { createSlice } from '@reduxjs/toolkit'

const timesSlice = createSlice({
    name: 'floors',
    initialState: {
        times: [
            {
                id: 'asdhj',
                title: 8,
                time: 8,
            },
            {
                id: 'asdhj1',
                title: 9,
                time: 9,
            },
            {
                id: 'asdhj2',
                title: 10,
                time: 10,
            },
            {
                id: 'asdhj3',
                title: 11,
                time: 11,
            },
            {
                id: 'asdhj4',
                title: 12,
                time: 12,
            },
            {
                id: 'asdhj5',
                title: 13,
                time: 13,
            },
            {
                id: 'asdhj6',
                title: 14,
                time: 14,
            },
            {
                id: 'sfgh',
                title: 15,
                time: 15,
            },
            {
                id: 'weqf',
                title: 16,
                time: 16,
            },
            {
                id: 'fghdf',
                title: 17,
                time: 17,
            },
            {
                id: 'asdf',
                title: 18,
                time: 18,
            },
            {
                id: 'zegr',
                title: 19,
                time: 19,
            },
            {
                id: 'asfd',
                title: 20,
                time: 20,
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

export default timesSlice.reducer
//export const { addCategory, editCategory } = categorySlice.actions