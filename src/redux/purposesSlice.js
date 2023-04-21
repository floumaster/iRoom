import { createSlice } from '@reduxjs/toolkit'

const purposesSlice = createSlice({
    name: 'purposes',
    initialState: {
        purposes: [
            {
                id: 'klasjdffkj',
                value: 'Daily meeting'
            },
            {
                id: 'lksadfkl;',
                value: 'Grooming'
            },
            {
                id: 'kljsdafsdlak',
                value: 'Planing'
            },
            {
                id: 'loiuoiuo',
                value: 'Cat grooming'
            },
        ]
    },
    reducers: {
        createPurpose(state, action) {
            state.purposes.push(action.payload)
        }
    }
})

export default purposesSlice.reducer
export const { createPurpose } = purposesSlice.actions