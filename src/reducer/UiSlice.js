import { createSlice } from "@reduxjs/toolkit";

export const UiSlice = createSlice({
    name: 'UiSlice',
    initialState: {
        modalState: {
            open: false,
            edit: false,
            edit_object: {},
        },
        alertState: false,

    },
    reducers: {
        updateStateModal: (state, action) => {
            state.modalState.open = action.payload
        },
        setEditModal: (state, action) => {
            const {edit, edit_object} = action.payload
            state.modalState.edit = edit
            state.modalState.edit_object = edit_object

        },
    }

})


export const { updateStateModal, setEditModal, setEditObject } = UiSlice.actions
export default UiSlice.reducer