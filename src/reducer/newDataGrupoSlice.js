import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteGrupo, getAllGrupos, saveGrupo, updateGrupo } from '../services/grupos'


export const getDataAsync = createAsyncThunk(
    'newDataGrupo/getDataAsync',
    async () => {
        const response = await getAllGrupos()
        return response
    }

)

export const saveDataAsync = createAsyncThunk(
    'newDataGrupo/saveDataAsync',
    async (payload) => {
        const response = await saveGrupo(payload)
        return response
    }

)

export const removeDataAsync = createAsyncThunk(
    'newDataGrupo/removeDataAsync',
    async (payload) => {
        const response = await deleteGrupo(payload)
        return response.id
    }

)

export const updateDataAsyncGrupo = createAsyncThunk(
    'newDataGrupo/updateDataAsyncGrupo',
    async (payload) => {
        const response = await updateGrupo(payload)
        return response
    }

)


export const newDataGrupoSlice = createSlice({
    name: 'newDataGrupo',
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
        [updateDataAsyncGrupo.fulfilled]: (state, action) => {
            return state
        },

    }

})

export default newDataGrupoSlice.reducer