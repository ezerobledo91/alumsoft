import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { generateOptionGroups } from '../../../auxiliar/aux_functions'
import {MutedText, AreaAdds, ButtonAdd, ButtonRemove}from '../../Styled/StyledFormsAdds'


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


const AccesoriosAdd = ({ accesorios,arrayAccesorios, setArrayAccesorios }) => {
    const {register, getValues} = useForm()

  const addAccesorio = () => {
    const newAccesorio = getValues()
    if(newAccesorio.cantidad === '' || newAccesorio.codigo === '') return
    const found = accesorios.find(accesorio => accesorio.codigo === newAccesorio.codigo)
    newAccesorio.nombre = found.nombre
    newAccesorio._id = found._id
    setArrayAccesorios([...arrayAccesorios,newAccesorio])
  }

  const deleteFunction = (_id) => {
    setArrayAccesorios(arrayAccesorios.filter((acces) => acces._id !== _id))
  }

  return (
    <>
      <FormControl>
        <FormLabel htmlFor='accesorios'>Accesorios</FormLabel>
        <WrapperSelect>
          <Select
            placeholder='Seleccione un Accesorio'
            defaultValue=''
            id='accesorio'
            size='sm'
            multiple={false}
            {...register('codigo')}
          >
            <option value=''>Sin Acessorios</option>
            {generateOptionGroups(accesorios,'categoria','codigo', 'nombre')}
          </Select>
          <Input id='ancho' type='number' size='sm' step='any' placeholder='Cantidad' {...register('cantidad')}/>
          <ButtonAdd onClick={addAccesorio}>
            <AddIcon />
          </ButtonAdd>
        </WrapperSelect>
      </FormControl>
      <AreaAdds>
        {arrayAccesorios.length === 0 ? 
        
        <MutedText>Seleccion accesorios para esta Abertura</MutedText>
        
        :arrayAccesorios.map((acces, i) => {
          return (
            <WrapperItem key={i}>
              Nombre: {acces.nombre} | Cantidad: {acces.cantidad}
              <ButtonRemove>
              <DeleteIcon onClick={() => deleteFunction(acces._id)} />
              </ButtonRemove>
            </WrapperItem>
          )
        })}
      </AreaAdds>
    </>
  )
}

export default AccesoriosAdd
