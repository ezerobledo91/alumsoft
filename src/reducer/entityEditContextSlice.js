import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    values: {}
}

export const entityEditContextSlice = createSlice({
    name: 'entityEditContext',
    initialState,
    reducers: {
        setObject: (state, action) => {
            state.values = action.payload // return nuevo objeto creado con el payload
        },
        update: () => {
            return initialState
        },
    },
})

export const { setObject, update } = entityEditContextSlice.actions

export default entityEditContextSlice.reducer