import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isModalVisible: false,
        modalContent: null,
        onSubmit: () => {},
        isSubmitDisabled: true,
        title: ''
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
        setModalTitle(state, action){
            state.title = action.payload
        },
    }
})

export default modalSlice.reducer
export const { setIsModalVisible, setModalContent, setIsSubmitDisabled, setOnSubmitFunk, setModalTitle } = modalSlice.actions