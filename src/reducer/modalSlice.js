import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    type: null,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        open: (state, action) => {
            return action.payload // return nuevo objeto creado con el payload
        },
        close: () => {
            return initialState
        },
    },
})

export const { open, close } = modalSlice.actions

export default modalSlice.reducer