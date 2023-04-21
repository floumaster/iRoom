import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const dateSlice = createSlice({
    name: 'date',
    initialState: {
        date: moment()
    },
    reducers: {
        editDate(state, action) {
            state.date = action.payload.date
        },
    }
})

export default dateSlice.reducer
export const { editDate } = dateSlice.actions