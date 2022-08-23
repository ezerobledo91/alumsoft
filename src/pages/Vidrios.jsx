import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { getDataVidrio } from '../reducer/DataTablesSlice'
import { Container } from '../components/Styled/StyledGenericLayout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import FilterAndSearch from '../components/FilterAndSearch'
import VidriosTable from '../components/Tables/Vidrios'
import NewVidrio from '../components/Forms/Vidrios/NewVidrio'
import EditVidrio from '../components/Forms/Vidrios/EditVidrio'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'categoria', 'espesor', 'proveedor','costo' ,'precio']

const Vidrios = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const [tabIndex, setTabIndex] = useState(0)
  const [data_edit, setDataEdit] = useState(false)

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataVidrio())
  }, [dispatch, data_edit])

  // MOVIMIENTOS ENTRE TABS CUANDO VAMOS A EDITAR
  useEffect(() => {
    if (data_edit) {
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
            Vidrios
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
            {data.vidrios.length > 0 ? (
              <VidriosTable data={data.vidrios} titles={data_titles} setDataEdit={setDataEdit} />
            ) : (
              <NoData>
                <NotAllowedIcon /> No existen Datos
              </NoData>
            )}
          </TabPanel>
          <TabPanel>
              <NewVidrio/>
          </TabPanel>
          <TabPanel>
            {data_edit ? (
            <EditVidrio data_edit={data_edit} setDataEdit={setDataEdit}/>
          ) : (
            <NoData>
              <NotAllowedIcon /> Seleccione un accesorio para editar.
            </NoData>
          )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  </>
  )
}

export default Vidrios
