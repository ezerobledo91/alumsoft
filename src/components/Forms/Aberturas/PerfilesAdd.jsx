import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { generateOptionGroups } from '../../../auxiliar/aux_functions'
import {MutedText, AreaAdds, ButtonAdd, ButtonRemove} from '../../Styled/StyledFormsAdds'

const WrapperSelect = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  font-size: 14px;
`
const WrapperItem = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  font-size: 14px;
  border: solid lightgray 1px;
  padding: 10px;
`

const PerfilesAdd = ({ perfiles, setArrayPerfiles, arrayPerfiles }) => {
  const { register, getValues } = useForm()

  const addPerfil = () => {
    const newPerfil = getValues()
    if (newPerfil.cortes === '' || newPerfil.codigo === '' || newPerfil.descuento === '' || newPerfil.variable === '')
      return
    const found = perfiles.find((perfil) => perfil.codigo === +newPerfil.codigo)
    newPerfil.nombre = found.nombre
    newPerfil._id = found._id
    setArrayPerfiles([...arrayPerfiles, newPerfil])
  }

  const deleteFunction = (_id) => {
    setArrayPerfiles(arrayPerfiles.filter((perfil) => perfil._id !== _id))
  }

  return (
    <>
      <WrapperSelect>
        <FormControl>
          <FormLabel htmlFor='nombre'>Perfiles </FormLabel>

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
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Cortes</FormLabel>
          <Input id='alto' type='number' size='sm' {...register('cortes')} />
          <FormHelperText>Cantidad de Cortes</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='nombre'>Descuento</FormLabel>
          <Input id='alto' type='number' size='sm' step='any' {...register('descuento')} />
          <FormHelperText>Descuento en mm aplicado total por corte</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='variable'>Variable</FormLabel>
          <Select placeholder='Seleccione un Varible' id='variable' size='sm' {...register('variable')}>
            <option value='ancho'>Ancho</option>
            <option value='alto'>Alto</option>
            <option value='marco'>2 Alto + Ancho (Marcos)</option>
            <option value='fija'>Unidades Fijas</option>
          </Select>
          <FormHelperText>Seleccione una variable de medida</FormHelperText>
        </FormControl>
        <ButtonAdd onClick={addPerfil}>
          <AddIcon />
        </ButtonAdd>
      </WrapperSelect>
      Listado de Perfiles a Utilizar
      <AreaAdds>
        {arrayPerfiles.length === 0 ? (
          <MutedText>Seleccione perfiles para esta Abertura</MutedText>
        ) : (
          arrayPerfiles.map((perfil, i) => {
            return (
              <WrapperItem key={i}>
                Codigo: {perfil.codigo} | Nombre: {perfil.nombre} | Cortes: {perfil.cortes} | Descuento:{' '}
                {perfil.descuento}mm | Variable: {perfil.variable}
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
