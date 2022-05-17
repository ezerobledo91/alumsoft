import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { close } from '../../reducer/modalSlice'

import { saveDataAsync } from '../../reducer/newDataGrupoSlice'
import { SearchIcon } from '@chakra-ui/icons'
import ModalAdd from '../ModalAdd'
import TagSelected from '../TagSelected'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewGrupoForm = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  //Guardar Pieza Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    dispatch(saveDataAsync(data))
    setLoading(false)
    dispatch(close()) // Close Modal
    toast({
      title: `Grupo Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const [open, openModalPiezas] = useState(false)

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el nombre del Grupo</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <Button leftIcon={<SearchIcon />} colorScheme='teal' variant='solid' onClick={() => openModalPiezas(true)}>
          Buscar Piezas
        </Button>
        <FormHelperText>Seleccione Piezas para este Grupo</FormHelperText>
      </FormControl>
      <FormControl>
        <TagSelected />
      </FormControl>

      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
      <ModalAdd open={open} updateOnClose={openModalPiezas}></ModalAdd>
    </Container>
  )
}

export default NewGrupoForm
