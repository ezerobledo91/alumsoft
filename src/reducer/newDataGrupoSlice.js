import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deletePieza, getAllPiezas, savePieza, updatePieza } from '../services/piezas'


export const getDataAsync = createAsyncThunk(
    'newDataPieza/getDataAsync',
    async () => {
        const response = await getAllPiezas()
        return response
    }

)

export const saveDataAsync = createAsyncThunk(
    'newDataPieza/saveDataAsync',
    async (payload) => {
        const response = await savePieza(payload)
        return response
    }

)

export const removeDataAsync = createAsyncThunk(
    'newDataPieza/removeDataAsync',
    async (payload) => {
        const response = await deletePieza(payload)
        return response.id
    }

)

export const updateDataAsyncPieza = createAsyncThunk(
    'newDataPieza/updateDataAsyncPieza',
    async (payload) => {
        const response = await updatePieza(payload)
        return response
    }

)


export const newDataPiezaSlice = createSlice({
    name: 'newDataPieza',
    initialState: [],
    reducers: {

    },
    extraReducers: {
        [getDataAsync.fulfilled]: (state, action) => {
            return action.payload
        },
        [saveDataAsync.fulfilled]: (state, action) => {
            state.push(action.payload)
        },
        [removeDataAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.findIndex((item) => item._id === id);
            state.splice(index, 1);
        },
        [updateDataAsyncPieza.fulfilled]: (state, action) => {
            return state
        },

    }

})

export default newDataPiezaSlice.reducer