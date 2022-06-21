import { SearchIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input,useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPieza, saveDataGrupo} from '../../../reducer/DataTablesSlice'
import { removeAllSelected, setDataInfo, updateStateModal } from '../../../reducer/UiSlice'
import TagSelected from '../../TagSelected'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewAbertura = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const data_selected = useSelector(state=> state.UiSlice.modalAux.data_selected)

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    data.piezas = data_selected
    await dispatch(saveDataGrupo(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(removeAllSelected())// Borrar piezas Seleccionadas
    toast({
      title: `Abertura Guardada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  // GET DATA FROM PIEZAS
  const data_piezas= useSelector((state) => state.DataTables.piezas)
  useEffect(() => {
    dispatch(getDataPieza())
  }, [dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
     <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el nombre del Grupo</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <Button leftIcon={<SearchIcon />} colorScheme='teal' variant='solid' onClick={() => {dispatch(setDataInfo({open:true, data_info:data_piezas, select:true}))}}>
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
    </Container>
  )
}

export default NewAbertura
