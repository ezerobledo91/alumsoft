import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteCliente, getAllClientes, saveCliente, updateCliente } from '../services/clientes'
import { deletePerfil, getAllPerfiles, savePerfil, updatePerfil } from '../services/perfiles'
import { deleteProveedor, getAllProveedores, saveProveedor, updateProveedor } from '../services/proveedores'

// PROVEEDORES
export const getDataProveedor = createAsyncThunk(
    'DataTables/getDataProveedor',
    async () => {
        const response = await getAllProveedores()
        return response
    }

)

export const saveDataProveedor = createAsyncThunk(
    'DataTables/saveDataProveedor',
    async (payload) => {
        const response = await saveProveedor(payload)
        return response
    }

)

export const removeDataProveedor = createAsyncThunk(
    'DataTables/removeDataProveedor',
    async (payload) => {
        const response = await deleteProveedor(payload)
        return response.id
    }

)

export const updateDataProveedor = createAsyncThunk(
    'DataTables/updateDataProveedor',
    async (payload) => {
        const response = await updateProveedor(payload)
        return response
    }

)
//  CLIENTES
export const getDataCliente = createAsyncThunk(
    'DataTables/getDataCliente',
    async () => {
        const response = await getAllClientes()
        return response
    }

)

export const saveDataCliente = createAsyncThunk(
    'DataTables/saveDataCliente',
    async (payload) => {
        const response = await saveCliente(payload)
        return response
    }

)

export const removeDataCliente = createAsyncThunk(
    'DataTables/removeDataCliente',
    async (payload) => {
        const response = await deleteCliente(payload)
        return response.id
    }

)

export const updateDataCliente = createAsyncThunk(
    'DataTables/updateDataCliente',
    async (payload) => {
        const response = await updateCliente(payload)
        return response
    }

)
// PERFILES

export const getDataPerfil = createAsyncThunk(
    'DataTables/getDataPerfil',
    async () => {
        const response = await getAllPerfiles()
        return response
    }

)

export const saveDataPerfil = createAsyncThunk(
    'DataTables/saveDataPerfil',
    async (payload) => {
        const response = await savePerfil(payload)
        return response
    }

)

export const removeDataPerfil = createAsyncThunk(
    'DataTables/removeDataPerfil',
    async (payload) => {
        const response = await deletePerfil(payload)
        return response.id
    }

)

export const updateDataPerfil = createAsyncThunk(
    'DataTables/updateDataPerfil',
    async (payload) => {
        const response = await updatePerfil(payload)
        return response
    }

)

export const DataTableSlice = createSlice({
    name: 'DataTables',
    initialState: {
        proveedores: [],
        clientes: [],
        perfiles: [],
    },
    reducers: {

    },
    extraReducers: {
        [getDataProveedor.fulfilled]: (state, action) => {
            return {
                ...state,
                proveedores: action.payload
            }
        },
        [saveDataProveedor.fulfilled]: (state, action) => {
            return state

        },
        [removeDataProveedor.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.proveedores.findIndex((item) => item._id === id);
            state.proveedores.splice(index, 1);
        },
        [updateDataProveedor.fulfilled]: (state, action) => {
            state.proveedores.push(action.payload)
        },
        [getDataCliente.fulfilled]: (state, action) => {
            return {
                ...state,
                clientes: action.payload
            }
        },
        [saveDataCliente.fulfilled]: (state, action) => {
            state.clientes.push(action.payload)
        },
        [removeDataCliente.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.clientes.findIndex((item) => item._id === id);
            state.clientes.splice(index, 1);
        },
        [updateDataCliente.fulfilled]: (state, action) => {
            return state

        },
        [getDataPerfil.fulfilled]: (state, action) => {
            return {
                ...state,
                perfiles: action.payload
            }
        },
        [saveDataPerfil.fulfilled]: (state, action) => {
            state.perfiles.push(action.payload)
        },
        [removeDataPerfil.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.perfiles.findIndex((item) => item._id === id);
            state.perfiles.splice(index, 1);
        },
        [updateDataPerfil.fulfilled]: (state, action) => {
            return state
        },

    }

})

export default DataTableSlice.reducer