import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { saveDataCliente, updateDataCliente } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'



const EditCliente = ({ data_edit, setDataEdit }) => {
  //React Hook form
  const { register, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    data._id = data_edit._id
    setLoading(true)
    dispatch(updateDataCliente(data)) // Update call
    setLoading(false)
    reset()
    setError('')
    setDataEdit(false)
    toast({
      title: `Cliente Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const guardarCopia = async (e) => {
    e.preventDefault()
    const data = getValues()
    data.nombre = data.nombre + ' COPIA'
    setLoading(true)
    await dispatch(saveDataCliente(data))
    setLoading(false)
    toast({
      title: `Cliente Copiado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
    setDataEdit(false)
  }

  useEffect(() => {
    reset() // eslint-disable-next-line
  }, [data_edit])
  

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Editar Cliente </TitleGroupInput>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')}  defaultValue={data_edit['nombre']}/>
          <FormHelperText>Ingrese el Nombre del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')}  defaultValue={data_edit['descripcion']}/>
          <FormHelperText>Ingrese una descripcion basica del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='telefono'>Telefono</FormLabel>
          <Input id='telefono' type='text' size='sm' {...register('telefono')}  defaultValue={data_edit['telefono']} />
          <FormHelperText>Ingrese el Telefono del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' type='email' size='sm' {...register('email')}  defaultValue={data_edit['email']}/>
          <FormHelperText>Ingrese el Email del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='direccion'>Direccion</FormLabel>
          <Input id='direccion' type='text' size='sm' {...register('direccion')}  defaultValue={data_edit['direccion']}/>
          <FormHelperText>Ingrese una direccion del Cliente</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <Stack direction='row' spacing={4} align='center'>
        <Button type='submit' isLoading={isLoading} colorScheme='teal'>
          Guardar Cambios
        </Button>
        <Button isLoading={isLoading} colorScheme='blue' onClick={(e) => guardarCopia(e)}>
          Guardar Copia
        </Button>
      </Stack>
    </Container>
  )
}

export default EditCliente
