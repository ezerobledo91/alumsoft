import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    id: null
}

export const alertConfirmSlice = createSlice({
    name: 'alertConfirm',
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

export const { open, close } = alertConfirmSlice.actions

export default alertConfirmSlice.reducer