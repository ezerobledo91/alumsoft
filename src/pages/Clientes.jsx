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
import { NotAllowedIcon } from '@chakra-ui/icons'
import styled from 'styled-components'

const NoData = styled.div`
  padding: 10px 20px;
`

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
      {newData.length > 0 ? (
        <Tables list={newData} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
      <AlertConfirm reducer={removeDataAsync} />
      <NewModal form={<NewClienteForm />} />
    </div>
  )
}

export default Clientes
