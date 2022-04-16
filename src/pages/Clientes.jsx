import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewClienteForm from '../components/NewClienteForm'
import NewModal from '../components/NewModal'
import Tables from '../components/Tables'
import { removeDataAsync } from '../reducer/newDataClienteSlice'

function Clientes() {
  const newData = useSelector((state) => state.newDataCliente) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    // dispatch(getDataAsync())
    console.log('Render')
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <HeadTable name='Clientes' />
      <Tables list={newData} type='cliente' />
      <AlertConfirm type='cliente' reducer={removeDataAsync} />
      <NewModal name='Cliente' form={<NewClienteForm />} />
    </div>
  )
}

export default Clientes
