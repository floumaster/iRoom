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
                title: 'Once a day'
            },
            {
                id: 'rthsrhfgsd',
                value: 'weekly',
                title: 'Once a week'
            },
            {
                id: 'sdfgdfsh',
                value: 'monthly',
                title: 'Once a month'
            },
            {
                id: 'jrtyjghjd',
                value: 'inTwoDays',
                title: 'Once every two days'
            }
        ]
    },
    reducers: {
        
    }
})

export default recurringsSlice.reducer
//export const { setAssets } = assetsSlice.actions