import {Button, FormControl, FormHelperText, FormLabel, Input, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeDataVidrio, updateDataVidrio } from '../../../reducer/DataTablesSlice'
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

const EditVidrio = () => {
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
    dispatch(updateDataVidrio(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Vidrio Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const deleteAction = (e) => {
    e.preventDefault()
    dispatch(removeDataVidrio(edit_object._id))
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Vidrio Borrado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={10}>
      <FormControl isRequired>
            <FormLabel htmlFor='nombre' >Nombre</FormLabel>
            <Input id='nombre' type='text' size='sm' defaultValue={edit_object['nombre']} {...register('nombre')} />
            <FormHelperText>Ingrese el Nombre del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='espesor'>Espesor en mm</FormLabel>
            <Input id='espesor' type='number'step='any'  size='sm' defaultValue={edit_object['espesor']} {...register('espesor')} />
            <FormHelperText>Ingrese el espesor del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='categoria'>Categoria</FormLabel>
            <Input id='categoria' type='text' size='sm' defaultValue={edit_object['categoria']} {...register('categoria')} />
            <FormHelperText>Ingrese la Categoria del Vidrio</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
            <Input id='proveedor' type='text' size='sm' defaultValue={edit_object['proveedor']} {...register('proveedor')} />
            <FormHelperText>Ingrese el Proveedor del Vidrio</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor='precio_u'>Precio x m2</FormLabel>
            <Input id='precio_u' type='number' step='any' size='sm' defaultValue={edit_object['precio']} {...register('precio')} />
            <FormHelperText>Ingrese precio por m2</FormHelperText>
          </FormControl>
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

export default EditVidrio
