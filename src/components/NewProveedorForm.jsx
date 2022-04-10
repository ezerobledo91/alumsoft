import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { saveProveedor } from '../services/proveedores'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewProveedorForm = ({ close }) => {
  //React Hook form
  const { register, handleSubmit, errors } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  //Guardar Proveedor Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    const response = await saveProveedor(data) // API comunication
    console.log(response)
    setTimeout(() => {
      setLoading(false)
      close() // Close Modal
      toast({
        title: `Proveedor Guardado Correctamente`,
        status: 'success',
        isClosable: true,
      })
    }, 2000)
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el Nombre del Proveedor</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion basica del Proveedor</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='categoria'>Categoria</FormLabel>
        <Input id='categoria' type='text' size='sm' {...register('categoria')} />
        <FormHelperText>Seleccione una categoria</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='telefono'>Telefono</FormLabel>
        <Input id='telefono' type='text' size='sm' {...register('telefono')} />
        <FormHelperText>Ingrese el Telefono del Proveedor</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' size='sm' {...register('email')} />
        <FormHelperText>Ingrese el Email del Proveedor</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='web'>Web</FormLabel>
        <Input id='email' type='text' size='sm' {...register('web')} />
        <FormHelperText>Ingrese sitio Web del Proveedor</FormHelperText>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewProveedorForm
