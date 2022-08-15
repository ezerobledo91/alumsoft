import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeDataCliente, updateDataCliente } from '../../../reducer/DataTablesSlice'
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


const EditCliente = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)


  const onSubmit = async (data) => {
    data._id = edit_object._id
    setLoading(true)
    dispatch(updateDataCliente(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({edit:false,edit_object:{}}))
    toast({
      title: `Cliente Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }


  const deleteAction = (e) =>{
    e.preventDefault()
   dispatch(removeDataCliente(edit_object._id))
   dispatch(updateStateModal(false)) // Close Modal
   dispatch(setEditModal({edit:false,edit_object:{}}))
   toast({
     title: `Cliente Borrado Correctamente`,
     status: 'success',
     isClosable: true,
   })

  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' defaultValue={edit_object['nombre']} {...register('nombre')} />
        <FormHelperText>Ingrese el Nombre del Cliente</FormHelperText>
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
        <FormHelperText>Ingrese una descripcion basica del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='telefono'>Telefono</FormLabel>
        <Input id='telefono' type='text' size='sm' defaultValue={edit_object['telefono']} {...register('telefono')} />
        <FormHelperText>Ingrese el Telefono del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' size='sm' defaultValue={edit_object['email']} {...register('email')} />
        <FormHelperText>Ingrese el Email del Cliente</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='direccion'>Direccion</FormLabel>
        <Input id='direccion' type='text' size='sm' defaultValue={edit_object['direccion']} {...register('direccion')} />
        <FormHelperText>Ingrese una direccion del Cliente</FormHelperText>
      </FormControl>
    <WrapperButton>
      <Button colorScheme='red' isLoading={isLoading} onClick={(e)=>{deleteAction(e)}}>
        Borrar
      </Button>
      <Button colorScheme='green'  type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
      
      </WrapperButton>
    </Container>
  )
}

export default EditCliente
