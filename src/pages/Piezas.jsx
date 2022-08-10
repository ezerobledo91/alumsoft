import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditPieza from '../components/Forms/Piezas/EditPiezas'
import NewPieza from '../components/Forms/Piezas/NewPieza'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import ModalComponentAuxiliar from '../components/ModalAuxiliar'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataPieza } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'perfil', 'descripcion', 'categoria', 'linea', 'variable', 'constante_m', 'cortes']
let data_titles_aux= ['codigo', 'nombre', 'descripcion', 'categoria', 'linea','proveedor','alto','ancho','peso','largo_std','costo_u','precio_u']

const Piezas = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice.modalState) //Estado de la app en todo momento
  const dataModalAux = useSelector((state) => state.UiSlice.modalAux.data_info) //Estado de la app en todo momento

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataPieza())
    //Hago la consul  ta a la DB y actualizo el estado de los proveedores
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Header title='piezas' />

      {/* Nuevo Pieza FORM  */}

      <ModalComponent title='piezas'>{dataUi.edit ? <EditPieza /> : <NewPieza/>}</ModalComponent>

      {data.piezas.length > 0 ? (
        <Tabla header={data_titles} data={data.piezas} title={'piezas'} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}

      {/* Modal Auxiliar  para mostrar perfiles dentro de la tabla   */}
      <ModalComponentAuxiliar title='Perfiles'>
        <Tabla header={data_titles_aux} data={[dataModalAux]} title={'perfiles'} edit={false} />
      </ModalComponentAuxiliar>
    </>
  )
}

export default Piezas
