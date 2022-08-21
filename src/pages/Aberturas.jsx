import { NotAllowedIcon } from '@chakra-ui/icons'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import FilterAndSearch from '../components/FilterAndSearch'
import NewAberturaRefactor from '../components/Forms/Aberturas/NewAbertura'
import NewAberturaEdit from '../components/Forms/Aberturas/NewAberturaEdit'
import Navbar from '../components/Navbar'
import { Container } from '../components/Styled/StyledGenericLayout'
import AberturasTable from '../components/Tables/Aberturas'
import { getDataAccesorio, getDataAbertura } from '../reducer/DataTablesSlice'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'piezas', 'categoria', 'linea', 'accesorios']

const Aberturas = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const [data_edit, setDataEdit] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const dispatch = useDispatch() // Set state redux toolkit
  
  // GET DATOS DE API Y SETEAR EL STATE REDUX
  useEffect(() => {
    dispatch(getDataAbertura())
    dispatch(getDataAccesorio())
  }, [dispatch, data_edit])

  // MOVIMIENTOS ENTRE TABAS CUANDO VAMOS A EDITAR
  useEffect(() => {
    if (data_edit){
      setTabIndex(2)
      return
    }
    setTabIndex(0)
  
  }, [data_edit])

  // CONTROL DE TABS
  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  return (
    <>
      <Navbar />
      <Container>
        <Tabs index={tabIndex} onChange={handleTabsChange}>
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
              <FilterAndSearch />
              {data.aberturas.length > 0 ? (
                <AberturasTable data={data.aberturas} titles={data_titles} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> No existen Datos
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
              <NewAberturaRefactor />
            </TabPanel>
            <TabPanel>
              {data_edit ? (
                <NewAberturaEdit data_edit={data_edit} setDataEdit={setDataEdit}/>
              ) : (
                <NoData>
                  <NotAllowedIcon /> Seleccione una abertura para editar.
                </NoData>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default Aberturas
