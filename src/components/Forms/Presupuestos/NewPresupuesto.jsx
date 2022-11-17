import { AddIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Textarea,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createPresupuestoItem, generateOptionGroups } from '../../../auxiliar/aux_functions'
import {
  getDataAccesorio,
  getDataCliente,
  getDataAbertura,
  getDataPerfil,
  getDataVidrio,
} from '../../../reducer/DataTablesSlice'
import { setDataPreview } from '../../../reducer/UiSlice'

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

const NewPre = ({ setCliente, setObservacion, resetForm }) => {
  //React Hook form
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  // GET DATA
  const data_aberturas = useSelector((state) => state.DataTables.aberturas)
  const data_clientes = useSelector((state) => state.DataTables.clientes)
  const data_perfiles = useSelector((state) => state.DataTables.perfiles)
  const data_vidrios = useSelector((state) => state.DataTables.vidrios)
  const data_accesorios = useSelector((state) => state.DataTables.accesorios)

  const data_preview = useSelector((state) => state.UiSlice.previewPres.data)

  const ID = data_preview.length

  const [aberturaSelected, setAberturaSelected] = useState()
  const [estandar, setEstandar] = useState(false)

  useEffect(() => {
    const abertura = data_aberturas.find((a) => a._id === aberturaSelected)
    if (abertura?.tipo === 'estandar') {
      setEstandar(true)
      return
    }
    setEstandar(false)
  }, [aberturaSelected])

  //Guardar Presupuesto Nuevo
  const onSubmit = (values) => {
    const new_item = createPresupuestoItem(values, data_aberturas, data_perfiles, data_vidrios, data_accesorios, ID)
    dispatch(setDataPreview(new_item)) // Guardo ese item en una variable global.
  }

  useEffect(() => {
    dispatch(getDataAbertura())
    dispatch(getDataCliente())
    dispatch(getDataPerfil())
    dispatch(getDataVidrio())
    dispatch(getDataAccesorio())
  }, [dispatch])

  useEffect(() => {
    resetForm && reset()
  }, [resetForm, reset])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel htmlFor='nombre'>Cliente</FormLabel>
        <Select placeholder='Seleccione un Cliente' id='cliente' size='sm' onChange={(e) => setCliente(e.target.value)}>
          {data_clientes.map((item) => {
            return (
              <option key={item._id} value={item.nombre}>
                Nombre: {item.nombre}
              </option>
            )
          })}
        </Select>
        <FormHelperText>Seleccione un Cliente</FormHelperText>
      </FormControl>
      <DividerAberturas>
        <FormControl isRequired>
          <FormLabel htmlFor='abertura'>Abertura</FormLabel>
          <Select
            placeholder='Seleccione una Abertura'
            id='abertura'
            size='sm'
            {...register('abertura')}
            onChange={(e) => setAberturaSelected(e.target.value)}
          >
            {generateOptionGroups(data_aberturas, 'categoria', '_id', 'nombre')}
          </Select>
          <FormHelperText>Seleccione Aberturas para este Presupuesto</FormHelperText>
        </FormControl>
        {!estandar ? (
          <>
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
                  <Input
                    aria-required={true}
                    id='cantidad'
                    type='number'
                    step='0.01'
                    size='sm'
                    {...register('cantidad')}
                  />
                  <FormHelperText>Cantidad (u)</FormHelperText>
                </div>
              </WrapperInput>
            </FormControl>
            <Tabs>
              <TabList>
                <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
                  Vidrio
                </Tab>
                <Tab _selected={{ color: '#319795', borderColor: '#319795' }} _focus={{ boxShadow: 'none' }}>
                  Revestimiento Aluminio
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <WrapperInput>
                    <FormControl>
                      <FormLabel htmlFor='Vidrio'>Vidrio</FormLabel>
                      <Select
                        placeholder='Seleccione un Vidrio'
                        defaultValue='Sin Vidrio'
                        id='vidrio'
                        size='sm'
                        {...register('vidrio')}
                      >
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
                      <Input
                        aria-required={true}
                        id='mt2'
                        type='number'
                        step='0.01'
                        size='sm'
                        {...register('vidrio_mt2')}
                      />
                      <FormHelperText>Cantidad en m2</FormHelperText>
                    </FormControl>
                  </WrapperInput>
                </TabPanel>
                <TabPanel>
                  <WrapperInput>
                    <FormControl>
                      <FormLabel htmlFor='Vidrio'>Aluminio</FormLabel>
                      <Select
                        placeholder='Seleccione un Perfil'
                        id='perfil'
                        size='sm'
                        {...register('revestimiento_aluminio')}
                      >
                        {data_perfiles
                          .filter((perfil) => perfil.categoria === 'revestimientos')
                          .map((item) => {
                            return (
                              <option key={item._id} value={item._id}>
                                Codigo: {item.codigo} Nombre: {item.nombre}
                              </option>
                            )
                          })}
                      </Select>
                      <FormHelperText>Seleccione un revestimiento(opcional)</FormHelperText>
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor='Vidrio'>Cantidad</FormLabel>
                      <Input
                        aria-required={true}
                        id='mt2'
                        type='number'
                        step='0.01'
                        size='sm'
                        {...register('r_aluminio_mt')}
                      />
                      <FormHelperText>Cantidad en m lineales</FormHelperText>
                    </FormControl>
                  </WrapperInput>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        ) : (
          <FormControl>
          <FormLabel htmlFor=''>Cantidad</FormLabel>
            <Input aria-required={true} id='cantidad' type='number' step='0.01' size='sm' {...register('cantidad')} />
            <FormHelperText>Cantidad (u)</FormHelperText>
          </FormControl>
        )}
      </DividerAberturas>
      <FormControl>
        <FormLabel htmlFor='observacion'>Observaciones</FormLabel>
        <Textarea onChange={(e) => setObservacion(e.target.value)} placeholder='Observaciones' size='sm' />
        <FormHelperText>Detalle visible al pie del Presupuesto</FormHelperText>
      </FormControl>
      <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' size='sm' type='submit'>
        Añadir
      </Button>
    </Container>
  )
}

export default NewPre
