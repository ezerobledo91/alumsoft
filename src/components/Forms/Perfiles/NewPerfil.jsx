import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProveedor, saveDataPerfil } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow, WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const NewPerfil = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setLoading] = useState(false)
  const proveedores = useSelector(state => state.DataTables.proveedores)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  //GUARDAR CLIENTE
  const onSubmit = async (data) => {
    setLoading(true)
    await dispatch(saveDataPerfil(data))
    setLoading(false)
    toast({
      title: `Perfil Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
  }

  useEffect(()=>{
    dispatch(getDataProveedor())
  },[dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Nuevo Perfil </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='codigo'>Codigo</FormLabel>
          <Input id='codigo' type='number' size='sm' {...register('codigo')} />
          <FormHelperText>Ingrese el codigo del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
          <FormHelperText>Ingrese una Descripcion</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      <WrapperFlexRow>
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
        <FormControl>
          <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
          <Select
            placeholder='Seleccione un Proveedor'
            defaultValue=''
            id='proveedor'
            size='sm'
            {...register('proveedor')}
          >
            <option value=''>Sin Proveedor</option>
            {proveedores.map((proveedor, i) => (
              <option key={i} value={proveedor.nombre}>
                {proveedor.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
      </WrapperFlexRow>
      <WrapperFlexRow>
        <FormControl>
          <FormLabel htmlFor='alto'>Alto</FormLabel>
          <Input id='alto' type='number' size='sm' step='any' {...register('alto')} />
          <FormHelperText>Ingrese el alto del Perfil</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='ancho'>Ancho</FormLabel>
          <Input id='ancho' type='number' size='sm' step='any' {...register('ancho')} />
          <FormHelperText>Ingrese el Ancho del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='peso'>Peso</FormLabel>
          <Input id='peso' type='number' size='sm' step='any' {...register('peso')} />
          <FormHelperText>Ingrese el peso del Perfil por metro lineal</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='largo_std'>Largo Estandar</FormLabel>
          <Input id='largo_std' type='number' size='sm' step='any' {...register('largo_std')} />
          <FormHelperText>Ingrese el Largo Estandar del Perfil</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='costo_u'>Costo Unitario</FormLabel>
          <Input id='costo_u' type='number' step='any' size='sm' {...register('costo_u')} />
          <FormHelperText>Ingrese costo unitario</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='precio_u'>Precio Unitario</FormLabel>
          <Input id='precio_u' type='number' step='any' size='sm' {...register('precio_u')} />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar
      </Button>
    </Container>
  )
}

export default NewPerfil
