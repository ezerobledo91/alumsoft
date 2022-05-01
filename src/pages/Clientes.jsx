import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewClienteForm from '../components/Forms/NewClienteForm'
import NewModal from '../components/NewModal'
import Tables from '../components/Tables/Tables'
import { setEntity } from '../reducer/entityWindowSlice'
import { getDataAsync, removeDataAsync } from '../reducer/newDataClienteSlice'

function Clientes() {
  const newData = useSelector((state) => state.newDataCliente) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(setEntity('cliente'))
    dispatch(getDataAsync())
    console.log('Render')
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <HeadTable />
      <Tables list={newData}/>
      <AlertConfirm reducer={removeDataAsync} />
      <NewModal form={<NewClienteForm />} />
    </div>
  )
}

export default Clientes
