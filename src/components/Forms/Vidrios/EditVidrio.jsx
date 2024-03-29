import { Button, FormControl, FormHelperText, FormLabel, Input, Select, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProveedor, saveDataVidrio, updateDataVidrio } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow, WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const EditVidrio = ({ data_edit, setDataEdit }) => {
  //React Hook form
  const { register, handleSubmit, reset, getValues } = useForm()
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const proveedores = useSelector((state) => state.DataTables.proveedores)
  // CALCULATED PRICE METHOD
  const [checkedIVA, setCheckedIVA] = useState('1')
  const [costo, setCosto] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)
  const [precio, setPrecio] = useState(0)

  useEffect(() => {
    dispatch(getDataProveedor())
  }, [dispatch])

  const onSubmit = async (data) => {
    data._id = data_edit._id
    data.iva = checkedIVA
    data.precio = precio
    setLoading(true)
    dispatch(updateDataVidrio(data)) // Update call
    setLoading(false)
    reset()
    setError('')
    setPorcentaje(0)
    setPrecio(0)
    setDataEdit(false)
    toast({
      title: `Vidrio Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const guardarCopia = async (e) => {
    e.preventDefault()
    const data = getValues()
    data.iva = checkedIVA
    data.precio = precio
    data.nombre = data.nombre + ' COPIA'
    setLoading(true)
    await dispatch(saveDataVidrio(data))
    setLoading(false)
    toast({
      title: `Vidrio Copiado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setError('')
    setPorcentaje(0)
    setPrecio(0)
    setDataEdit(false)
  }

  // CUANDO RECIBIMOS NUEVOS DATOS RESET FORM Y ASIGNAR VALORES EN ARRAYS
  useEffect(() => {
    setPrecio(data_edit['precio'])
    setPorcentaje(data_edit['porcentaje'])
    setCosto(data_edit['costo'])
  }, [data_edit])

  useEffect(() => {
    setPrecio(Math.round(costo * (1 + porcentaje / 100) * +checkedIVA * 100) / 100)
  }, [checkedIVA, costo, porcentaje])
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Editar Vidrio </TitleGroupInput>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} defaultValue={data_edit['nombre']} />
          <FormHelperText>Ingrese el Nombre del Vidrio</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='espesor'>Espesor en mm</FormLabel>
          <Input
            id='espesor'
            type='number'
            step='any'
            size='sm'
            {...register('espesor')}
            defaultValue={data_edit['espesor']}
          />
          <FormHelperText>Ingrese el espesor del Vidrio</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='categoria'>Categoria</FormLabel>
          <Select
            placeholder='Seleccione una categoria'
            id='categoria'
            size='sm'
            {...register('categoria')}
            defaultValue={data_edit['categoria']}
          >
            <option value=''>Sin Categoria</option>
            <option value='float'>Float</option>
            <option value='catedral'>Catedral</option>
            <option value='espejos'>Espejos</option>
            <option value='reflectivos'>Reflectivos</option>
            <option value='blindex'>Blindex</option>
            <option value='solar'>Solar</option>
            <option value='otro'>Otro</option>
          </Select>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl>
          <FormLabel htmlFor='proveedor'>Proveedor</FormLabel>
          <Select
            placeholder='Seleccione un Proveedor'
            id='proveedor'
            size='sm'
            {...register('proveedor')}
            defaultValue={data_edit['proveedor']}
          >
            <option value=''>Sin Proveedor</option>
            {proveedores.map((proveedor, i) => (
              <option key={i} value={proveedor.nombre}>
                {proveedor.nombre}
              </option>
            ))}
          </Select>
        </FormControl>
      </UniqueFlexRow>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='costo_u'>Costo unitario</FormLabel>
          <Input
            id='costo_u'
            type='number'
            step='any'
            size='sm'
            {...register('costo')}
            defaultValue={data_edit['costo']}
            onChange={(e) => setCosto(e.target.value)}
          />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='IVA'>Incluir IVA</FormLabel>
          <Select onChange={(e) => setCheckedIVA(e.target.value)} defaultValue={data_edit['iva']}>
            <option value='1'>Sin IVA</option>
            <option value='1.21'>IVA 21%</option>
          </Select>
          <FormHelperText> Incluir IVA en el Precio</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='procentaje'>Porcentaje Precio</FormLabel>
          <Input
            id='procentaje'
            type='number'
            step='any'
            size='sm'
            {...register('porcentaje')}
            defaultValue={data_edit['porcentaje']}
            onChange={(e) => setPorcentaje(e.target.value)}
          />
          <FormHelperText>Porcentaje sobre el costo.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='precio_u'>Precio unitario</FormLabel>
          <Input id='precio_u' type='number' step='any' size='sm' {...register('precio')} value={precio} />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
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

export default EditVidrio
