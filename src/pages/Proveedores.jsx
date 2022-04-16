import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewModal from '../components/NewModal'
import NewProveedorForm from '../components/NewProveedorForm'
import Tables from '../components/Tables'
import { getDataAsync } from '../reducer/newDataProveedorSlice'
import { removeDataAsync } from '../reducer/newDataProveedorSlice'

function Proveedores() {
  const newData = useSelector((state) => state.newDataProveedor) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataAsync())
    console.log('Render')
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <HeadTable name='Proveedores' />
      <Tables list={newData} type='proveedor' />
      <AlertConfirm type='proveedor' reducer={removeDataAsync} />
      <NewModal name='Proveedor' form={<NewProveedorForm />} />
    </div>
  )
}

export default Proveedores
