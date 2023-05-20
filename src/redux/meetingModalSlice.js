import { createSlice } from '@reduxjs/toolkit'

const meetingModalSlice = createSlice({
    name: 'meetingModal',
    initialState: {
        isModalVisible: false,
        bookingContent: null,
    },
    reducers: {
        setIsModalVisible(state, action) {
            state.isModalVisible = action.payload
        },
        setBookingContent(state, action){
            state.bookingContent = action.payload
        },
    }
})

export default meetingModalSlice.reducer
export const { setIsModalVisible, setBookingContent } = meetingModalSlice.actions