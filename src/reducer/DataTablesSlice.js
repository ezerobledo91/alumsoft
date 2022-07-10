import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteCliente, getAllClientes, saveCliente, updateCliente } from '../services/clientes'
import { deleteGrupo, getAllGrupos, saveGrupo, updateGrupo } from '../services/grupos'
import { deletePerfil, getAllPerfiles, savePerfil, updatePerfil } from '../services/perfiles'
import { deletePieza, getAllPiezas, savePieza, updatePieza } from '../services/piezas'
import { savePresupuesto } from '../services/presupuestos'
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

// PIEZAS 

export const getDataPieza = createAsyncThunk(
    'DataTables/getDataPieza',
    async () => {
        const response = await getAllPiezas()
        return response
    }

)

export const saveDataPieza = createAsyncThunk(
    'DataTables/saveDataPieza',
    async (payload) => {
        const response = await savePieza(payload)
        return response
    }

)

export const removeDataPieza = createAsyncThunk(
    'DataTables/removeDataPiza',
    async (payload) => {
        const response = await deletePieza(payload)
        return response.id
    }

)

export const updateDataPieza = createAsyncThunk(
    'DataTables/updateDataPieza',
    async (payload) => {
        const response = await updatePieza(payload)
        return response
    }

)
// Grupos / Aberturas
export const getDataGrupo = createAsyncThunk(
    'DataTables/getDataGrupo',
    async () => {
        const response = await getAllGrupos()
        return response
    }

)

export const saveDataGrupo = createAsyncThunk(
    'DataTables/saveDataGrupo',
    async (payload) => {
        const response = await saveGrupo(payload)
        return response
    }

)

export const removeDataGrupo = createAsyncThunk(
    'DataTables/removeDataGrupo',
    async (payload) => {
        const response = await deleteGrupo(payload)
        return response.id
    }

)

export const updateDataGrupo = createAsyncThunk(
    'DataTables/updateDataGrupo',
    async (payload) => {
        const response = await updateGrupo(payload)
        return response
    }

)

// Presupuestos
export const saveDataPresupuesto = createAsyncThunk(
    'DataTables/saveDataPresupuesto',
    async (payload) => {
        const response = await savePresupuesto(payload)
        return response
    }

)





export const DataTableSlice = createSlice({
    name: 'DataTables',
    initialState: {
        proveedores: [],
        clientes: [],
        perfiles: [],
        piezas: [],
        grupos: [],
        presupuestos:[],

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
        [getDataPieza.fulfilled]: (state, action) => {
            return {
                ...state,
                piezas: action.payload
            }
        },
        [saveDataPieza.fulfilled]: (state, action) => {
            state.piezas.push(action.payload)
        },
        [removeDataPieza.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.piezas.findIndex((item) => item._id === id);
            state.piezas.splice(index, 1);
        },
        [updateDataPieza.fulfilled]: (state, action) => {
            return state
        },
        [getDataGrupo.fulfilled]: (state, action) => {
            return {
                ...state,
                grupos: action.payload
            }
        },
        [saveDataGrupo.fulfilled]: (state, action) => {
            state.grupos.push(action.payload)
        },
        [removeDataGrupo.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.grupos.findIndex((item) => item._id === id);
            state.grupos.splice(index, 1);
        },
        [updateDataGrupo.fulfilled]: (state, action) => {
            return state
        },
        [saveDataPresupuesto.fulfilled]: (state, action) => {
            state.presupuestos.push(action.payload)
        },

    }

})

export default DataTableSlice.reducer