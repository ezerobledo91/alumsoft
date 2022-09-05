import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getDataProveedor, saveDataVidrio } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow, WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const NewVidrio = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setLoading] = useState(false)
  const proveedores = useSelector((state) => state.DataTables.proveedores)
  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  // CALCULATED PRICE METHOD
  const [checkedIVA, setCheckedIVA] = useState('1')
  const [costo, setCosto] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)
  const [precio, setPrecio] = useState(0)

  //GUARDAR CLIENTE
  const onSubmit = async (data) => {
    data.iva = checkedIVA
    data.precio = precio
    setLoading(true)

    await dispatch(saveDataVidrio(data))
    setLoading(false)
    toast({
      title: `Vidrio Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setPrecio(0)
    setPorcentaje(0)
    setError('')
  }

  useEffect(() => {
    dispatch(getDataProveedor())
  }, [dispatch])

  useEffect(() => {
    setPrecio(Math.round(costo * (1 + porcentaje / 100) * +checkedIVA * 100) / 100)
  }, [checkedIVA, costo, porcentaje])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Nuevo Vidrio </TitleGroupInput>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Vidrio</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='espesor'>Espesor en mm</FormLabel>
          <Input id='espesor' type='number' step='any' size='sm' {...register('espesor')} />
          <FormHelperText>Ingrese el espesor del Vidrio</FormHelperText>
        </FormControl>
      </UniqueFlexRow>
      <UniqueFlexRow>
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
            onChange={(e) => setCosto(e.target.value)}
          />
          <FormHelperText>Ingrese precio unitario</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='IVA'>Incluir IVA</FormLabel>
          <Select onChange={(e) => setCheckedIVA(e.target.value)}>
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
      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar Cambios
      </Button>
    </Container>
  )
}

export default NewVidrio
