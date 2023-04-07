import { createSlice } from '@reduxjs/toolkit'

const assetsSlice = createSlice({
    name: 'assets',
    initialState: {
        assets: [
            {
                id: 'fdsgdsg',
                name: 'Mac Lab'
            },
            {
                id: 'sdfgsdfg',
                name: 'PC Lab'
            },
            {
                id: 'fdghfdgh',
                name: 'Projector'
            },
            {
                id: 'reyt',
                name: 'TV'
            },
            {
                id: 'dfghfdgh',
                name: 'Operable walls'
            },
            {
                id: 'cvbncvbn',
                name: 'Whiteboard'
            },
            {
                id: 'xzcvxzcv',
                name: 'Power outlets'
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

export default assetsSlice.reducer
//export const { addCategory, editCategory } = categorySlice.actions