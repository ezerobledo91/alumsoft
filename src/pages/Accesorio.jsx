import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditAccesorio from '../components/Forms/Accesorios/EditAccesorio'
import NewAccesorio from '../components/Forms/Accesorios/NewAccesorio'
import Navbar from '../components/Navbar'
import AccesoriosTable from '../components/Tables/Accesorios'
import { getDataAccesorio, getProveedorByCategoria } from '../reducer/DataTablesSlice'
import { Container } from '../components/Styled/StyledGenericLayout'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import FilterAndSearch from '../components/FilterAndSearch'


const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['codigo','nombre','descripcion', 'categoria', 'unidad', 'proveedor','costo' , 'precio']

const Accesorios = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const [tabIndex, setTabIndex] = useState(0)
  const [data_edit, setDataEdit] = useState(false)

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataAccesorio())
    dispatch(getProveedorByCategoria('accesorios'))
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
          Accesorios
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
            {data.accesorios.length > 0 ? (
              <AccesoriosTable data={data.accesorios} titles={data_titles} setDataEdit={setDataEdit} />
            ) : (
              <NoData>
                <NotAllowedIcon /> No existen Datos
              </NoData>
            )}
          </TabPanel>
          <TabPanel>
            <NewAccesorio/>
          </TabPanel>
          <TabPanel>
            {data_edit ? (
              <EditAccesorio data_edit={data_edit} setDataEdit={setDataEdit}/>
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

export default Accesorios