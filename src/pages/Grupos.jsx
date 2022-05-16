import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewModal from '../components/NewModal'
import NewPiezaForm from '../components/Forms/NewPiezaForm'
import Tables from '../components/Tables/Tables'
import { setEntity } from '../reducer/entityWindowSlice'
import { getDataAsync } from '../reducer/newDataPiezaSlice'
import { removeDataAsync } from '../reducer/newDataPiezaSlice'
import styled from 'styled-components'
import { NotAllowedIcon } from '@chakra-ui/icons'

const NoData = styled.div`
  padding: 10px 20px;
`

function Piezas() {
  const newData = useSelector((state) => state.newDataPieza) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit
  useEffect(() => {
    dispatch(setEntity('pieza'))
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
      <NewModal form={<NewPiezaForm />} />
    </div>
  )
}

export default Piezas
