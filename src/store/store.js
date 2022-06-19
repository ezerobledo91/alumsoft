import { configureStore } from '@reduxjs/toolkit'
import DataTablesSlice from '../reducer/DataTablesSlice'
import UiSlice from '../reducer/UiSlice'



export default configureStore({
  reducer: {
    DataTables: DataTablesSlice,
    UiSlice: UiSlice

  },
})