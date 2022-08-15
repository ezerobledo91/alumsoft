import { SearchIcon } from '@chakra-ui/icons'
import {  Button, FormControl, FormHelperText, FormLabel, Input,  Select,  useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPieza, removeDataAbertura, updateDataAbertura } from '../../../reducer/DataTablesSlice'
import { removeAllSelected, setDataInfo, setDataSelected, setEditModal, updateStateModal } from '../../../reducer/UiSlice'
import TagSelected from '../../TagSelected'
import AccesoriosAdd from './AccesoriosAdd'


const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditAberturas = ({accesorios}) => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const [arrayAccesorios, setArrayAccesorios] = useState([])
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)
  const data_selected = useSelector(state=> state.UiSlice.modalAux.data_selected)

  //Editar Abertura
  const onSubmit = async (data) => {
    data._id = edit_object._id
    data.piezas = data_selected
    data.accesorios = arrayAccesorios
    setLoading(true)
    dispatch(updateDataAbertura(data)) // Update call
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
    dispatch(removeDataAbertura(edit_object._id))
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


  useEffect(()=>{
    setArrayAccesorios(edit_object?.accesorios)
  },[edit_object])



  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
 <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' defaultValue={edit_object['nombre']} {...register('nombre')} />
        <FormHelperText>Ingrese el nombre  de la Abertura</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <Button leftIcon={<SearchIcon />} colorScheme='teal' variant='solid' onClick={() => {dispatch(setDataInfo({open:true, data_info:data_piezas, select:true}))}}>
          Buscar Piezas
        </Button>
        <FormHelperText>Seleccione Piezas para esta Abertura</FormHelperText>
      </FormControl>
      <FormControl>
        <TagSelected />
      </FormControl>
       {/* ACCESORIOS */}
       <AccesoriosAdd accesorios={accesorios}   arrayAccesorios={arrayAccesorios} setArrayAccesorios={setArrayAccesorios} />
      <FormControl isRequired>
            <FormLabel htmlFor='categoria'>Categoria</FormLabel>
            <Select
              placeholder='Seleccione una categoria'
              defaultValue={edit_object['categoria']}
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
            <Select
              placeholder='Seleccione una Linea'
              defaultValue={edit_object['linea']}
              id='linea'
              size='sm'
              {...register('linea')}
            >
              <option value=''>Sin Linea</option>
              <option value='herrero'>Herrero</option>
              <option value='herrero pesado'>Herrero Pesado</option>
              <option value='modena'>Modena</option>
              <option value='otro'>Otro</option>
            </Select>
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
