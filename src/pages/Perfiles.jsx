import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewModal from '../components/NewModal'
import NewProveedorForm from '../components/Forms/NewProveedorForm'
import Tables from '../components/Tables/Tables'
import { setEntity } from '../reducer/entityWindowSlice'
import { getDataAsync } from '../reducer/newDataProveedorSlice'
import { removeDataAsync } from '../reducer/newDataProveedorSlice'

function Perfiles() {
  // const newData = useSelector((state) => state.newDataProveedor) //Estado de la app en todo momento
  // const dispatch = useDispatch() // Set state redux toolkit
  // useEffect(() => {
  //   dispatch(setEntity('proveedor'))
  //   dispatch(getDataAsync())
  //   console.log('Render')
  // }, [dispatch])

  return (
    <div>
      <Navbar />
      <HeadTable />
      <Tables list={newData} />
      <AlertConfirm reducer={removeDataAsync} />
      <NewModal form={<NewProveedorForm />} />
    </div>
  )
}

export default Perfiles
