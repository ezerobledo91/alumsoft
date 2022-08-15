import {Button, FormControl, FormHelperText, FormLabel, Input, Select, SimpleGrid, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { removeDataAccesorio, updateDataAccesorio } from '../../../reducer/DataTablesSlice'
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

const EditAccesorio = ({proveedores}) => {
  //React Hook form
  const { register, handleSubmit } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const { edit_object } = useSelector((state) => state.UiSlice.modalState)

  //Editar Abertura
  const onSubmit = async (data) => {
    data._id = edit_object._id
    setLoading(true)
    dispatch(updateDataAccesorio(data)) // Update call
    setLoading(false)
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Accesorio Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const deleteAction = (e) => {
    e.preventDefault()
    dispatch(removeDataAccesorio(edit_object._id))
    dispatch(updateStateModal(false)) // Close Modal
    dispatch(setEditModal({ edit: false, edit_object: {} }))
    toast({
      title: `Accesorio Borrado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid columns={2} spacing={10}>
      <FormControl isRequired>
          <FormLabel htmlFor='codigo'>Codigo</FormLabel>
          <Input id='codigo' type='text' size='sm' {...register('codigo')} defaultValue={edit_object['codigo']} />
          <FormHelperText>Ingrese el codigo del Accesorio</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} defaultValue={edit_object['nombre']}/>
          <FormHelperText>Ingrese el Nombre del Accesorio</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')} defaultValue={edit_object['descripcion']}/>
          <FormHelperText>Ingrese el descripcion del Accesorio</FormHelperText>
        </FormControl>
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
            <option value='burlete'>Burletes</option>
            <option value='felpa'>Felpas</option>
            <option value='herraje'>Herrajes</option>
            <option value='buloneria'>Buloneria</option>
            <option value='cerradura'>Cerraduras</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='unidad'>Unidad</FormLabel>
          <Select
            placeholder='Seleccione una unidad de Medida'
            defaultValue={edit_object['unidad']}
            id='unidad'
            size='sm'
            {...register('unidad')}
          >
            <option value='unidades'>Por unidad</option>
            <option value='metro'>Por Metro Lineal</option>
          </Select>
          <FormHelperText>
            Seleccione una opción con relación al uso. (Ej: Felpa / Burletes unidad por metro lineal)
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
          <Select
            placeholder='Seleccione un Proveedor'
            defaultValue={edit_object['proveedor']}
            id='proveedor'
            size='sm'
            {...register('proveedor')}
          >
            <option value=''>Sin Proveedor</option>
            {proveedores.map((proveedor,i)=> <option  key={i} value={proveedor.nombre}>{proveedor.nombre}</option>)}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='precio_u'>Precio unitario</FormLabel>
          <Input id='precio_u' type='number' step='any' size='sm' {...register('precio')} defaultValue={edit_object['precio']}/>
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
       </SimpleGrid>
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

export default EditAccesorio
