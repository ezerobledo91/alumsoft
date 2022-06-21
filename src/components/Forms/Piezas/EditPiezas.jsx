import {  Button, FormControl, FormHelperText, FormLabel, Input,  Select,  useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataPerfil,  removeDataPieza,  updateDataPieza } from '../../../reducer/DataTablesSlice'
import { setEditModal, updateStateModal } from '../../../reducer/UiSlice'

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const WrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
`

const EditPieza = () => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)

  //Editar Grupo
  const onSubmit = async (data) => {
    data._id = edit_object._id
    setLoading(true)
    dispatch(updateDataPieza(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Pieza Actualizada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const deleteAction = (e) => {
    e.preventDefault()
    dispatch(removeDataPieza(edit_object._id))
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Pieza Borrada Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }


    // GET DATA FROM PERFILES
    const newDataPerfil = useSelector((state) => state.DataTables.perfiles)
    useEffect(() => {
      dispatch(getDataPerfil())
    }, [dispatch])


  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
     <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm'  defaultValue={edit_object['nombre']}  {...register('nombre')} />
        <FormHelperText>Ingrese el nombre de la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='perfil'>Perfil</FormLabel>
        <Select placeholder='Select option' id='perfil' size='sm'  defaultValue={edit_object['perfil']._id}  {...register('perfil')}>
          {newDataPerfil.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                Codigo: {item.codigo} | {item.nombre}
              </option>
            )
          })}
        </Select>
        <FormHelperText>Seleccione un Perfil</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
        <Input id='descripcion' type='text' size='sm'  defaultValue={edit_object['descripcion']}  {...register('descripcion')} />
        <FormHelperText>Ingrese una descripcion de la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='categoria'>Categoria</FormLabel>
        <Input id='categoria' type='text' size='sm'  defaultValue={edit_object['categoria']}  {...register('categoria')} />
        <FormHelperText>Ingrese Categoria</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='modelo'>Modelo</FormLabel>
        <Input id='modelo' type='text' size='sm'  defaultValue={edit_object['modelo']}  {...register('modelo')} />
        <FormHelperText>Ingrese un Modelo para la Pieza</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='variable'>Variable</FormLabel>
        <Select placeholder='Select option' id='variable' size='sm'  defaultValue={edit_object['variable']}  {...register('variable')}>
          <option value='ancho'>Ancho</option>
          <option value='alto'>Alto</option>
          <option value='marco'>2 Alto + Ancho (Marcos)</option>
          <option value='fija'>Unidades Fijas</option>
          <option value='superficie'>Superficies</option>
        </Select>
        <FormHelperText>Seleccione una variable de medida</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='constante'>Constante</FormLabel>
        <Input id='constante' type='number' size='sm' step='0.01'  defaultValue={edit_object['constante_m']}  {...register('constante_m')} />
        <FormHelperText>Ingrese un constante para la Pieza (unidad x medida 1 x 1)</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor='cortes'>Cortes Necesarios</FormLabel>
        <Input id='cortes' type='number' size='sm'  defaultValue={edit_object['cortes']}  {...register('cortes')} />
        <FormHelperText>Ingrese la cantidad de cortes necesarios.</FormHelperText>
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

export default EditPieza
