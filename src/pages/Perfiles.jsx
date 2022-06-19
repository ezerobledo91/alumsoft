import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditPerfil from '../components/Forms/Perfiles/EditPerfil'
import NewPerfil from '../components/Forms/Perfiles/NewPerfil'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataPerfil } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['codigo', 'nombre', 'descripcion', 'categoria', 'linea','proveedor','alto','ancho','peso','largo_std','costo_u','precio_u']

const Perfiles = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice) //Estado de la app en todo momento

  const { modalState } = dataUi

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataPerfil())
    //Hago la consul  ta a la DB y actualizo el estado de los proveedores
  }, [dispatch, modalState.edit_object])
  return (
    <>
      <Navbar />
      <Header title='Perfiles' />

      {/* Nuevo Proveedor FORM  */}

      <ModalComponent title='Perfiles'>{modalState.edit ? <EditPerfil/> : <NewPerfil/>}</ModalComponent>

      {data.perfiles.length > 0 ? (
        <Tabla header={data_titles} data={data.perfiles} title={'perfiles'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default Perfiles
