import { createSlice } from '@reduxjs/toolkit'

const periodSlice = createSlice({
    name: 'period',
    initialState: {
        period: {
            id: 1,
            title: 'Week'
        },
    },
    reducers: {
        setPeriod(state, action) {
            const periodId = action.payload.id
            if(periodId === 0)
                state.period = {
                    id: 0,
                    title: 'Day'
                }
            else if(periodId === 1)
                state.period = {
                    id: 1,
                    title: 'Week'
                }
            else if(periodId === 2)
                state.period = {
                    id: 2,
                    title: 'Month'
                }
        },
    }
})

export default periodSlice.reducer
export const { setPeriod } = periodSlice.actions