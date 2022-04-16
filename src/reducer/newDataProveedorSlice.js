import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteProveedor, getAllProveedores, saveProveedor } from '../services/proveedores'


export const getDataAsync = createAsyncThunk(
    'newDataProveedor/getDataAsync',
    async () => {
        const response = await getAllProveedores()
        return response
    }

)

export const saveDataAsync = createAsyncThunk(
    'newDataProveedor/saveDataAsync',
    async (payload) => {
        const response = await saveProveedor(payload)
        return response
    }

)

export const removeDataAsync = createAsyncThunk(
    'newDataProveedor/removeDataAsync',
    async (payload) => {
        const response = await deleteProveedor(payload)
        return response.id
    }

)


export const newDataProveedorSlice = createSlice({
    name: 'newDataProveedor',
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
        }
    }

})

export default newDataProveedorSlice.reducer