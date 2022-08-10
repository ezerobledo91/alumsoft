import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditVidrio from '../components/Forms/Vidrios/EditVidrio'
import NewVidrio from '../components/Forms/Vidrios/NewVidrio'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataVidrio } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'categoria', 'espesor', 'proveedor', 'precio']

const Vidrios = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice) //Estado de la app en todo momento

  const { modalState } = dataUi

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataVidrio())
    //Hago la consul  ta a la DB y actualizo el estado de los vidrios
  }, [dispatch, modalState.edit_object])
  return (
    <>
      <Navbar />
      <Header title='Vidrios' />

      {/* Nuevo Proveedor FORM  */}

      <ModalComponent title='Vidrios'>{modalState.edit ? <EditVidrio/> : <NewVidrio/>}</ModalComponent>

      {data.vidrios.length > 0 ? (
        <Tabla header={data_titles} data={data.vidrios} title={'Vidrios'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default Vidrios
