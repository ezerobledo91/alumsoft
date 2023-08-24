import { NotAllowedIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import TablaPresupuestos from '../components/Tables/TablaPresupuestos'
import { getDataCliente, getDataPresupuesto } from '../reducer/DataTablesSlice'
import { Container, UniqueFlexRow } from '../components/Styled/StyledGenericLayout'
import Presupuestos from '../components/Forms/Presupuestos/Presupuestos'
import EditPresupuestos from '../components/Forms/Presupuestos/EditPresupuesto'
import { setDataEditPresupuesto } from '../reducer/UiSlice'

const NoData = styled.div`
  padding: 10px 20px;
`
let data_titles = ['numero', 'cliente', 'observacion', 'precio', 'fecha', "demora", "estado"]
const PresupuestosList = () => {
  const data = useSelector((state) => state.DataTables)
  const dispatch = useDispatch()
  const [data_edit, setDataEdit] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)

  const [data_filtrada, setDataFiltrada] = useState([])

  // GET DATOS DE API Y SETEAR EL STATE REDUX
  useEffect(() => {
    dispatch(getDataPresupuesto())
    dispatch(getDataCliente())
  }, [dispatch, data_edit])

  // MOVIMIENTOS ENTRE TABAS CUANDO VAMOS A EDITAR
  useEffect(() => {
    if (data_edit) {
      dispatch(setDataEditPresupuesto(data_edit.aberturas))
      setTabIndex(2)
      return
    }
    setTabIndex(0)
  }, [data_edit, dispatch])

  // CONTROL DE TABS
  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const setDataCliente = (cliente) => {
    if (cliente === '') {
      setDataFiltrada([])
    } else {
      const datos = data.presupuestos.filter((pres) => pres.cliente === cliente && pres.visible === true)
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
              <UniqueFlexRow>
                <FormControl>
                  <FormLabel htmlFor='categoria'>Filtro Cliente</FormLabel>
                  <Select
                    placeholder='Seleccione un Cliente'
                    id='categoria'
                    defaultValue={''}
                    size='sm'
                    onChange={(e) => {
                      setDataCliente(e.target.value)
                    }}
                  >
                    <option value=''> Ninguno </option>
                    {data.presupuestos.length > 0
                      ? data.clientes.map((cliente) => (
                          <option key={cliente._id} value={cliente.nombre}>
                            {cliente.nombre}
                          </option>
                        ))
                      : ''}
                    <option value='Consumidor Final'> Consumidor Final </option>
                  </Select>
                </FormControl>
              </UniqueFlexRow>

              {data.presupuestos.length > 0 ? (
                <TablaPresupuestos
                  data={data_filtrada.length > 0 ? data_filtrada : data.presupuestos}
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
              <Presupuestos />
            </TabPanel>
            <TabPanel>
              {data_edit ? (
                <EditPresupuestos data_edit={data_edit} setDataEdit={setDataEdit} />
              ) : (
                <NoData>
                  <NotAllowedIcon /> Seleccione un Presupuesto para editar.
                </NoData>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  )
}

export default PresupuestosList
