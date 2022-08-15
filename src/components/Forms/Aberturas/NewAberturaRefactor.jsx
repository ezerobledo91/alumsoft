import { SearchIcon } from '@chakra-ui/icons'
import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataAccesorio, getDataPerfil, saveDataAbertura } from '../../../reducer/DataTablesSlice'
import TagSelected from '../../TagSelected'
import AccesoriosAdd from './AccesoriosAdd'
import PerfilesAdd from './PerfilesAdd'



const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px;
`

const NewAberturaRefactor = () => {
    const { register, handleSubmit } = useForm()
    const [isLoading, setLoading] = useState(false)
    const [arrayAccesorios, setArrayAccesorios] = useState([])
    const [arrayPerfiles, setArrayPerfiles] = useState([])
    const toast = useToast()

    // GET DATA FROM REDUX 
     const dispatch = useDispatch()
     const data = useSelector((state) => state.DataTables)
     const accesorios = data.accesorios
     const perfiles = data.perfiles

    useEffect(() => {
    dispatch(getDataPerfil())
    dispatch(getDataAccesorio())

    }, [dispatch])

    const onSubmit = async (data) => {
         data.piezas = arrayPerfiles
        data.accesorios = arrayAccesorios
        setLoading(true)
        await dispatch(saveDataAbertura(data))
        setLoading(false)
        toast({
          title: `Abertura Guardada Correctamente`,
          status: 'success',
          isClosable: true,
        })
      }
 

  return (

    <Container onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel htmlFor='nombre'>Nombre</FormLabel>
        <Input id='nombre' type='text' size='sm' {...register('nombre')} />
        <FormHelperText>Ingrese el nombre de la Abertura</FormHelperText>
      </FormControl>
      <FormControl isRequired>
      </FormControl>
      <FormControl>
        <TagSelected />
      </FormControl>
      {/* ACCESORIOS */}
      <AccesoriosAdd
        accesorios={accesorios}
        arrayAccesorios={arrayAccesorios}
        setArrayAccesorios={setArrayAccesorios}
      />
      <PerfilesAdd perfiles={perfiles} arrayPerfiles={arrayPerfiles} setArrayPerfiles={setArrayPerfiles}/>
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
      <Button type='submit'  isLoading={isLoading}>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewAberturaRefactor
