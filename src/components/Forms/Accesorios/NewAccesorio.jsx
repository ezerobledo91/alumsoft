import { Button, FormControl, FormHelperText, FormLabel, Input, Select, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { saveDataAccesorio } from '../../../reducer/DataTablesSlice'
import { updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewAccesorio = ({proveedores}) => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
 //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataAccesorio(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    toast({
      title: `Accesorio Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={10}>
        <FormControl isRequired>
          <FormLabel htmlFor='codigo'>Codigo</FormLabel>
          <Input id='codigo' type='text' size='sm' {...register('codigo')} />
          <FormHelperText>Ingrese el codigo del Accesorio</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Accesorio</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
          <FormHelperText>Ingrese el descripcion del Accesorio</FormHelperText>
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
            <option value='burlete'>Burletes</option>
            <option value='felpa'>Felpas</option>
            <option value='herraje'>Herrajes</option>
            <option value='buloneria'>Buloneria</option>
            <option value='cerradura'>Cerraduras</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='unidad'>Unidad</FormLabel>
          <Select
            placeholder='Seleccione una unidad de Medida'
            defaultValue='unidades'
            id='unidad'
            size='sm'
            {...register('unidad')}
          >
            <option value='unidades'>Por unidad</option>
            <option value='metro'>Por Metro Lineal</option>
          </Select>
          <FormHelperText>
            Seleccione una opción con relación al uso. (Ej: Felpa / Burletes unidad por metro lineal)
          </FormHelperText>
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
            {proveedores.map((proveedor,i)=> <option  key={i} value={proveedor.nombre}>{proveedor.nombre}</option>)}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='precio_u'>Precio unitario</FormLabel>
          <Input id='precio_u' type='number' step='any' size='sm' {...register('precio')} />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
      </SimpleGrid>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewAccesorio
