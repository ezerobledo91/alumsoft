import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { controlInputsEmpty, generateOptionGroups } from '../../../auxiliar/aux_functions'
import {
  MutedText,
  AreaAdds,
  ButtonAdd,
  ButtonRemove,
  TitleGroupInput,
  RequiredAsterisk,
  WrapperItem,
  ErrorMsg,
} from '../../Styled/StyledFormsAdds'
import { WrapperFlexRow } from '../../Styled/StyledGenericLayout'

const AccesoriosAdd = ({ accesorios, arrayAccesorios, setArrayAccesorios }) => {
  const { register, getValues, resetField } = useForm()
  const [error, setError] = useState('')
  const [moreInputs, setShowMoreInputs] = useState(false)

  const addAccesorio = () => {
    const newAccesorio = getValues()
    console.log(newAccesorio)
    if (moreInputs) {
      let array = ['cantidad', 'codigo', 'colocacion']
      const isError = controlInputsEmpty(newAccesorio, array)
      if (isError) {
        setError(isError)
        return
      }
    } else {
      let array = ['cantidad', 'codigo']
      const isError = controlInputsEmpty(newAccesorio, array)
      if (isError) {
        setError(isError)
        return
      }
    }

    const found = accesorios.find((accesorio) => accesorio.codigo === newAccesorio.codigo)
    newAccesorio.nombre = found.nombre
    newAccesorio._id = found._id
    newAccesorio.unidad = found.unidad
    setArrayAccesorios([...arrayAccesorios, newAccesorio])
    resetField('codigo')
    resetField('cantidad')
    setError('')
  }

  const deleteFunction = (_id) => {
    setArrayAccesorios(arrayAccesorios.filter((acces) => acces._id !== _id))
  }

  const inputOptionsAccesorio = (selected) => {
    const accesorio = accesorios.find((accesorio) => accesorio.codigo === selected)
    if (accesorio.unidad === 'unidades') {
      setShowMoreInputs(false)
      resetField('cantidad')
      resetField('colocacion')
    } else {
      setShowMoreInputs(true)
      resetField('cantidad')
    }
  }

  return (
    <>
      <TitleGroupInput>Listado de Accesorios a utilizar </TitleGroupInput>
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
            {...register('codigo')}
            onChange={(e) => inputOptionsAccesorio(e.target.value)}
          >
            <option value=''>Sin Acessorios</option>
            {generateOptionGroups(accesorios, 'categoria', 'codigo', 'nombre')}
          </Select>
          <FormHelperText>Seleccione accesorios para la abertura</FormHelperText>
        </FormControl>

        {moreInputs ? (
          <>
            <FormControl>
              <FormLabel htmlFor='medida'>
                Colocación <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Select
                placeholder='Seleccione un modo de colocación'
                defaultValue=''
                id='accesorio'
                size='sm'
                multiple={false}
                {...register('colocacion')}
              >
                <option value='fija'>Cantidad fija</option>
                <option value='perimetro'>Todo el perimetro</option>
                <option value='alto'>Relativo al Alto</option>
                <option value='ancho'>Relativo al Ancho</option>
              </Select>
              <FormHelperText>Seleccione el tipo de colocación.</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='largo'>
                Cantidad <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Input id='alto' type='number' size='sm' step='any' {...register('cantidad')} />
              <FormHelperText>Ingrese la cantidad en metros (Cantidad Fija) o repeción.</FormHelperText>
            </FormControl>
          </>
        ) : (
          <FormControl>
            <FormLabel htmlFor='accesorios'>
              Cantidad <RequiredAsterisk>*</RequiredAsterisk>
            </FormLabel>
            <Input id='ancho' type='number' size='sm' step='any' placeholder='Cantidad' {...register('cantidad')} />
            <FormHelperText>Ingrese la cantidad de unidades</FormHelperText>
          </FormControl>
        )}
        <ButtonAdd onClick={addAccesorio}>
          <AddIcon />
        </ButtonAdd>
      </WrapperFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <AreaAdds>
        {arrayAccesorios.length === 0 ? (
          <MutedText>Seleccione accesorios para esta Abertura</MutedText>
        ) : (
          arrayAccesorios.map((acces, i) => {
            return (
              <WrapperItem key={i}>
                Nombre: {acces.nombre} | {acces.unidad === 'unidades' ? '' : `| Colocación: ${acces.colocacion} |`}{' '}
                Cantidad: {acces.cantidad}
                <ButtonRemove>
                  <DeleteIcon onClick={() => deleteFunction(acces._id)} />
                </ButtonRemove>
              </WrapperItem>
            )
          })
        )}
      </AreaAdds>
    </>
  )
}

export default AccesoriosAdd
