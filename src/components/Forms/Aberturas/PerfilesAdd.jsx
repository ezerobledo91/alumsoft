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

const PerfilesAdd = ({ perfiles, setArrayPerfiles, arrayPerfiles }) => {
  const { register, getValues, resetField } = useForm()
  const [error, setError] = useState('')
  const [inputsFija, setChangeInputs] = useState(false)

  const addPerfil = () => {
    const newPerfil = getValues()
    if (inputsFija) {
      let array = ['cantidad', 'codigo', 'medida', 'variable']
      const isError = controlInputsEmpty(newPerfil, array)
      if (isError) {
        setError(isError)
        return
      }
    } else {
      let array = ['cortes', 'codigo', 'descuento', 'variable']
      const isError = controlInputsEmpty(newPerfil, array)
      if (isError) {
        setError(isError)
        return
      }
    }
    const found = perfiles.find((perfil) => perfil.codigo === +newPerfil.codigo)
    newPerfil.nombre = found.nombre
    newPerfil._id = found._id
    setArrayPerfiles([...arrayPerfiles, newPerfil])
    resetField('codigo')
    resetField('cortes')
    resetField('descuento')
    resetField('variable')
    resetField('medida')
    resetField('cantidad')
    setError('')
  }

  const deleteFunction = (_id) => {
    setArrayPerfiles(arrayPerfiles.filter((perfil) => perfil._id !== _id))
  }

  const selectVariable = (variable) => {
    if (variable === 'fija') {
      setChangeInputs(true)
      resetField('medida')
      resetField('cantidad')
    } else {
      setChangeInputs(false)
      resetField('cortes')
      resetField('descuento')
    }
  }

  return (
    <>
      <TitleGroupInput>Listado de perfiles a utilizar </TitleGroupInput>
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
          <FormLabel htmlFor='variable'>
            Variable <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Select
            placeholder='Seleccione un Varible'
            id='variable'
            size='sm'
            {...register('variable')}
            onChange={(e) => {
              selectVariable(e.target.value)
            }}
          >
            <option value='ancho'>Ancho</option>
            <option value='alto'>Alto</option>
            <option value='marco'>2 Alto + Ancho (Marcos)</option>
            <option value='fija'>Unidades Fijas</option>
            <option value='perimetro'>Perimetral</option>
          </Select>
          <FormHelperText>Seleccione una variable de medida</FormHelperText>
        </FormControl>
        {inputsFija ? (
          <>
            <FormControl>
              <FormLabel htmlFor='largo'>
                Cantidad <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Input id='alto' type='number' size='sm' {...register('cantidad')} />
              <FormHelperText>Cantidad de piezas iguales</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='medida'>
                Medida <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Input id='alto' type='number' size='sm' step='any' {...register('medida')} />
              <FormHelperText>Medida de cada pieza mm</FormHelperText>
            </FormControl>
          </>
        ) : (
          <>
            <FormControl>
              <FormLabel htmlFor='cortes'>
                Cortes <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Input id='alto' type='number' size='sm' {...register('cortes')} />
              <FormHelperText>Cantidad de Cortes</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='descuento'>
                Descuento <RequiredAsterisk>*</RequiredAsterisk>
              </FormLabel>
              <Input id='alto' type='number' size='sm' step='any' {...register('descuento')} />
              <FormHelperText>Descuento en mm aplicado total por corte</FormHelperText>
            </FormControl>
          </>
        )}

        <ButtonAdd onClick={addPerfil}>
          <AddIcon />
        </ButtonAdd>
      </WrapperFlexRow>
      <ErrorMsg>{error}</ErrorMsg>
      <AreaAdds>
        {arrayPerfiles.length === 0 ? (
          <MutedText>Seleccione perfiles para esta Abertura</MutedText>
        ) : (
          arrayPerfiles.map((perfil, i) => {
            return (
              <WrapperItem key={i}>
                Codigo: {perfil.codigo} | Nombre: {perfil.nombre} | Variable: {perfil.variable}
                {perfil.variable === 'fija'
                  ? ` | Cantidad: ${perfil.cantidad} u | Medida:  ${perfil.medida} mm`
                  : ` | Cortes: ${perfil.cortes} u | Descuento: ${perfil.descuento} mm`}
                <ButtonRemove>
                  <DeleteIcon
                    onClick={() => {
                      deleteFunction(perfil._id)
                    }}
                  />
                </ButtonRemove>
              </WrapperItem>
            )
          })
        )}
      </AreaAdds>
    </>
  )
}

export default PerfilesAdd
