import { Box, Button, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeDataPerfil, updateDataPerfil } from '../../../reducer/DataTablesSlice'
import { setEditModal, updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditPerfil = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)

  //Editar Grupo
  const onSubmit = async (data) => {
    data._id = edit_object._id
    setLoading(true)
    dispatch(updateDataPerfil(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Perfil Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const deleteAction = (e) => {
    e.preventDefault()
    dispatch(removeDataPerfil(edit_object._id))
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Perfil Borrado Correctamente`,
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
            <Input id='codigo' type='number' size='sm' defaultValue={edit_object['codigo']} {...register('codigo')} />
            <FormHelperText>Ingrese el codigo del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='nombre'>Nombre</FormLabel>
            <Input id='nombre' type='text' size='sm' defaultValue={edit_object['nombre']} {...register('nombre')} />
            <FormHelperText>Ingrese el Nombre del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
            <Input
              id='descripcion'
              type='text'
              size='sm'
              defaultValue={edit_object['descripcion']}
              {...register('descripcion')}
            />
            <FormHelperText>Ingrese una Descripcion</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='categoria'>Categoria</FormLabel>
            <Input
              id='categoria'
              type='text'
              size='sm'
              defaultValue={edit_object['categoria']}
              {...register('categoria')}
            />
            <FormHelperText>Ingrese la Categoria del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='linea'>Linea</FormLabel>
            <Input id='linea' type='text' size='sm' defaultValue={edit_object['linea']} {...register('linea')} />
            <FormHelperText>Ingrese la Linea del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
            <Input
              id='proveedor'
              type='text'
              size='sm'
              defaultValue={edit_object['proveedor']}
              {...register('proveedor')}
            />
            <FormHelperText>Ingrese el Proveedor del Perfil</FormHelperText>
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel htmlFor='alto'>Alto</FormLabel>
            <Input
              id='alto'
              type='number'
              size='sm'
              step='any'
              defaultValue={edit_object['alto']}
              {...register('alto')}
            />
            <FormHelperText>Ingrese el alto del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='ancho'>Ancho</FormLabel>
            <Input
              id='ancho'
              type='number'
              size='sm'
              step='any'
              defaultValue={edit_object['ancho']}
              {...register('ancho')}
            />
            <FormHelperText>Ingrese el Ancho del Perfil</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='peso'>Peso</FormLabel>
            <Input
              id='peso'
              type='number'
              size='sm'
              step='any'
              defaultValue={edit_object['peso']}
              {...register('peso')}
            />
            <FormHelperText>Ingrese el peso del Perfil por metro lineal</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='largo_std'>Largo Estandar</FormLabel>
            <Input
              id='largo_std'
              type='number'
              size='sm'
              step='any'
              defaultValue={edit_object['largo_std']}
              {...register('largo_std')}
            />
            <FormHelperText>Ingrese el Largo Estandar del Perfil</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='costo_u'>Costo Unitario</FormLabel>
            <Input
              id='costo_u'
              type='number'
              step='any'
              size='sm'
              defaultValue={edit_object['costo_u']}
              {...register('costo_u')}
            />
            <FormHelperText>Ingrese costo unitario</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='precio_u'>Precio Unitario</FormLabel>
            <Input
              id='precio_u'
              type='number'
              step='any'
              size='sm'
              defaultValue={edit_object['precio_u']}
              {...register('precio_u')}
            />
            <FormHelperText>Ingrese precio unitario</FormHelperText>
          </FormControl>
        </Box>
      </SimpleGrid>
      <WrapperButton>
        <Button
          colorScheme='red'
          isLoading={isLoading}
          onClick={(e) => {
            deleteAction(e)
          }}
        >
          Borrar
        </Button>
        <Button colorScheme='green' type='submit' isLoading={isLoading}>
          Guardar Cambios
        </Button>
      </WrapperButton>
    </Container>
  )
}

export default EditPerfil
