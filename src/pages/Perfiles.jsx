import { NotAllowedIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import EditPerfil from '../components/Forms/Perfiles/EditPerfil'
import NewPerfil from '../components/Forms/Perfiles/NewPerfil'
import Navbar from '../components/Navbar'
import { Container,  WrapperFlexRowMin } from '../components/Styled/StyledGenericLayout'
import { FormControl, FormLabel, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { getDataPerfil } from '../reducer/DataTablesSlice'
import PerfilesTable from '../components/Tables/Perfiles'

const NoData = styled.div`
  padding: 10px 20px;
`

let data_titles = [
  'codigo',
  'nombre',
  'descripcion',
  'categoria',
  'linea',
  'proveedor',
  'alto',
  'ancho',
  'peso',
  'largo_std',
  'costo_u',
  'precio_u',
]

const Perfiles = () => {
  const data = useSelector((state) => state.DataTables) //Estado de la app en todo momento
  const [tabIndex, setTabIndex] = useState(0)
  const [data_edit, setDataEdit] = useState(false)

  const dispatch = useDispatch() // Set state redux toolkit

  useEffect(() => {
    dispatch(getDataPerfil())
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
      const datos = data.perfiles.filter((item) => item[parametro] === filtro)
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
              Perfiles
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
                    <option value='revestimientos'>Reveestimientos</option>
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
              {data.perfiles.length > 0 ? (
                <PerfilesTable
                  data={data_filtrada.length > 0 ? data_filtrada : data.perfiles}
                  titles={data_titles}
                  setDataEdit={setDataEdit}
                />
              ) : (
                <NoData>
                  <NotAllowedIcon /> No existen Datos
                </NoData>
              )}
            </TabPanel>
            <TabPanel>
              <NewPerfil />
            </TabPanel>
            <TabPanel>
              {data_edit ? (
                <EditPerfil data_edit={data_edit} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> Seleccione un Perfil para editar.
                </NoData>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default Perfiles
