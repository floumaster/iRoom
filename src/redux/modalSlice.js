import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalVisible: true,
        modalContent: null,
        onSubmit: () => {},
        isSubmitDisabled: true,
    },
    reducers: {
        setIsModalVisible(state, action) {
            state.isModalVisible = action.payload
        },
        setModalContent(state, action){
            state.modalContent = action.payload
        },
        setIsSubmitDisabled(state, action){
            state.isSubmitDisabled = action.payload
        },
        setOnSubmitFunk(state, action){
            state.onSubmit = action.payload
        },
    }
})

export default modalSlice.reducer
export const { setIsModalVisible, setModalContent, setIsSubmitDisabled, setOnSubmitFunk } = modalSlice.actions