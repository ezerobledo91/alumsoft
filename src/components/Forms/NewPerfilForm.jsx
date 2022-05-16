import { Box, Button, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { close } from '../../reducer/modalSlice'
import { saveDataAsync } from '../../reducer/newDataPerfilSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewPerfilForm = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataAsync(data))
    setLoading(false)
    dispatch(close()) // Close Modal
    toast({
      title: `Perfil Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={10}>
        <Box>
          <FormControl isRequired>
            <FormLabel htmlFor='codigo'>Codigo</FormLabel>
            <Input id='codigo' type='number' size='sm' {...register('codigo')} />
            <FormHelperText>Ingrese el codigo del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='nombre'>Nombre</FormLabel>
            <Input id='nombre' type='text' size='sm' {...register('nombre')} />
            <FormHelperText>Ingrese el Nombre del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
            <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
            <FormHelperText>Ingrese una Descripcion</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='categoria'>Categoria</FormLabel>
            <Input id='categoria' type='text' size='sm' {...register('categoria')} />
            <FormHelperText>Ingrese la Categoria del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='linea'>Linea</FormLabel>
            <Input id='linea' type='text' size='sm' {...register('linea')} />
            <FormHelperText>Ingrese la Linea del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
            <Input id='proveedor' type='text' size='sm' {...register('proveedor')} />
            <FormHelperText>Ingrese el Proveedor del Perfil</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor='alto'>Alto</FormLabel>
            <Input id='alto' type='number' size='sm' step='any' {...register('alto')} />
            <FormHelperText>Ingrese el alto del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='ancho'>Ancho</FormLabel>
            <Input id='ancho' type='number' size='sm' step='any' {...register('ancho')} />
            <FormHelperText>Ingrese el Ancho del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='peso'>Peso</FormLabel>
            <Input id='peso' type='number' size='sm' step='any' {...register('peso')} />
            <FormHelperText>Ingrese el peso del Perfil por metro lineal</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='largo_std'>Largo Estandar</FormLabel>
            <Input id='largo_std' type='number' size='sm' step='any' {...register('largo_std')} />
            <FormHelperText>Ingrese el Largo Estandar del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='costo_u'>Costo Unitario</FormLabel>
            <Input id='costo_u' type='number' step='any' size='sm' {...register('costo_u')} />
            <FormHelperText>Ingrese costo unitario</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='precio_u'>Precio Unitario</FormLabel>
            <Input id='precio_u' type='number' step='any' size='sm' {...register('precio_u')} />
            <FormHelperText>Ingrese precio unitario</FormHelperText>
          </FormControl>
        </Box>
      </SimpleGrid>

      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewPerfilForm
