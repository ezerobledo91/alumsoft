import { configureStore } from '@reduxjs/toolkit'
import alertConfirmSlice from '../reducer/alertConfirmSlice'
import entityContextSlice from '../reducer/entityWindowSlice'
import modalReducer from '../reducer/modalSlice'
import newDataClienteSlice from '../reducer/newDataClienteSlice'
import newDataPerfilSlice from '../reducer/newDataPerfilSlice'
import newDataProveedorSlice from '../reducer/newDataProveedorSlice'
import newDataPiezaSlice from '../reducer/newDataPiezaSlice'
import newDataGrupoSlice from '../reducer/newDataGrupoSlice'
import selectedPiezasSlice from '../reducer/selectedPiezasSlice'



export default configureStore({
  reducer: {
    modal: modalReducer,
    newDataProveedor: newDataProveedorSlice,
    newDataCliente: newDataClienteSlice,
    newDataPerfil: newDataPerfilSlice,
    newDataPieza: newDataPiezaSlice,
    newDataGrupo: newDataGrupoSlice,
    alertConfirm: alertConfirmSlice,
    entityContext: entityContextSlice,
    selectedPiezasSlice: selectedPiezasSlice,
  },
})