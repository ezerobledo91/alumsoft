import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditProveedor from '../components/Forms/Proveedores/EditProveedor'
import NewProveedor from '../components/Forms/Proveedores/NewProveedor'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataProveedor } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'descripcion', 'categoria', 'telefono', 'email']

const Proveedores = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice) //Estado de la app en todo momento

  const { modalState } = dataUi

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataProveedor())
    //Hago la consul  ta a la DB y actualizo el estado de los proveedores
  }, [dispatch, modalState.edit_object])
  return (
    <>
      <Navbar />
      <Header title='Proveedores' />

      {/* Nuevo Proveedor FORM  */}

      <ModalComponent title='Proveedores'>{modalState.edit ? <EditProveedor /> : <NewProveedor />}</ModalComponent>

      {data.proveedores.length > 0 ? (
        <Tabla header={data_titles} data={data.proveedores} title={'proveedor'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default Proveedores
