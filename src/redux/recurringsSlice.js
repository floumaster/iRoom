import { createSlice } from '@reduxjs/toolkit'

const recurringsSlice = createSlice({
    name: 'recurrings',
    initialState: {
        recurrings: [
            {
                id: 'sjkdfasklf',
                value: 'no',
                title: 'No recurring'
            },
            {
                id: 'sdfgdsfg',
                value: 'daily',
                title: 'Daily'
            },
            {
                id: 'jrtyjghjd',
                value: 'inTwoDays',
                title: 'Every two days'
            },
            {
                id: 'rthsrhfgsd',
                value: 'weekly',
                title: 'Weekly'
            },
            {
                id: 'sdfgdfsh',
                value: 'monthly',
                title: 'Monthly'
            },
        ]
    },
    reducers: {
        
    }
})

export default recurringsSlice.reducer
//export const { setAssets } = assetsSlice.actions