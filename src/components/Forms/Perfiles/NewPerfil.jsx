import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { saveDataPerfil } from '../../../reducer/DataTablesSlice'
import { updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewPerfil = ({proveedores}) => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true)
    await dispatch(saveDataPerfil(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
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
            <Select
              placeholder='Seleccione una categoria'
              defaultValue=''
              id='categoria'
              size='sm'
              {...register('categoria')}
            >
              <option value=''>Sin Categoria</option>
              <option value='puertas'>Puertas</option>
              <option value='ventanas'>Ventanas</option>
              <option value='marcos'>Marcos</option>
              <option value='otro'>Otro</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='linea'>Linea</FormLabel>
            <Select
              placeholder='Seleccione una Linea'
              defaultValue=''
              id='linea'
              size='sm'
              {...register('linea')}
            >
              <option value=''>Sin Linea</option>
              <option value='herrero'>Herrero</option>
              <option value='herrero pesado'>Herrero Pesado</option>
              <option value='modena'>Modena</option>
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
            {proveedores.map((proveedor,i)=> <option  key={i} value={proveedor.nombre}>{proveedor.nombre}</option>)}
          </Select>
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

export default NewPerfil
