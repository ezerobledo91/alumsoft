import { NotAllowedIcon } from '@chakra-ui/icons'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import NewAberturaRefactor from '../components/Forms/Aberturas/NewAberturaRefactor'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { Container } from '../components/Styled/StyledGenericLayout'
import Tabla from '../components/Tables/Tabla'
import { getDataAccesorio, getDataAbertura } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'piezas', 'categoria', 'linea', 'accesorios']

const Aberturas = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const dataUi = useSelector((state) => state.UiSlice.modalState) //Estado de la app en todo momento

  const dispatch = useDispatch() // Set state redux toolkit
  useEffect(() => {
    dispatch(getDataAbertura())
    dispatch(getDataAccesorio())
  }, [dispatch, dataUi])

  return (
    <>
      <Navbar />
      <Container>
        <Tabs>
          <TabList>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Aberturas
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Nueva
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Editar
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Header title='aberturas' />
              {data.aberturas.length > 0 ? (
                <Tabla header={data_titles} data={data.aberturas} title={'aberturas'} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> No existen Datos
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
              <NewAberturaRefactor />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      {/* Modal Auxiliar  para mostrar perfiles dentro de la tabla   */}
        {/* <ModalComponentAuxiliar title='Piezas'>
          <Tabla header={data_titles_aux} data={dataModalAux} title={'piezas'} edit={false} />
        </ModalComponentAuxiliar> */}
    </>
  )
}

export default Aberturas
