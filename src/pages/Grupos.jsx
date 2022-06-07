import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewModal from '../components/NewModal'
import NewGrupoForm from '../components/Forms/NewGrupoForm'
import Tables from '../components/Tables/Tables'
import { setEntity } from '../reducer/entityWindowSlice'
import { getDataAsync } from '../reducer/newDataGrupoSlice'
import { removeDataAsync } from '../reducer/newDataGrupoSlice'
import styled from 'styled-components'
import { NotAllowedIcon } from '@chakra-ui/icons'
import NewGrupoFormEditing from '../components/Forms/NewGrupoFormEditing'
import { update } from '../reducer/selectedPiezasSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

function Grupos() {
  const newData = useSelector((state) => state.newDataGrupo) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit
  const modal = useSelector((state) => state.modal)


  useEffect(() => {
    dispatch(setEntity('grupo'))
    dispatch(getDataAsync())
    modal.name === null &&   dispatch(update())
    console.log('Controlando Modal para Borrar Piezas')
    console.log('Render')
  }, [dispatch, modal])

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
      <NewModal  form= {modal.type === 'new' ? <NewGrupoForm /> : <NewGrupoFormEditing />} />
    </div>
  )
}

export default Grupos
