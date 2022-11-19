import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { getDataAbertura } from '../../../reducer/DataTablesSlice'
import { Container, TitleGroupInput } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'
const updateAberturaLote = async (kg) => {
  let response = await fetch(`http://localhost:5000/api/abertura/updateall/${kg}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  })

  let result = await response.json()
  return result
}
const EditorLoteEstandar = () => {
  const { register, handleSubmit, reset } = useForm()
  const toast = useToast()
  const dispatch = useDispatch() 
  const onSubmit = async (data) => {
    const updateAbertura = await updateAberturaLote(data.kg)
    toast({
      title: `Aberturas Estandar Actualizadas Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    dispatch(getDataAbertura())
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Editor de Lotes </TitleGroupInput>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='porcentaje'>Precio kg Abertura</FormLabel>
          <Input id='porcentaje' type='number' size='sm' {...register('kg')} />
          <FormHelperText>Ingrese nuevo precio por Kg de Aluminio </FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <Button type='submit' colorScheme='teal'>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default EditorLoteEstandar
