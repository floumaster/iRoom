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
    reducers: {
        createAsset(state, action) {
            state.assets.push(action.payload)
        }
    }
})

export default assetsSlice.reducer
export const { createAsset } = assetsSlice.actions