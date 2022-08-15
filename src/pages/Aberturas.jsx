import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditAberturas from '../components/Forms/Aberturas/EditAbertura'
import NewAbertura from '../components/Forms/Aberturas/NewAbertura'
import Header from '../components/Header'
import ModalComponent from '../components/Modal'
import ModalComponentAuxiliar from '../components/ModalAuxiliar'
import Navbar from '../components/Navbar'
import Tabla from '../components/Tables/Tabla'
import { getDataAccesorio, getDataAbertura } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'piezas', 'categoria', 'linea', 'accesorios']
let data_titles_aux = ['nombre', 'perfil', 'descripcion', 'categoria', 'linea', 'variable', 'constante_m', 'cortes']

const Aberturas = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice.modalState) //Estado de la app en todo momento
  const dataModalAux = useSelector((state) => state.UiSlice.modalAux.data_info) //Estado de la app en todo momento

  const dispatch = useDispatch() // Set state redux toolkit
  useEffect(() => {
    dispatch(getDataAbertura())
    dispatch(getDataAccesorio())
  }, [dispatch,dataUi])

  return (
    <>
      <Navbar />
      <Header title='aberturas' />

      {/* Nuevo Pieza FORM  */}

      <ModalComponent title='aberturas'>{dataUi.edit ? <EditAberturas accesorios={data.accesorios}/> : <NewAbertura accesorios={data.accesorios}/>}</ModalComponent>

      {data.aberturas.length > 0 ? (
        <Tabla header={data_titles} data={data.aberturas} title={'aberturas'}/>
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}

      {/* Modal Auxiliar  para mostrar perfiles dentro de la tabla   */}
      <ModalComponentAuxiliar title='Piezas'>
        <Tabla header={data_titles_aux} data={dataModalAux} title={'piezas'} edit={false} />
      </ModalComponentAuxiliar>
    </>
  )
}

export default Aberturas
