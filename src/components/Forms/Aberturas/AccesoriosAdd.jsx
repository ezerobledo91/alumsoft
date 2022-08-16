import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormControl, FormHelperText, FormLabel, Input, Select } from '@chakra-ui/react'
import React, {useState } from 'react'
import { useForm } from 'react-hook-form'
import { generateOptionGroups } from '../../../auxiliar/aux_functions'
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

  const addAccesorio = () => {
    setError('')
    const newAccesorio = getValues()
    console.log(newAccesorio)
    if (newAccesorio.cantidad === '' || newAccesorio.codigo === '' || newAccesorio.codigo === undefined || newAccesorio.cantidad === undefined) {
      setError('Falta completar un campo.')
      return
    }
    const found = accesorios.find((accesorio) => accesorio.codigo === newAccesorio.codigo)
    newAccesorio.nombre = found.nombre
    newAccesorio._id = found._id
    setArrayAccesorios([...arrayAccesorios, newAccesorio])
    resetField('codigo')
    resetField('cantidad')
  }

  const deleteFunction = (_id) => {
    setArrayAccesorios(arrayAccesorios.filter((acces) => acces._id !== _id))
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
          >
            <option value=''>Sin Acessorios</option>
            {generateOptionGroups(accesorios, 'categoria', 'codigo', 'nombre')}
          </Select>
          <FormHelperText>Seleccione accesorios para la abertura</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='accesorios'>
            Cantidad <RequiredAsterisk>*</RequiredAsterisk>
          </FormLabel>
          <Input id='ancho' type='number' size='sm' step='any' placeholder='Cantidad' {...register('cantidad')} />
          <FormHelperText>Ingrese la cantidad (unidades o metros)</FormHelperText>
        </FormControl>
        <ButtonAdd onClick={addAccesorio}>
          <AddIcon />
        </ButtonAdd>
      </WrapperFlexRow>     
       <ErrorMsg>{error}</ErrorMsg>
      <AreaAdds>
        {arrayAccesorios.length === 0 ? (
          <MutedText>Seleccion accesorios para esta Abertura</MutedText>
        ) : (
          arrayAccesorios.map((acces, i) => {
            return (
              <WrapperItem key={i}>
                Nombre: {acces.nombre} | Cantidad: {acces.cantidad}
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
