import { SearchIcon } from '@chakra-ui/icons'
import {  Button, FormControl, FormHelperText, FormLabel, Input,  useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPieza, removeDataGrupo, updateDataGrupo } from '../../../reducer/DataTablesSlice'
import { removeAllSelected, setDataInfo, setDataSelected, setEditModal, updateStateModal } from '../../../reducer/UiSlice'
import TagSelected from '../../TagSelected'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditAberturas = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)
  const data_selected = useSelector(state=> state.UiSlice.modalAux.data_selected)

  //Editar Grupo
  const onSubmit = async (data) => {
    data._id = edit_object._id
    data.piezas = data_selected
    setLoading(true)
    dispatch(updateDataGrupo(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    dispatch(removeAllSelected())// Borrar piezas Seleccionadas
    toast({
      title: `Abertura Actualizada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const deleteAction = (e) => {
    e.preventDefault()
    dispatch(removeDataGrupo(edit_object._id))
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    dispatch(removeAllSelected())// Borrar piezas Seleccionadas
    toast({
      title: `Abertura Borrada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }


  // GET DATA FROM PIEZAS
  const data_piezas= useSelector((state) => state.DataTables.piezas)
  useEffect(() => {
    dispatch(getDataPieza())
    edit_object.piezas.forEach(pieza => {
        dispatch(setDataSelected(pieza))
    });
  }, [dispatch,edit_object.piezas])



  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
 <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' defaultValue={edit_object['nombre']} {...register('nombre')} />
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
        <Input id='categoria' type='text' size='sm' defaultValue={edit_object['categoria']} {...register('categoria')} />
        <FormHelperText>Ingrese la categoria del Grupo</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='modelo'>Modelo</FormLabel>
        <Input id='modelo' type='text' size='sm' defaultValue={edit_object['modelo']} {...register('modelo')} />
        <FormHelperText>Ingrese el modelo del Grupo</FormHelperText>
      </FormControl>
      <WrapperButton>
        <Button
          colorScheme='red'
          isLoading={isLoading}
          onClick={(e) => {
            deleteAction(e)
          }}
        >
          Borrar
        </Button>
        <Button colorScheme='green' type='submit' isLoading={isLoading}>
          Guardar Cambios
        </Button>
      </WrapperButton>
    </Container>
  )
}

export default EditAberturas
