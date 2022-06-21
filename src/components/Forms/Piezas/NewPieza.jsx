import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPerfil, saveDataPieza } from '../../../reducer/DataTablesSlice'
import { updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewPieza = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataPieza(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    toast({
      title: `Pieza Guardada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  // GET DATA FROM PERFILES
  const newDataPerfil = useSelector((state) => state.DataTables.perfiles)
  useEffect(() => {
    dispatch(getDataPerfil())
  }, [dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el nombre de la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='perfil'>Perfil</FormLabel>
        <Select placeholder='Select option' id='perfil' size='sm' {...register('perfil')}>
          {newDataPerfil.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                Codigo: {item.codigo} | {item.nombre}
              </option>
            )
          })}
        </Select>
        <FormHelperText>Seleccione un Perfil</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion de la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='categoria'>Categoria</FormLabel>
        <Input id='categoria' type='text' size='sm' {...register('categoria')} />
        <FormHelperText>Ingrese Categoria</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='modelo'>Modelo</FormLabel>
        <Input id='modelo' type='text' size='sm' {...register('modelo')} />
        <FormHelperText>Ingrese un Modelo para la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='variable'>Variable</FormLabel>
        <Select placeholder='Select option' id='variable' size='sm' {...register('variable')}>
          <option value='ancho'>Ancho</option>
          <option value='alto'>Alto</option>
          <option value='marco'>2 Alto + Ancho (Marcos)</option>
          <option value='fija'>Unidades Fijas</option>
          <option value='superficie'>Superficies</option>
        </Select>
        <FormHelperText>Seleccione una variable de medida</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='constante'>Constante</FormLabel>
        <Input id='constante' type='number' size='sm' step='0.01' {...register('constante_m')} />
        <FormHelperText>Ingrese un constante para la Pieza (unidad x medida 1 x 1)</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='cortes'>Cortes Necesarios</FormLabel>
        <Input id='cortes' type='number' size='sm' {...register('cortes')} />
        <FormHelperText>Ingrese la cantidad de cortes necesarios.</FormHelperText>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewPieza
