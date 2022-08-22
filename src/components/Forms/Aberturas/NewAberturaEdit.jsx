import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAccesorio, getDataPerfil, saveDataAbertura, updateDataAbertura } from '../../../reducer/DataTablesSlice'
import { TitleGroupInput, Container, ErrorMsg } from '../../Styled/StyledFormsAdds'
import { WrapperFlexRow } from '../../Styled/StyledGenericLayout'
import AccesoriosAdd from './AccesoriosAdd'
import PerfilesAdd from './PerfilesAdd'

const NewAberturaEdit = ({data_edit, setDataEdit}) => {
  const { register, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const [arrayAccesorios, setArrayAccesorios] = useState([])
  const [arrayPerfiles, setArrayPerfiles] = useState([])
  const toast = useToast()
  const [error, setError] = useState('')

  // GET DATA FROM REDUX
  const dispatch = useDispatch()
  const data = useSelector((state) => state.DataTables)
  const accesorios = data.accesorios
  const perfiles = data.perfiles

   // GET PERFILES Y ACCESORIOS DE API 
  useEffect(() => {
    dispatch(getDataPerfil())
    dispatch(getDataAccesorio())
  }, [dispatch])

  // CUANDO RECIBIMOS NUEVOS DATOS RESET FORM Y ASIGNAR VALORES EN ARRAYS 
  useEffect(()=>{
    reset()
    setArrayAccesorios(data_edit.accesorios)
    setArrayPerfiles(data_edit.piezas) // eslint-disable-next-line
  },[data_edit])

  const onSubmit = async (data) => {
    if (arrayPerfiles.length === 0) {
      setError('Debe añadir por lo menos un perfil como pieza de la Abertura.')
      return
    }
  
    data.piezas = arrayPerfiles
    data.accesorios = arrayAccesorios
    data._id = data_edit._id
    setLoading(true)
    await dispatch(updateDataAbertura(data))
    setLoading(false)
    toast({
      title: `Abertura Actualizada Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()  
    setArrayAccesorios([])
    setArrayPerfiles([])
    setError('')
    setDataEdit(false)
  }


  const guardarCopia = async (e) =>{
     e.preventDefault() 
     const data = getValues()
     if (arrayPerfiles.length === 0) {
      setError('Debe añadir por lo menos un perfil como pieza de la Abertura.')
      return
    }
  
    data.piezas = arrayPerfiles
    data.accesorios = arrayAccesorios
    data.nombre = data.nombre + ' COPIA'
    setLoading(true)
    await dispatch(saveDataAbertura(data))
    setLoading(false)
    toast({
      title: `Abertura Copiada Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()  
    setArrayAccesorios([])
    setArrayPerfiles([])
    setError('')
    setDataEdit(false)
  }


  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Editar Abertura </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} defaultValue={data_edit['nombre']} />
          <FormHelperText>Ingrese el nombre de la Abertura</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='categoria'>Categoria</FormLabel>
          <Select
            placeholder='Seleccione una categoria'
            id='categoria'
            size='sm'
            {...register('categoria')} defaultValue={data_edit['categoria']} 
          >
            <option value='puertas'>Puertas</option>
            <option value='ventanas'>Ventanas</option>
            <option value='marcos'>Marcos</option>
            <option value='otro'>Otro</option>
          </Select>
          <FormHelperText>Seleccione una Categoría</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='linea'>Linea</FormLabel>
          <Select placeholder='Seleccione una Linea' id='linea' size='sm' {...register('linea')} defaultValue={data_edit['linea']} >
            <option value='herrero'>Herrero</option>
            <option value='herrero pesado'>Herrero Pesado</option>
            <option value='modena'>Modena</option>
            <option value='otro'>Otro</option>
          </Select>
          <FormHelperText>Seleccione una Linea</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      {/* PERFILES */}
      <PerfilesAdd perfiles={perfiles} arrayPerfiles={arrayPerfiles} setArrayPerfiles={setArrayPerfiles} />
      <ErrorMsg>{error}</ErrorMsg>
      {/* ACCESORIOS */}
      <AccesoriosAdd
        accesorios={accesorios}
        arrayAccesorios={arrayAccesorios}
        setArrayAccesorios={setArrayAccesorios}
      />
    <Stack direction='row' spacing={4} align='center'>
      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar Cambios
      </Button>
      <Button isLoading={isLoading} colorScheme='blue' onClick={(e)=>guardarCopia(e)}>
        Guardar Copia
      </Button>
      </Stack>
    </Container>
  )
}

export default NewAberturaEdit
