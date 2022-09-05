import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { getDataVidrio } from '../reducer/DataTablesSlice'
import { Container, UniqueFlexRow } from '../components/Styled/StyledGenericLayout'
import { FormControl, FormLabel, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import VidriosTable from '../components/Tables/Vidrios'
import NewVidrio from '../components/Forms/Vidrios/NewVidrio'
import EditVidrio from '../components/Forms/Vidrios/EditVidrio'
import LoteEdit from '../components/Forms/Vidrios/LoteEdit'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = ['nombre', 'categoria', 'espesor', 'proveedor', 'costo', 'precio']

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

  // FILTROS
  const [data_filtrada, setDataFiltrada] = useState([])
  const setDataFiltro = (filtro, parametro) => {
    if (filtro === '') {
      setDataFiltrada([])
    } else {
      const datos = data.vidrios.filter((item) => item[parametro] === filtro)
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
              Vidrios
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Nuevo
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Editar
            </Tab>
            <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
              Editor de Lotes
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UniqueFlexRow>
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
                    <option value=''>Sin Categoria</option>
                    <option value='float'>Float</option>
                    <option value='catedral'>Catedral</option>
                    <option value='espejos'>Espejos</option>
                    <option value='reflectivos'>Reflectivos</option>
                    <option value='blindex'>Blindex</option>
                    <option value='solar'>Solar</option>
                    <option value='otro'>Otro</option>
                  </Select>
                </FormControl>
              </UniqueFlexRow>
              {data.vidrios.length > 0 ? (
                <VidriosTable data={data_filtrada.length > 0 ? data_filtrada :  data.vidrios} titles={data_titles} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> No existen Datos
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
              <NewVidrio />
            </TabPanel>
            <TabPanel>
              {data_edit ? (
                <EditVidrio data_edit={data_edit} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> Seleccione un Vidrio para editar.
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
                <LoteEdit/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default Vidrios
