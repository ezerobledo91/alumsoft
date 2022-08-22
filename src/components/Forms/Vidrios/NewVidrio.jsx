import { Button, FormControl, FormHelperText, FormLabel, Input, Select, SimpleGrid, useToast } from '@chakra-ui/react'
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

const NewVidrio = ({proveedores}) => {
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
          <Input id='espesor' type='number' step='any' size='sm' {...register('espesor')} />
          <FormHelperText>Ingrese el espesor del Vidrio</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='categoria'>Categoria</FormLabel>
          <Select
            placeholder='Seleccione una categoria'
            defaultValue=''
            id='categoria'
            size='sm'
            {...register('categoria')}
          >
            <option value=''>Sin Categoria</option>
            <option value='float'>Float</option>
            <option value='catedral'>Catedral</option>
            <option value='espejos'>Espejos</option>
            <option value='reflectivos'>Reflectivos</option>
            <option value='blindex'>Blindex</option>
            <option value='solar'>Solar</option>
            <option value='otro'>Otro</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
          <Select
            placeholder='Seleccione un Proveedor'
            defaultValue=''
            id='proveedor'
            size='sm'
            {...register('proveedor')}
          >
            <option value=''>Sin Proveedor</option>
            {proveedores.map((proveedor, i) => (
              <option key={i} value={proveedor.nombre}>
                {proveedor.nombre}
              </option>
            ))}
          </Select>
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