import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { saveDataCliente } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'

const NewCliente = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setLoading] = useState(false)

  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  //GUARDAR CLIENTE
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataCliente(data))
    setLoading(false)
    toast({
      title: `Cliente Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
       <TitleGroupInput>Nuevo Cliente </TitleGroupInput>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
          <FormHelperText>Ingrese una descripcion basica del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='telefono'>Telefono</FormLabel>
          <Input id='telefono' type='text' size='sm' {...register('telefono')} />
          <FormHelperText>Ingrese el Telefono del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' type='email' size='sm' {...register('email')} />
          <FormHelperText>Ingrese el Email del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='direccion'>Direccion</FormLabel>
          <Input id='direccion' type='text' size='sm' {...register('direccion')} />
          <FormHelperText>Ingrese una direccion del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar
      </Button>
    </Container>
  )
}

export default NewCliente
