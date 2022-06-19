import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditCliente from '../components/Forms/Clientes/EditCliente'
import NewCliente from '../components/Forms/Clientes/NewCliente'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataCliente } from '../reducer/DataTablesSlice'


const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'descripcion', 'telefono', 'email', 'direccion']

const Clientes = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice) //Estado de la app en todo momento

  const { modalState } = dataUi

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataCliente())
    //Hago la consul  ta a la DB y actualizo el estado de los proveedores
  }, [dispatch, modalState.edit_object])
  return (
    <>
      <Navbar />
      <Header title='Clientes' />

      {/* Nuevo Proveedor FORM  */}

      <ModalComponent title='Clientes'>{modalState.edit ? <EditCliente/> : <NewCliente/> }</ModalComponent>

      {data.clientes.length > 0 ? (
        <Tabla header={data_titles} data={data.clientes} title={'cliente'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default Clientes
