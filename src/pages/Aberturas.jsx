import { NotAllowedIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import NewAberturaRefactor from '../components/Forms/Aberturas/NewAbertura'
import NewAberturaEdit from '../components/Forms/Aberturas/NewAberturaEdit'
import Navbar from '../components/Navbar'
import { Container, WrapperFlexRowMin } from '../components/Styled/StyledGenericLayout'
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
  // FILTROS
  const [data_filtrada, setDataFiltrada] = useState([])
  const setDataFiltro = (filtro, parametro) => {
    if (filtro === '') {
      setDataFiltrada([])
    } else {
      const datos = data.aberturas.filter((item) => item[parametro] === filtro)
      setDataFiltrada(datos)
    }
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
            <WrapperFlexRowMin>
                <FormControl>
                  <FormLabel htmlFor='categoria'>Filtro Categoria</FormLabel>
                  <Select
                    placeholder='Seleccione una Categoria'
                    id='categoria'
                    defaultValue={''}
                    size='sm'
                    onChange={(e) => {
                      setDataFiltro(e.target.value, 'categoria')
                    }}
                  >
                    <option value='puertas'>Puertas</option>
                    <option value='ventanas'>Ventanas</option>
                    <option value='marcos'>Marcos</option>
                    <option value='otro'>Otro</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='categoria'>Filtro Linea</FormLabel>
                  <Select
                    placeholder='Seleccione una Linea'
                    id='categoria'
                    defaultValue={''}
                    size='sm'
                    onChange={(e) => {
                      setDataFiltro(e.target.value, 'linea')
                    }}
                  >
                    <option value='herrero'>Herrero</option>
                    <option value='herrero pesado'>Herrero Pesado</option>
                    <option value='modena'>Modena</option>
                    <option value='otro'>Otro</option>
                  </Select>
                </FormControl>
              </WrapperFlexRowMin>
              {data.aberturas.length > 0 ? (
                <AberturasTable data={data_filtrada.length > 0 ? data_filtrada : data.aberturas} titles={data_titles} setDataEdit={setDataEdit} />
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
                  <NotAllowedIcon /> Seleccione una Abertura para editar.
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
