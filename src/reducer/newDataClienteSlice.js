import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteCliente, getAllClientes, saveCliente, updateCliente } from '../services/clientes'


export const getDataAsync = createAsyncThunk(
    'newDataCliente/getDataAsync',
    async () => {
        const response = await getAllClientes()
        return response
    }

)

export const saveDataAsync = createAsyncThunk(
    'newDataCliente/saveDataAsync',
    async (payload) => {
        const response = await saveCliente(payload)
        return response
    }

)

export const removeDataAsync = createAsyncThunk(
    'newDataCliente/removeDataAsync',
    async (payload) => {
        const response = await deleteCliente(payload)
        return response.id
    }

)


export const updateDataAsyncCliente = createAsyncThunk(
    'newDataCliente/updateDataAsync',
    async (payload) => {
        const response = await updateCliente(payload)
        return response
    }

)

export const newDataClienteSlice = createSlice({
    name: 'newDataCliente',
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
        [updateDataAsyncCliente.fulfilled]: (state, action) => {
            return state
        }
    }

})

export default newDataClienteSlice.reducer