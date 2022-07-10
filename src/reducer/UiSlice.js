import { createSlice } from "@reduxjs/toolkit";

export const UiSlice = createSlice({
    name: 'UiSlice',
    initialState: {
        modalState: {
            open: false,
            edit: false,
            edit_object: {},

        },
        alertState: false,
        modalAux: {
            open: false,
            data_info: [],
            data_selected:[],
            select: false,
        },
        previewPres: {
            data:[],
            
        }

    },
    reducers: {
        updateStateModal: (state, action) => {
            state.modalState.open = action.payload
        },
        setEditModal: (state, action) => {
            const { edit, edit_object } = action.payload
            state.modalState.edit = edit
            state.modalState.edit_object = edit_object

        },
        setDataInfo: (state, action) => {
            const { open, data_info ,select=false } = action.payload
            state.modalAux.data_info = data_info
            state.modalAux.select = select
            state.modalAux.open = open
        },
        removeDataSelected: (state, action) => {
            const id = action.payload;
            const index = state.modalAux.data_selected.findIndex((item) => item._id === id);
            state.modalAux.data_selected.splice(index, 1);
        },
        setDataSelected: (state, action) => {
            const item = action.payload;
            state.modalAux.data_selected.push(item);
        },
        removeAllSelected: (state, action) => {
            state.modalAux.data_selected= [];
        },
        setDataPreview: (state, action) => {
            const {data,abertura, medidas, peso_total, precio_total} = action.payload 
             state.previewPres.data.push({data:data, abertura: abertura, medidas: medidas, peso_total: peso_total, precio_total: precio_total});
        },

    }

})


export const { removeAllSelected,updateStateModal, setEditModal,setDataSelected, setEditObject, setDataInfo, removeDataSelected,setDataPreview } = UiSlice.actions
export default UiSlice.reducer