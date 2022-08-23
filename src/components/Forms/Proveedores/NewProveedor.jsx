import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { saveDataProveedor } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'


const NewProveedor = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setLoading] = useState(false)

  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  //GUARDAR CLIENTE
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataProveedor(data))
    setLoading(false)
    toast({
      title: `Proveedor Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Nuevo Proveedor </TitleGroupInput>
      <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el Nombre del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion basica del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
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
          <option value='perfiles'>Perfiles</option>
          <option value='vidrios'>Vidrios</option>
          <option value='accesorios'>Accesorios</option>
          <option value='otro'>Otro</option>
        </Select>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl>
        <FormLabel htmlFor='telefono'>Telefono</FormLabel>
        <Input id='telefono' type='text' size='sm' {...register('telefono')} />
        <FormHelperText>Ingrese el Telefono del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' size='sm' {...register('email')} />
        <FormHelperText>Ingrese el Email del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl>
        <FormLabel htmlFor='web'>Web</FormLabel>
        <Input id='web' type='text' size='sm' {...register('web')} />
        <FormHelperText>Ingrese sitio Web del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar
      </Button>
    </Container>
  )
}

export default NewProveedor
