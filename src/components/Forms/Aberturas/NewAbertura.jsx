import { SearchIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPieza, saveDataGrupo } from '../../../reducer/DataTablesSlice'
import { removeAllSelected, setDataInfo, updateStateModal } from '../../../reducer/UiSlice'
import TagSelected from '../../TagSelected'
import AccesoriosAdd from './AccesoriosAdd'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const NewAbertura = ({ accesorios }) => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const [arrayAccesorios, setArrayAccesorios] = useState([])
  const toast = useToast()
  const dispatch = useDispatch()

  const data_selected = useSelector((state) => state.UiSlice.modalAux.data_selected)

  //Guardar Perfil Nuevo
  const onSubmit = async (data) => {
    setLoading(true)
    data.piezas = data_selected
    data.accesorios = arrayAccesorios
    await dispatch(saveDataGrupo(data))
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(removeAllSelected()) // Borrar piezas Seleccionadas
    toast({
      title: `Abertura Guardada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  // GET DATA FROM PIEZAS
  const data_piezas = useSelector((state) => state.DataTables.piezas)
  useEffect(() => {
    dispatch(getDataPieza())
  }, [dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el nombre de la Abertura</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <Button
          leftIcon={<SearchIcon />}
          colorScheme='teal'
          variant='solid'
          onClick={() => {
            dispatch(setDataInfo({ open: true, data_info: data_piezas, select: true }))
          }}
        >
          Buscar Piezas
        </Button>
        <FormHelperText>Seleccione Piezas para esta Abertura</FormHelperText>
      </FormControl>
      <FormControl>
        <TagSelected />
      </FormControl>
      {/* ACCESORIOS */}
      <AccesoriosAdd accesorios={accesorios}   arrayAccesorios={arrayAccesorios} setArrayAccesorios={setArrayAccesorios}/>
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
          <option value='puertas'>Puertas</option>
          <option value='ventanas'>Ventanas</option>
          <option value='marcos'>Marcos</option>
          <option value='otro'>Otro</option>
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='linea'>Linea</FormLabel>
        <Select placeholder='Seleccione una Linea' defaultValue='' id='linea' size='sm' {...register('linea')}>
          <option value=''>Sin Linea</option>
          <option value='herrero'>Herrero</option>
          <option value='herrero pesado'>Herrero Pesado</option>
          <option value='modena'>Modena</option>
          <option value='otro'>Otro</option>
        </Select>
      </FormControl>
      <Button type='submit' isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewAbertura
