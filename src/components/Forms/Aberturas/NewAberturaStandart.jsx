import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { generateOptionGroups } from '../../../auxiliar/aux_functions'
import { getDataAccesorio, getDataPerfil, getDataVidrio, saveDataAbertura } from '../../../reducer/DataTablesSlice'
import {
  TitleGroupInput,
  Container,
  ErrorMsg,
  RequiredAsterisk,
  ButtonAdd,
  AreaAdds,
  WrapperItem,
  ButtonRemove,
  MutedText,
} from '../../Styled/StyledFormsAdds'
import { WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const NewAberturaStandart = () => {
  const { register, handleSubmit, getValues, reset, resetField } = useForm()
  const [isLoading, setLoading] = useState(false)
  const [arrayAccesorios, setArrayAccesorios] = useState([])
  const [arrayPerfiles, setArrayPerfiles] = useState([])
  const [revestimiento, setRevestimiento] = useState({ revestimiento_ml: 0 })
  const [precioKg, setPrecioKg] = useState(0)
  const [porcentaje, setPorcentaje] = useState(0)
  const [precio_revestimiento, setPrecioRevestimiento] = useState(0)
  const [vidrio, setVidrio] = useState({ vidrio_m2: 0 })
  const [precio_vidrio, setPrecioVidrio] = useState(0)
  const [precio_accesorios, setPrecioAccesorios] = useState(0)
  const [precio_total_perfiles, setPrecioPerfiles] = useState(0)

  const [total, setTotal] = useState(0)

  const toast = useToast()
  const [error, setError] = useState('')

  // GET DATA FROM REDUX
  const dispatch = useDispatch()
  const data = useSelector((state) => state.DataTables)
  const accesorios = data.accesorios
  const perfiles = data.perfiles
  const vidrios = data.vidrios
  const revestimientos = perfiles.filter((perfil) => perfil.categoria === 'revestimientos')

  // GET PERFILES Y ACCESORIOS DE API
  useEffect(() => {
    dispatch(getDataPerfil())
    dispatch(getDataAccesorio())
    dispatch(getDataVidrio())
  }, [dispatch])

  // ------- Aniadir perfiles y borrar perfiles -------
  const addPerfil = () => {
    const data_form_perfil = getValues(['codigo', 'largo'])
    const perfil = perfiles.find((p) => p.codigo === +data_form_perfil[0])
    if (!perfil || data_form_perfil[1] === '') {
      setError('Debe seleccionar un perfil y colocar un largo total')
      return
    }
    setArrayPerfiles([...arrayPerfiles, { ...perfil, largo: data_form_perfil[1] }])
    setError('')
    resetField('codigo')
    resetField('largo')
  }

  const deletePerfil = (id) => {
    setArrayPerfiles([...arrayPerfiles.filter((p) => p._id !== id)])
  }

  // ------- Añadir perfiles y borrar perfiles -------
  // ------- Add Accesorios y delete accesorios --------------
  const addAccesorio = () => {
    const data_form_acc = getValues(['codigo_acc', 'cantidad_acc'])
    const accesorio = accesorios.find((a) => a.codigo === data_form_acc[0])
    if (!accesorio || data_form_acc[1] === '') {
      setError('Debe seleccionar un accesorio y una catidad')
      return
    }
    setArrayAccesorios([...arrayAccesorios, { ...accesorio, cantidad: data_form_acc[1] }])
    setError('')
    resetField('codigo_acc')
    resetField('cantidad_acc')
  }

  const deleteFunctionAccesorios = (id) => {
    setArrayAccesorios([...arrayAccesorios.filter((p) => p._id !== id)])
  }

  // ------- Add Accesorios  y delete --------------

  // GUARDAR ABERTURA
  const onSubmit = async (data) => {
    if (arrayPerfiles.length === 0) {
      setError('Debe Seleccionar por lo menos un perfil')
      return
    }
    data.precio_total = precio_total_perfiles
    data.piezas = arrayPerfiles
    data.accesorios = arrayAccesorios
    data.tipo = 'estandar'
    data.total = total
    setLoading(true)
    await dispatch(saveDataAbertura(data))
    setLoading(false)
    toast({
      title: `Abertura Estandar Guardada Correctamente`,
      status: 'success',
      isClosable: true,
    })
    reset()
    setArrayAccesorios([])
    setArrayPerfiles([])
    setPrecioRevestimiento(0)
    setPrecioVidrio(0)

    setError('')
  }

  // CUANDO CAMBIA UN VIDRIO O REVESTIMIENTO
  useEffect(() => {
    const r_selected = revestimientos.find((r) => r.codigo === +revestimiento.revestimiento_cod)
    if (r_selected) {
      let precio = r_selected.peso * revestimiento.revestimiento_ml * (porcentaje / 100 + 1) * precioKg
      setPrecioRevestimiento(precio)
      return
    }

    setPrecioRevestimiento(0)
  }, [revestimiento, precioKg, porcentaje, revestimiento.revestimiento_cod])

  // CUANDO CAMBIA UN VIDRIO O REVESTIMIENTO
  useEffect(() => {
    const v_selected = vidrios.find((v) => v.nombre === vidrio.vidrio_cod)
    if (v_selected) {
      setPrecioVidrio(v_selected.precio * vidrio.vidrio_m2)
      return
    }
    setPrecioVidrio(0)
  }, [vidrio])

  useEffect(() => {
    setPrecioAccesorios(Math.round(arrayAccesorios.map((a) => a.precio).reduce((a, b) => a + b, 0)))
  }, [arrayAccesorios])

  useEffect(() => {
    setPrecioPerfiles(
      Math.round(
        arrayPerfiles.map((p) => p.peso * p.largo).reduce((a, b) => a + b, 0) * precioKg * (porcentaje / 100 + 1)
      )
    )
  }, [arrayPerfiles, precioKg, porcentaje])

  useEffect(() => {
    setTotal(Math.round(precio_vidrio + precio_accesorios + precio_total_perfiles + precio_revestimiento))
  }, [arrayAccesorios, arrayPerfiles, precio_vidrio, precio_accesorios, precio_revestimiento, precio_total_perfiles])

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {/* ----------------------- MEDIDAS Y GENERAL ------------------------*/}
      <TitleGroupInput>Nueva Abertura Estandar </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Nombre</FormLabel>
          <Input id='nombre' type='text' size='sm' {...register('nombre')} />
          <FormHelperText>Ingrese el nombre de la Abertura</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='categoria'>Categoria</FormLabel>
          <Select
            placeholder='Seleccione una categoria'
            defaultValue=''
            id='categoria'
            size='sm'
            {...register('categoria')}
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
          <Select placeholder='Seleccione una Linea' defaultValue='' id='linea' size='sm' {...register('linea')}>
            <option value='herrero'>Herrero</option>
            <option value='herrero pesado'>Herrero Pesado</option>
            <option value='modena'>Modena</option>
            <option value='otro'>Otro</option>
          </Select>
          <FormHelperText>Seleccione una Linea</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor='ancho'>
            Ancho <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input id='ancho' type='number' size='sm' step='any' {...register('ancho')} />
          <FormHelperText>Ancho Abertura</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='alto'>
            Alto <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input id='alto' type='number' size='sm' step='any' {...register('alto')} />
          <FormHelperText>Alto Abertura</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      {/* ----------------------- MEDIDAS Y GENERAL  ------------------------*/}
      {/* ----------------------- PERFILES ------------------------*/}
      <TitleGroupInput>Perfiles </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl>
          <FormLabel htmlFor='nombre'>
            Perfiles <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Select
            placeholder='Seleccione un Perfil'
            defaultValue=''
            id='nombre'
            size='sm'
            multiple={false}
            {...register('codigo')}
          >
            {generateOptionGroups(perfiles, 'categoria', 'codigo', 'nombre')}
          </Select>
          <FormHelperText>Perfil que vamos a utilizar</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='largo'>
            Largo <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input id='largo' type='number' size='sm' step='any' {...register('largo')} />
          <FormHelperText>Largo Total del Perfil</FormHelperText>
        </FormControl>
        {/* Add Perfiles  */}
        <ButtonAdd onClick={addPerfil}>
          <AddIcon />
        </ButtonAdd>
      </WrapperFlexRow>

      <AreaAdds>
        {arrayPerfiles.length === 0 ? (
          <MutedText>Seleccione perfiles para esta Abertura</MutedText>
        ) : (
          arrayPerfiles.map((perfil, i) => {
            return (
              <WrapperItem key={i}>
                Codigo: {perfil.codigo} | Nombre: {perfil.nombre} | largo : {perfil.largo}
                <ButtonRemove>
                  <DeleteIcon
                    onClick={() => {
                      deletePerfil(perfil._id)
                    }}
                  />
                </ButtonRemove>
              </WrapperItem>
            )
          })
        )}
      </AreaAdds>
      {/* ----------------------- PERFILES ------------------------*/}

      {/* ----------------------------------- ACCESORIOS --------------------------- */}
      <>
        <TitleGroupInput>Accesorios</TitleGroupInput>
        <WrapperFlexRow>
          <FormControl>
            <FormLabel htmlFor='accesorios'>
              Accesorios <RequiredAsterisk>*</RequiredAsterisk>
            </FormLabel>
            <Select
              placeholder='Seleccione un Accesorio'
              defaultValue=''
              id='accesorio'
              size='sm'
              multiple={false}
              {...register('codigo_acc')}
            >
              <option value='sin'>Sin Acessorios</option>
              {generateOptionGroups(accesorios, 'categoria', 'codigo', 'nombre')}
            </Select>
            <FormHelperText>Seleccione accesorios para la abertura</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='ancho'>
              Cantidad <RequiredAsterisk>*</RequiredAsterisk>
            </FormLabel>
            <Input id='ancho' type='number' size='sm' step='any' {...register('cantidad_acc')} />
            <FormHelperText>Cantidad en unidades o largo (m)</FormHelperText>
          </FormControl>

          <ButtonAdd onClick={addAccesorio}>
            <AddIcon />
          </ButtonAdd>
        </WrapperFlexRow>
        <AreaAdds>
          {arrayAccesorios.length === 0 ? (
            <MutedText>Seleccione accesorios para esta Abertura</MutedText>
          ) : (
            arrayAccesorios.map((acces, i) => {
              return (
                <WrapperItem key={i}>
                  Nombre: {acces.nombre} | Cantidad: {acces.cantidad}
                  <ButtonRemove>
                    <DeleteIcon onClick={() => deleteFunctionAccesorios(acces._id)} />
                  </ButtonRemove>
                </WrapperItem>
              )
            })
          )}
        </AreaAdds>
      </>

      {/* ----------------------------------- ACCESORIOS --------------------------- */}
      {/* ----------------------------------- VIDRIOS --------------------------- */}
      <TitleGroupInput>Revestimientos </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl>
          <FormLabel htmlFor='Vidrio'>Vidrio</FormLabel>
          <Select
            placeholder='Seleccione un Vidrio'
            defaultValue='Sin Vidrio'
            id='vidrio'
            size='sm'
            {...register('vidrio_cod')}
            onChange={(e) => setVidrio({ ...vidrio, vidrio_cod: e.target.value })}
          >
            {vidrios.map((item) => {
              return (
                <option key={item._id} value={item.nombre}>
                  Nombre: {item.nombre} Espesor: {item.espesor}
                </option>
              )
            })}
          </Select>
          <FormHelperText>Seleccione un vidrio (opcional)</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='Vidrio'>Cantidad</FormLabel>
          <Input
            aria-required={true}
            id='mt2'
            type='number'
            step='0.01'
            size='sm'
            {...register('vidrio_m2')}
            onChange={(e) => setVidrio({ ...vidrio, vidrio_m2: e.target.value })}
          />
          <FormHelperText>Cantidad en m2</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      {/* ----------------------------------- VIDRIOS --------------------------- */}
      {/* ----------------------------------- REVESTIMIENTO --------------------------- */}

      <WrapperFlexRow>
        <FormControl>
          <FormLabel htmlFor='revesitimiento'>Aluminio</FormLabel>
          <Select
            placeholder='Seleccione un Perfil'
            id='perfil'
            size='sm'
            {...register('revestimiento_cod')}
            onChange={(e) => {
              setRevestimiento({ ...revestimiento, revestimiento_cod: e.target.value })
            }}
          >
            <option value=''>Sin Revestimiento</option>
            {revestimientos.map((item) => {
              return (
                <option key={item._id} value={item.codigo}>
                  Codigo: {item.codigo} Nombre: {item.nombre}
                </option>
              )
            })}
          </Select>
          <FormHelperText>Seleccione un revestimiento(opcional)</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='Vidrio'>Cantidad</FormLabel>
          <Input
            aria-required={true}
            id='mt2'
            type='number'
            step='0.01'
            size='sm'
            defaultValue='0'
            {...register('revestimiento_ml')}
            onChange={(e) => setRevestimiento({ ...revestimiento, revestimiento_ml: e.target.value })}
          />
          <FormHelperText>Cantidad en m lineales</FormHelperText>
        </FormControl>
      </WrapperFlexRow>
      {/* ----------------------------------- REVESTIMIENTO --------------------------- */}
      {/* ------------------------------------PRECIOS -------------------------------- */}
      <WrapperFlexRow></WrapperFlexRow>
      <TitleGroupInput>Resumen de Precios </TitleGroupInput>
      <WrapperFlexRow>
        <FormControl>
          <FormLabel htmlFor='precio'>
            Precio Kg Aluminio <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input
            aria-required={true}
            id='mt2'
            type='number'
            step='0.01'
            size='sm'
            {...register('precio_kg')}
            onChange={(e) => setPrecioKg(e.target.value)}
          />
          <FormHelperText>Precio por Kg Aluminio</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='precio'>
            Porcentaje <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input
            aria-required={true}
            id='mt2'
            type='number'
            step='0.01'
            size='sm'
            {...register('porcentaje')}
            onChange={(e) => setPorcentaje(e.target.value)}
          />
          <FormHelperText>Porcentaje sobre el costo</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='precio'>Costo Total Aluminio</FormLabel>
          <Input
            id='mt2'
            type='number'
            step='0.01'
            size='sm'
            {...register('costo_total')}
            value={Math.round(arrayPerfiles.map((p) => p.peso * p.largo).reduce((a, b) => a + b, 0) * precioKg)}
          />
          <FormHelperText>Costo en aluminio (sin revestimiento)</FormHelperText>
        </FormControl>
      </WrapperFlexRow>

      <WrapperFlexRow>
        <Stat style={{ flex: 'none', marginTop: '10px' }}>
          <StatLabel>Perfiles : $ {Math.round(precio_total_perfiles)}</StatLabel>
          <StatLabel>Accesorios : $ {Math.round(precio_accesorios)}</StatLabel>
          <StatLabel>Revestimiento : $ {Math.round(precio_revestimiento)}</StatLabel>
          <StatLabel>Vidrio : $ {Math.round(precio_vidrio)}</StatLabel>
          <StatLabel>Total</StatLabel>
          <StatNumber>$ {total}</StatNumber>
        </Stat>
      </WrapperFlexRow>
      {/* ------------------------------------PRECIOS -------------------------------- */}

      <ErrorMsg>{error}</ErrorMsg>

      <Button type='submit' isLoading={isLoading} colorScheme='teal'>
        Guardar
      </Button>
    </Container>
  )
}

export default NewAberturaStandart
