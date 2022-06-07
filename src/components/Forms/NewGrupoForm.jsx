import { Button, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { close } from '../../reducer/modalSlice'

import { saveDataAsync } from '../../reducer/newDataGrupoSlice'
import { SearchIcon } from '@chakra-ui/icons'
import ModalAdd from '../ModalAdd'
import TagSelected from '../TagSelected'
import { update } from '../../reducer/selectedPiezasSlice'

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
  const selectedPiezas = useSelector((state) => state.selectedPiezasSlice) //Estado de la app en todo momento

  //Guardar Pieza Nuevo
  const onSubmit = async (data) => {
    if (selectedPiezas.piezas.length <= 0) return
    setLoading(true)
    data.piezas = selectedPiezas.piezas.map((item) => item._id)
    dispatch(saveDataAsync(data))
    setLoading(false)
    dispatch(update())
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
      <FormControl isRequired>
        <FormLabel htmlFor='categoria'>Categoria</FormLabel>
        <Input id='categoria' type='text' size='sm' {...register('categoria')} />
        <FormHelperText>Ingrese la categoria del Grupo</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='modelo'>Modelo</FormLabel>
        <Input id='modelo' type='text' size='sm' {...register('modelo')} />
        <FormHelperText>Ingrese el modelo del Grupo</FormHelperText>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
      <ModalAdd open={open} updateOnClose={openModalPiezas}></ModalAdd>
    </Container>
  )
}

export default NewGrupoForm
