import { AddIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { createPresupuestoItem } from '../../../auxiliar/aux_functions'
import { getDataCliente, getDataGrupo, getDataPerfil } from '../../../reducer/DataTablesSlice'
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

const NewPre = () => {
  //React Hook form
  const { register, handleSubmit, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  // GET DATA
  const data_aberturas = useSelector((state) => state.DataTables.grupos)
  const data_clientes = useSelector((state) => state.DataTables.clientes)
  const data_perfiles = useSelector((state) => state.DataTables.perfiles)
  const data_preview = useSelector((state) => state.UiSlice.previewPres.data)
  const ID = data_preview.length
  //Guardar Presupuesto Nuevo
  const onSubmit = async (data) => {
    // setLoading(true)
    // data.piezas = data_selected
    // await dispatch(saveDataGrupo(data))
    // setLoading(false)
    // dispatch(updateStateModal(false)) // Close Modal
    // dispatch(removeAllSelected())// Borrar piezas Seleccionadas
    // toast({
    //   title: `Abertura Guardada Correctamente`,
    //   status: 'success',
    //   isClosable: true,
    // })
  }
  // Guardar items de presupuesto generados.
  const handeClick = (values) => {
    const new_item = createPresupuestoItem(values, data_aberturas, data_perfiles, ID)
    dispatch(setDataPreview(new_item)) // Guardo ese item en una variable global. 
  }

  useEffect(() => {
    dispatch(getDataGrupo())
    dispatch(getDataCliente())
    dispatch(getDataPerfil())
  }, [dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Cliente</FormLabel>
        <Select placeholder='Select option' id='perfil' size='sm' {...register('cliente')}>
          {data_clientes.map((item) => {
            return (
              <option key={item._id} value={item._id}>
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
          <Select placeholder='Select option' id='abertura' size='sm' {...register('abertura')}>
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
          <FormLabel htmlFor='ancho'>Medidas</FormLabel>
          <WrapperInput>
            <div>
              <Input id='ancho' type='number' step='0.01' size='sm' {...register('ancho')} />
              <FormHelperText>Ancho Abertura</FormHelperText>
            </div>
            <div>
              <Input id='alto' type='number' step='0.01' size='sm' {...register('alto')} />
              <FormHelperText>Alto Abertura</FormHelperText>
            </div>
            <div>
              <Input id='precio' type='number' step='0.01' size='sm' {...register('precio')} />
              <FormHelperText>Precio Kg</FormHelperText>
            </div>
            <div>
              <Input id='porcentaje' type='number' step='0.01' size='sm' {...register('porcentaje')} />
              <FormHelperText>Porcentaje</FormHelperText>
            </div>
            <div>
              <Input id='cantidad' type='number' step='0.01' size='sm' {...register('cantidad')} />
              <FormHelperText>Cantidad</FormHelperText>
            </div>
          </WrapperInput>

        </FormControl>
        <Button
          leftIcon={<AddIcon />}
          colorScheme='teal'
          variant='solid'
          size='sm'
          onClick={() => {
            handeClick(getValues())
          }}
        >
          Añadir
        </Button>
      </DividerAberturas>
      <FormControl isRequired>
        <FormLabel htmlFor='mano_obre'>Mano de Obra</FormLabel>
        <Input id='mano_obrea' type='number' step='0.01' size='sm' {...register('mano_obra')} />
        <FormHelperText>Mano de Obra en Pesos</FormHelperText>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewPre
