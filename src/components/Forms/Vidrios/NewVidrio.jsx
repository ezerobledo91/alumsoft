import { Button, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { saveDataVidrio } from '../../../reducer/DataTablesSlice'
import { updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewVidrio = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataVidrio(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    toast({
      title: `Vidrio Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
     <SimpleGrid columns={2} spacing={10}>
          <FormControl isRequired>
            <FormLabel htmlFor='nombre'>Nombre</FormLabel>
            <Input id='nombre' type='text' size='sm' {...register('nombre')} />
            <FormHelperText>Ingrese el Nombre del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='espesor'>Espesor en mm</FormLabel>
            <Input id='espesor' type='number'step='any'  size='sm' {...register('espesor')} />
            <FormHelperText>Ingrese el espesor del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='categoria'>Categoria</FormLabel>
            <Input id='categoria' type='text' size='sm' {...register('categoria')} />
            <FormHelperText>Ingrese la Categoria del Vidrio</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
            <Input id='proveedor' type='text' size='sm' {...register('proveedor')} />
            <FormHelperText>Ingrese el Proveedor del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='precio_u'>Precio x m2</FormLabel>
            <Input id='precio_u' type='number' step='any' size='sm' {...register('precio')} />
            <FormHelperText>Ingrese precio por m2</FormHelperText>
          </FormControl>
      </SimpleGrid>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewVidrio
