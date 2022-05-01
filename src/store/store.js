import { configureStore } from '@reduxjs/toolkit'
import alertConfirmSlice from '../reducer/alertConfirmSlice'
import entityContextSlice from '../reducer/entityWindowSlice'
import modalReducer from '../reducer/modalSlice'
import newDataClienteSlice from '../reducer/newDataClienteSlice'
import newDataProveedorSlice from '../reducer/newDataProveedorSlice'


export default configureStore({
  reducer: {
    modal: modalReducer,
    newDataProveedor: newDataProveedorSlice,
    newDataCliente: newDataClienteSlice,
    alertConfirm: alertConfirmSlice,
    entityContext: entityContextSlice,
  },
})