import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { saveDataProveedor, updateDataProveedor } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'


const EditProveedor = ({ data_edit, setDataEdit }) => {
  //React Hook form
  const { register, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    data._id = data_edit._id
    setLoading(true)
    dispatch(updateDataProveedor(data)) // Update call
    setLoading(false)
    reset()
    setError('')
    setDataEdit(false)
    toast({
      title: `Proveedor Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const guardarCopia = async (e) => {
    e.preventDefault()
    const data = getValues()
    data.nombre = data.nombre + ' COPIA'
    setLoading(true)
    await dispatch(saveDataProveedor(data))
    setLoading(false)
    toast({
      title: `Proveedor Copiado Correctamente`,
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
      <TitleGroupInput> Edit Proveedor </TitleGroupInput>
      <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm'  defaultValue={data_edit['nombre']} {...register('nombre')} />
        <FormHelperText>Ingrese el Nombre del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm'  defaultValue={data_edit['descripcion']} {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion basica del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='categoria'>Categoria</FormLabel>
        <Select
          placeholder='Seleccione una categoria'
          id='categoria'
          size='sm'
          multiple={false}
           defaultValue={data_edit['categoria']} {...register('categoria')}
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
        <Input id='telefono' type='text' size='sm'  defaultValue={data_edit['telefono']} {...register('telefono')} />
        <FormHelperText>Ingrese el Telefono del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input id='email' type='email' size='sm'  defaultValue={data_edit['email']} {...register('email')} />
        <FormHelperText>Ingrese el Email del Proveedor</FormHelperText>
      </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
      <FormControl>
        <FormLabel htmlFor='web'>Web</FormLabel>
        <Input id='web' type='text' size='sm'  defaultValue={data_edit['web']} {...register('web')} />
        <FormHelperText>Ingrese sitio Web del Proveedor</FormHelperText>
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

export default EditProveedor
