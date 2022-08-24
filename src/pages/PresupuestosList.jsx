import { NotAllowedIcon } from '@chakra-ui/icons'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import TablaPresupuestos from '../components/Tables/TablaPresupuestos'
import { getDataPresupuesto } from '../reducer/DataTablesSlice'
import { Container } from '../components/Styled/StyledGenericLayout'
import FilterAndSearch from '../components/FilterAndSearch'
import Presupuestos from '../components/Forms/Presupuestos/Presupuestos'

const NoData = styled.div`
  padding: 10px 20px;
`
let data_titles = ['numero', 'cliente', 'observacion', 'precio', 'fecha']
const PresupuestosList = () => {
  const data = useSelector((state) => state.DataTables)
  const dispatch = useDispatch()
  const [data_edit, setDataEdit] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  
  // GET DATOS DE API Y SETEAR EL STATE REDUX
  useEffect(() => {
    dispatch(getDataPresupuesto())
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
              Presupuestos
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Nuevo
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Editar
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FilterAndSearch />
              {data.presupuestos.length > 0 ? (
                <TablaPresupuestos data={data.presupuestos} titles={data_titles} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> No existen Datos
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
              <Presupuestos/>
            </TabPanel>
            <TabPanel>
              {/* {data_edit ? (
                <NewAberturaEdit data_edit={data_edit} setDataEdit={setDataEdit}/>
              ) : (
                <NoData>
                  <NotAllowedIcon /> Seleccione una abertura para editar.
                </NoData>
              )} */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default PresupuestosList
