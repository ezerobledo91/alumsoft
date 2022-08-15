import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Textarea } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createPresupuestoItem } from '../../../auxiliar/aux_functions'
import { getDataAccesorio, getDataAbertura, getDataPerfil, getDataVidrio } from '../../../reducer/DataTablesSlice'
import { setDataEditPresupuestoItem } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const WrapperInput = styled.div`
  display: flex;
  gap: 20px;
`
const DividerAberturas = styled.div`
  border: solid #979797 1px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 5px;
`

const NewItemEditPresupuesto = ({ ID, observacion, setObservacion, resetForm }) => {
  //React Hook form
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const onSubmit = (values) => {
    const new_item = createPresupuestoItem(values, data_aberturas, data_perfiles, data_vidrios,data_accesorios, ID)
    dispatch(setDataEditPresupuestoItem(new_item)) // Guardo ese item en una variable global.
  }

  // GET DATA
  const data_aberturas = useSelector((state) => state.DataTables.aberturas)
  const data_perfiles = useSelector((state) => state.DataTables.perfiles)
  const data_vidrios = useSelector((state) => state.DataTables.vidrios)
  const data_accesorios = useSelector((state) => state.DataTables.accesorios)

  useEffect(() => {
    dispatch(getDataAbertura())
    dispatch(getDataPerfil())
    dispatch(getDataVidrio())
    dispatch(getDataAccesorio())

  }, [dispatch])

  useEffect(() => {
    resetForm && reset()
  }, [resetForm, reset])


  const generateGroups = () => {
    const newArrayAberturas = [...new Set(data_aberturas.map((a) => a.categoria[0]))].map((group) => {
      return {
        categoria: group,
        items: data_aberturas.filter((i) => i.categoria[0] === group),
      }
    })
    return newArrayAberturas.map((aberturas, i) => {
      return (
        <optgroup key={aberturas.categoria + i} label={aberturas.categoria} style={{ textTransform: 'capitalize' }}>
          {aberturas.items.map((abertura, index) => (
            <option key={index} value={abertura._id}>
              {abertura.nombre} | {abertura.linea}
            </option>
          ))}
        </optgroup>
      )
    })
  }






  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <DividerAberturas>
        <FormControl isRequired>
          <FormLabel htmlFor='abertura'>Abertura</FormLabel>
          <Select placeholder='Seleccione una Abertura' id='abertura' size='sm' {...register('abertura')}>
          {
              generateGroups()
            }
          </Select>
          <FormHelperText>Seleccione Aberturas para este Presupuesto</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='ancho'>Medidas | Precios | Cantidad </FormLabel>
          <WrapperInput>
            <div>
              <Input id='ancho' type='number' step='0.01' size='sm' {...register('ancho')} required />
              <FormHelperText>Ancho (m)</FormHelperText>
            </div>
            <div>
              <Input id='alto' type='number' step='0.01' size='sm' {...register('alto')} required />
              <FormHelperText>Alto (m)</FormHelperText>
            </div>
            <div>
              <Input id='precio' type='number' step='0.01' size='sm' {...register('precio')} required />
              <FormHelperText>Precio Kg</FormHelperText>
            </div>
            <div>
              <Input id='porcentaje' type='number' step='0.01' size='sm' {...register('porcentaje')} required />
              <FormHelperText>Porcentaje</FormHelperText>
            </div>
            <div>
              <Input aria-required={true} id='cantidad' type='number' step='0.01' size='sm' {...register('cantidad')} />
              <FormHelperText>Cantidad (u)</FormHelperText>
            </div>
          </WrapperInput>
        </FormControl>
        <Tabs  >
          <TabList>
            <Tab   _selected={{ color: '#319795', borderColor: '#319795'}} _focus={{ boxShadow: "none", }}>Vidrio</Tab>
            <Tab  _selected={{ color: '#319795', borderColor: '#319795'}} _focus={{ boxShadow: "none", }}>Revestimiento Aluminio</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <WrapperInput>
                <FormControl>
                  <FormLabel htmlFor='Vidrio'>Vidrio</FormLabel>
                  <Select placeholder='Seleccione un Vidrio'  defaultValue='Sin Vidrio' id='vidrio' size='sm' {...register('vidrio')}>
                    {data_vidrios.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          Nombre: {item.nombre} Espesor: {item.espesor}
                        </option>
                      )
                    })}
                  </Select>
                  <FormHelperText>Seleccione un vidrio (opcional)</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='Vidrio'>Cantidad</FormLabel>
                  <Input aria-required={true} id='mt2' type='number' step='0.01' size='sm' {...register('vidrio_mt2')} />
                  <FormHelperText>Cantidad en m2</FormHelperText>
                </FormControl>
              </WrapperInput>
            </TabPanel>
            <TabPanel>
              <WrapperInput>
                <FormControl>
                  <FormLabel htmlFor='Vidrio'>Aluminio</FormLabel>
                  <Select placeholder='Seleccione un Perfil' id='vidrio' size='sm' {...register('revestimiento_aluminio')}>
                    {data_vidrios.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          Nombre: {item.nombre} Espesor: {item.espesor}
                        </option>
                      )
                    })}
                  </Select>
                  <FormHelperText>Seleccione un revestimiento(opcional)</FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='Vidrio'>Cantidad</FormLabel>
                  <Input aria-required={true} id='mt2' type='number' step='0.01' size='sm' {...register('r_aluminio_mt2')} />
                  <FormHelperText>Cantidad en m2</FormHelperText>
                </FormControl>
              </WrapperInput>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </DividerAberturas>
      <FormControl>
        <FormLabel htmlFor='observacion'>Observaciones</FormLabel>
        <Textarea
          onChange={(e) => setObservacion(e.target.value)}
          placeholder='Observaciones'
          value={observacion}
          size='sm'
        />
        <FormHelperText>Detalle visible al pie del Presupuesto</FormHelperText>
      </FormControl>
      <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' size='sm' type='submit'>
        Añadir
      </Button>
    </Container>
  )
}

export default NewItemEditPresupuesto
