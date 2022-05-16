import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AlertConfirm from '../components/AlertConfirm'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewModal from '../components/NewModal'
import NewPerfilForm from '../components/Forms/NewPerfilForm'
import Tables from '../components/Tables/Tables'
import { setEntity } from '../reducer/entityWindowSlice'
import { getDataAsync } from '../reducer/newDataPerfilSlice'
import { removeDataAsync } from '../reducer/newDataPerfilSlice'
import styled from 'styled-components'
import { NotAllowedIcon } from '@chakra-ui/icons'

const NoData = styled.div`
  padding: 10px 20px;
`

function Perfiles() {
  const newData = useSelector((state) => state.newDataPerfil) //Estado de la app en todo momento
  const dispatch = useDispatch() // Set state redux toolkit
  useEffect(() => {
    dispatch(setEntity('perfil'))
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
      <NewModal form={<NewPerfilForm />} />
    </div>
  )
}

export default Perfiles
