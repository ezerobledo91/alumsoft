import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deletePerfil, getAllPerfiles, savePerfil, updatePerfil } from '../services/perfiles'


export const getDataAsync = createAsyncThunk(
    'newDataPerfil/getDataAsync',
    async () => {
        const response = await getAllPerfiles()
        return response
    }

)

export const saveDataAsync = createAsyncThunk(
    'newDataPerfil/saveDataAsync',
    async (payload) => {
        const response = await savePerfil(payload)
        return response
    }

)

export const removeDataAsync = createAsyncThunk(
    'newDataPerfil/removeDataAsync',
    async (payload) => {
        const response = await deletePerfil(payload)
        return response.id
    }

)

export const updateDataAsyncPerfil = createAsyncThunk(
    'newDataPerfil/updateDataAsyncPerfil',
    async (payload) => {
        const response = await updatePerfil(payload)
        return response
    }

)


export const newDataPerfilSlice = createSlice({
    name: 'newDataPerfil',
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
        [updateDataAsyncPerfil.fulfilled]: (state, action) => {
            return state
        },

    }

})

export default newDataPerfilSlice.reducer