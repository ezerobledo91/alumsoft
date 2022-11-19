import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteAccesorio, getAllAccesorios, saveAccesorio, updateAccesorio, updateAccesorioLote } from '../services/accesorios'
import { deleteCliente, getAllClientes, saveCliente, updateCliente } from '../services/clientes'
import { deleteAbertura, getAllAberturas, saveAbertura, updateAbertura } from '../services/aberturas'
import { deletePerfil, getAllPerfiles, savePerfil, updatePerfil } from '../services/perfiles'
import { deletePieza, getAllPiezas, savePieza, updatePieza } from '../services/piezas'
import { deletePresupuesto, getAllPresupuestos, savePresupuesto, updatePresupuesto } from '../services/presupuestos'
import { deleteProveedor, getAllProveedores, getByCategoria, saveProveedor, updateProveedor } from '../services/proveedores'
import { saveVidrio, getAllVidrios, deleteVidrio, updateVidrio, updateVidrioLote } from '../services/vidrios'

// PROVEEDORES
export const getDataProveedor = createAsyncThunk(
    'DataTables/getDataProveedor',
    async () => {
        const response = await getAllProveedores()
        return response
    }

)

export const getProveedorByCategoria = createAsyncThunk(
    'DataTables/getProveedorByCategoria',
    async (payload) => {
        const response = await getByCategoria(payload)
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
// Aberturas / Aberturas
export const getDataAbertura = createAsyncThunk(
    'DataTables/getDataAbertura',
    async () => {
        const response = await getAllAberturas()
        return response
    }

)

export const saveDataAbertura = createAsyncThunk(
    'DataTables/saveDataAbertura',
    async (payload) => {
        const response = await saveAbertura(payload)
        return response
    }

)

export const removeDataAbertura = createAsyncThunk(
    'DataTables/removeDataAbertura',
    async (payload) => {
        const response = await deleteAbertura(payload)
        return response.id
    }

)

export const updateDataAbertura = createAsyncThunk(
    'DataTables/updateDataAbertura',
    async (payload) => {
        const response = await updateAbertura(payload)
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

export const getDataPresupuesto = createAsyncThunk(
    'DataTables/getDataPresupuesto',
    async () => {
        const response = await getAllPresupuestos()
        return response
    }

)

export const removeDataPresupuesto = createAsyncThunk(
    'DataTables/removeDataPresupuesto',
    async (payload) => {
        const response = await deletePresupuesto(payload)
        return response.id
    }

)

export const updateDataPresupuesto = createAsyncThunk(
    'DataTables/updateDataPresupuesto',
    async (payload) => {
        const response = await updatePresupuesto(payload)
        return response
    }

)

// Vidrios
export const saveDataVidrio = createAsyncThunk(
    'DataTables/saveDataVidrio',
    async (payload) => {
        const response = await saveVidrio(payload)
        return response
    }

)

export const getDataVidrio = createAsyncThunk(
    'DataTables/getDataVidrio',
    async () => {
        const response = await getAllVidrios()
        return response
    }

)

export const removeDataVidrio = createAsyncThunk(
    'DataTables/removeDataVidrio',
    async (payload) => {
        const response = await deleteVidrio(payload)
        return response.id
    }

)

export const updateDataVidrio = createAsyncThunk(
    'DataTables/updateDataVidrio',
    async (payload) => {
        const response = await updateVidrio(payload)
        return response
    }

)
export const updateDataVidrioAll = createAsyncThunk(
    'DataTables/updateDataVidrioAll',
    async (payload) => {
        const response = await updateVidrioLote(payload)
        return response
    }

)

// Accesorios
export const saveDataAccesorio = createAsyncThunk(
    'DataTables/saveDataAccesorio',
    async (payload) => {
        const response = await saveAccesorio(payload)
        return response
    }

)

export const getDataAccesorio = createAsyncThunk(
    'DataTables/getDataAccesorio',
    async () => {
        const response = await getAllAccesorios()
        return response
    }

)

export const removeDataAccesorio = createAsyncThunk(
    'DataTables/removeDataAccesorio',
    async (payload) => {
        const response = await deleteAccesorio(payload)
        return response.id
    }

)

export const updateDataAccesorio = createAsyncThunk(
    'DataTables/updateDataAccesorio',
    async (payload) => {
        const response = await updateAccesorio(payload)
        return response
    }
)


export const updateDataAccesorioAll = createAsyncThunk(
    'DataTables/updateDataAccesorioAll',
    async (payload) => {
        const response = await updateAccesorioLote(payload)
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
        aberturas: [],
        presupuestos: [],
        vidrios: [],
        accesorios: []

    },
    reducers: {
        filterPresupuesto: (state, action) => {
            const busqueda  = action.payload

            // state.presupuestos.filter((presupuesto) => presupuesto.numero === busqueda)
            // if(resultado){
                //     return resultado
                // }
                // return []
        },

    },
    extraReducers: {
        [getDataProveedor.fulfilled]: (state, action) => {
            return {
                ...state,
                proveedores: action.payload
            }
        },
        [getProveedorByCategoria.fulfilled]: (state, action) => {
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
        [getDataAbertura.fulfilled]: (state, action) => {
            return {
                ...state,
                aberturas: action.payload
            }
        },
        [saveDataAbertura.fulfilled]: (state, action) => {
            state.aberturas.push(action.payload)
        },
        [removeDataAbertura.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.aberturas.findIndex((item) => item._id === id);
            state.aberturas.splice(index, 1);
        },
        [updateDataAbertura.fulfilled]: (state, action) => {
            return state
        },
        [saveDataPresupuesto.fulfilled]: (state, action) => {
            state.presupuestos.push(action.payload)
        },
        [getDataPresupuesto.fulfilled]: (state, action) => {
            return {
                ...state,
                presupuestos: action.payload
            }
        },
        [removeDataPresupuesto.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.presupuestos.findIndex((item) => item._id === id);
            state.presupuestos.splice(index, 1);
        },
        [updateDataPresupuesto.fulfilled]: (state, action) => {
            return state
        },
        [saveDataVidrio.fulfilled]: (state, action) => {
            state.vidrios.push(action.payload)
        },
        [getDataVidrio.fulfilled]: (state, action) => {
            return {
                ...state,
                vidrios: action.payload
            }
        },
        [removeDataVidrio.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.vidrios.findIndex((item) => item._id === id);
            state.vidrios.splice(index, 1);
        },
        [updateDataVidrio.fulfilled]: (state, action) => {
            return state
        },
        [updateDataVidrioAll.fulfilled]: (state, action) => {
            return state
        },
        [saveDataAccesorio.fulfilled]: (state, action) => {
            state.accesorios.push(action.payload)
        },
        [getDataAccesorio.fulfilled]: (state, action) => {
            return {
                ...state,
                accesorios: action.payload
            }
        },
        [removeDataAccesorio.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.accesorios.findIndex((item) => item._id === id);
            state.accesorios.splice(index, 1);
        },
        [updateDataAccesorio.fulfilled]: (state, action) => {
            return state
        },
        [updateDataAccesorioAll.fulfilled]: (state, action) => {
            return state
        },
    }

})

export const {filterPresupuesto  } = DataTableSlice.actions

export default DataTableSlice.reducer