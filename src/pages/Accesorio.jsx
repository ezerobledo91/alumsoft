import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditAccesorio from '../components/Forms/Accesorios/EditAccesorio'
import NewAccesorio from '../components/Forms/Accesorios/NewAccesorio'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataAccesorio, getProveedorByCategoria } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['codigo','nombre','descripcion', 'categoria', 'unidad', 'proveedor', 'precio']

const Accesorios = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice) //Estado de la app en todo momento

  const { modalState } = dataUi

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataAccesorio())
    dispatch(getProveedorByCategoria('accesorios'))

    //Hago la consul  ta a la DB y actualizo el estado de los vidrios
  }, [dispatch, modalState.edit_object])
  return (
    <>
      <Navbar />
      <Header title='Accesorios' />

      {/* Nuevo Proveedor FORM  */}

      <ModalComponent title='Accesorios'>{modalState.edit ? <EditAccesorio proveedores={data.proveedores}/> : <NewAccesorio proveedores={data.proveedores}/>}</ModalComponent>

      {data.accesorios.length > 0 ? (
        <Tabla header={data_titles} data={data.accesorios} title={'Accesorios'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default Accesorios
