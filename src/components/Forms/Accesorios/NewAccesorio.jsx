import { Button, FormControl, FormHelperText, FormLabel, Input, Select, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {getDataProveedor, saveDataAccesorio } from '../../../reducer/DataTablesSlice'
import { ErrorMsg, TitleGroupInput, Container } from '../../Styled/StyledFormsAdds'
import { UniqueFlexRow, WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const NewAccesorio = () => {
  const { register, handleSubmit, reset } = useForm()
  const [isLoading, setLoading] = useState(false)

  const toast = useToast()
  const [error, setError] = useState('')
  const dispatch = useDispatch()

  const proveedores = useSelector((state) => state.DataTables.proveedores)


  useEffect(() => {
    dispatch(getDataProveedor())
  }, [dispatch])


  //GUARDAR ACCESORIO
  const onSubmit = async (datos) => {
    datos.iva = checkedIVA
    datos.precio = precio
    setLoading(true)
    await dispatch(saveDataAccesorio(datos))
    setLoading(false)
    toast({
      title: `Accesorio Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setPrecio(0)
    setPorcentaje(0)
    setError('')
  }

  // CALCULATED PRICE METHOD
  const [checkedIVA, setCheckedIVA] = useState('1')
  const [costo, setCosto] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)
  const [precio, setPrecio] = useState(0)

  useEffect(() => {
    setPrecio(Math.round(costo * (1 + porcentaje / 100) * +checkedIVA * 100 )/100)
  }, [checkedIVA, costo, porcentaje])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TitleGroupInput>Nuevo Accesorio </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='codigo'>Codigo</FormLabel>
          <Input id='codigo' type='text' size='sm' {...register('codigo')} />
          <FormHelperText>Ingrese el codigo del Accesorio</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el Nombre del Accesorio</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='descripcion'>Descripcion</FormLabel>
          <Input id='descripcion' type='text' size='sm' {...register('descripcion')} />
          <FormHelperText>Ingrese una breve descripcion del Accesorio</FormHelperText>
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
            <option value='burlete'>Burletes</option>
            <option value='felpa'>Felpas</option>
            <option value='herraje'>Herrajes</option>
            <option value='buloneria'>Buloneria</option>
            <option value='cerradura'>Cerraduras</option>
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
      <UniqueFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='unidad'>Unidad de Medida</FormLabel>
          <Select
            placeholder='Seleccione una unidad de Medida'
            defaultValue='unidades'
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
        <FormControl >
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
        Guardar
      </Button>
    </Container>
  )
}

export default NewAccesorio
