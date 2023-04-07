import { createSlice } from '@reduxjs/toolkit'

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: [
            {
                id: 'fdsgdsg',
                name: 'Team Auditdata',
                color: '#eb4034'
            },
            {
                id: 'sdfgsdfg',
                name: 'Team Spin',
                color: '#f0cd32'
            },
            {
                id: 'fdghfdgh',
                name: 'Team Projector',
                color: '#5fed34'
            },
            {
                id: 'reyt',
                name: 'Team TV',
                color: '#34ceed'
            },
            {
                id: 'dfghfdgh',
                name: 'Team Operable walls',
                color: '#34eda3'
            },
            {
                id: 'cvbncvbn',
                name: 'Team Whiteboard',
                color: '#ed34c8'
            },
            {
                id: 'xzcvxzcv',
                name: 'Team Power outlets',
                color: '#3456ed'
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

export default teamsSlice.reducer
//export const { addCategory, editCategory } = categorySlice.actions