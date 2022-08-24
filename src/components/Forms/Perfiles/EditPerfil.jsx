import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProveedor, saveDataPerfil, updateDataPerfil } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow, WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const EditPerfil = ({ data_edit, setDataEdit }) => {
  //React Hook form
  const { register, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const proveedores = useSelector((state) => state.DataTables.proveedores)

  const onSubmit = async (data) => {
    data._id = data_edit._id
    setLoading(true)
    dispatch(updateDataPerfil(data)) // Update call
    setLoading(false)
    reset()
    setError('')
    setDataEdit(false)
    toast({
      title: `Perfil Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const guardarCopia = async (e) => {
    e.preventDefault()
    const data = getValues()
    data.nombre = data.nombre + ' COPIA'
    setLoading(true)
    await dispatch(saveDataPerfil(data))
    setLoading(false)
    toast({
      title: `Perfil Copiado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
    setDataEdit(false)
  }

  useEffect(() => {
    reset() // eslint-disable-next-line
  }, [data_edit])

  useEffect(() => {
    dispatch(getDataProveedor())
  }, [dispatch])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Editar Perfil </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='codigo'>Codigo</FormLabel>
          <Input id='codigo' type='number' size='sm' defaultValue={data_edit['codigo']} {...register('codigo')} />
          <FormHelperText>Ingrese el codigo del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' defaultValue={data_edit['nombre']} {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input
            id='descripcion'
            type='text'
            size='sm'
            defaultValue={data_edit['descripcion']}
            {...register('descripcion')}
          />
          <FormHelperText>Ingrese una Descripcion</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='categoria'>Categoria</FormLabel>
          <Select
            placeholder='Seleccione una categoria'
            id='categoria'
            size='sm'
            defaultValue={data_edit['categoria']}
            {...register('categoria')}
          >
            <option value=''>Sin Categoria</option>
            <option value='puertas'>Puertas</option>
            <option value='ventanas'>Ventanas</option>
            <option value='marcos'>Marcos</option>
            <option value='revestimientos'>Revestimientos</option>
            <option value='otro'>Otro</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='linea'>Linea</FormLabel>
          <Select
            placeholder='Seleccione una Linea'
            id='linea'
            size='sm'
            defaultValue={data_edit['linea']}
            {...register('linea')}
          >
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
            id='proveedor'
            size='sm'
            defaultValue={data_edit['proveedor']}
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
          <Input id='alto' type='number' size='sm' step='any' defaultValue={data_edit['alto']} {...register('alto')} />
          <FormHelperText>Ingrese el alto del Perfil</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='ancho'>Ancho</FormLabel>
          <Input
            id='ancho'
            type='number'
            size='sm'
            step='any'
            defaultValue={data_edit['ancho']}
            {...register('ancho')}
          />
          <FormHelperText>Ingrese el Ancho del Perfil</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='peso'>Peso</FormLabel>
          <Input id='peso' type='number' size='sm' step='any' defaultValue={data_edit['peso']} {...register('peso')} />
          <FormHelperText>Ingrese el peso del Perfil por metro lineal</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='largo_std'>Largo Estandar</FormLabel>
          <Input
            id='largo_std'
            type='number'
            size='sm'
            step='any'
            defaultValue={data_edit['largo_std']}
            {...register('largo_std')}
          />
          <FormHelperText>Ingrese el Largo Estandar del Perfil</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='costo_u'>Costo Unitario</FormLabel>
          <Input
            id='costo_u'
            type='number'
            step='any'
            size='sm'
            defaultValue={data_edit['costo_u']}
            {...register('costo_u')}
          />
          <FormHelperText>Ingrese costo unitario</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='precio_u'>Precio Unitario</FormLabel>
          <Input
            id='precio_u'
            type='number'
            step='any'
            size='sm'
            defaultValue={data_edit['precio_u']}
            {...register('precio_u')}
          />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <Stack direction='row' spacing={4} align='center'>
        <Button type='submit' isLoading={isLoading} colorScheme='teal'>
          Guardar Cambios
        </Button>
        <Button isLoading={isLoading} colorScheme='blue' onClick={(e) => guardarCopia(e)}>
          Guardar Copia
        </Button>
      </Stack>
    </Container>
  )
}

export default EditPerfil
