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
import { getDataGrupo } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'piezas', 'categoria', 'modelo', 'accesorios', 'revestimiento', 'adicionales']
let data_titles_aux = ['nombre', 'perfil', 'descripcion', 'categoria', 'modelo', 'variable', 'constante_m', 'cortes']

const Aberturas = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice.modalState) //Estado de la app en todo momento
  const dataModalAux = useSelector((state) => state.UiSlice.modalAux.data_info) //Estado de la app en todo momento

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataGrupo())
  }, [dispatch,dataUi])

  return (
    <>
      <Navbar />
      <Header title='aberturas' />

      {/* Nuevo Pieza FORM  */}

      <ModalComponent title='aberturas'>{dataUi.edit ? <EditAberturas/> : <NewAbertura />}</ModalComponent>

      {data.grupos.length > 0 ? (
        <Tabla header={data_titles} data={data.grupos} title={'aberturas'}/>
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
