import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { saveDataCliente } from '../../../reducer/DataTablesSlice'
import { updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewCliente = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Cliente Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataCliente(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    toast({
      title: `Cliente Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el Nombre del Cliente</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion basica del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='telefono'>Telefono</FormLabel>
        <Input id='telefono' type='text' size='sm' {...register('telefono')} />
        <FormHelperText>Ingrese el Telefono del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' size='sm' {...register('email')} />
        <FormHelperText>Ingrese el Email del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='direccion'>Direccion</FormLabel>
        <Input id='direccion' type='text' size='sm' {...register('direccion')} />
        <FormHelperText>Ingrese una direccion del Cliente</FormHelperText>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewCliente
