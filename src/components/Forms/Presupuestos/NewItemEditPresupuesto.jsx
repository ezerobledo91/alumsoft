import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Textarea } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createPresupuestoItem } from '../../../auxiliar/aux_functions'
import { getDataGrupo, getDataPerfil } from '../../../reducer/DataTablesSlice'
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
    const new_item = createPresupuestoItem(values, data_aberturas, data_perfiles, ID)
    dispatch(setDataEditPresupuestoItem(new_item)) // Guardo ese item en una variable global.
  }

  // GET DATA
  const data_aberturas = useSelector((state) => state.DataTables.grupos)
  const data_perfiles = useSelector((state) => state.DataTables.perfiles)
  useEffect(() => {
    dispatch(getDataGrupo())
    dispatch(getDataPerfil())
  }, [dispatch])

  useEffect(() => {
    resetForm && reset()
  }, [resetForm, reset])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <DividerAberturas>
        <FormControl isRequired>
          <FormLabel htmlFor='abertura'>Abertura</FormLabel>
          <Select placeholder='Seleccione una Abertura' id='abertura' size='sm' {...register('abertura')}>
            {data_aberturas.map((item) => {
              return (
                <option key={item._id} value={item._id}>
                  Nombre: {item.nombre} | Modelo: {item.modelo}
                </option>
              )
            })}
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
      </DividerAberturas>
      <FormControl>
        <FormLabel htmlFor='mano_obre'>Observaciones</FormLabel>
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
