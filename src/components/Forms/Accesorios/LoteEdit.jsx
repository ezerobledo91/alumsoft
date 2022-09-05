import React from 'react'
import { UniqueFlexRow } from '../../Styled/StyledGenericLayout'
import {TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateDataAccesorioAll} from '../../../reducer/DataTablesSlice'


const LoteEdit = () => {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()
  const toast = useToast()

  const onSubmit = async (data) => {
  
    await dispatch(updateDataAccesorioAll(data.porcentaje))
    toast({
      title: `Accesorios Actualizados Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()

  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
    <TitleGroupInput>Editor de Lotes </TitleGroupInput>
    <UniqueFlexRow>
      <FormControl isRequired>
        <FormLabel htmlFor='porcentaje'>Porcentaje Aumento</FormLabel>
        <Input id='porcentaje' type='number' size='sm' {...register('porcentaje')} />
        <FormHelperText>Ingrese el Porcentaje de Aumento </FormHelperText>
      </FormControl>
    </UniqueFlexRow>
    <Button type='submit' colorScheme='teal'>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default LoteEdit