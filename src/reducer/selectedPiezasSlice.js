import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    piezas: [],
}

export const selectedPiezasSlice = createSlice({
    name: 'selectedPiezasContext',
    initialState,
    reducers: {
        setPiezas: (state, action) => {
            state.piezas.push(action.payload) // return nuevo objeto creado con el payload
        },
        update: () => {
            return initialState
        },

        remove: (state, action) => {
            const id = action.payload;
            const index = state.piezas.findIndex((item) => item._id === id);
            state.piezas.splice(index, 1);
        }
    },
})

export const { setPiezas, update, remove } = selectedPiezasSlice.actions

export default selectedPiezasSlice.reducer