import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    entity: null,
    title: null
}

export const entityContextSlice = createSlice({
    name: 'entityContext',
    initialState,
    reducers: {
        setEntity: (state, action) => {
            state.entity = action.payload // return nuevo objeto creado con el payload
        },
        update: () => {
            return initialState
        },
    },
})

export const { setEntity, update } = entityContextSlice.actions

export default entityContextSlice.reducer