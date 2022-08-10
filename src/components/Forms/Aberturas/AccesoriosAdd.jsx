import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const AreaAccesorios = styled.div`
  max-height: 200px;
  overflow: auto;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: solid lightgray 1px;
  border-top: solid lightgray 1px;
  padding: 10px;
`
const WrapperSelect = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  font-size: 14px;
`
const ButtonAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding: 5px;
  border-radius: 50%;
  background: #319795;
  color: white;
  cursor: pointer;
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
const ButtonRemove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding: 5px;
  border-radius: 50%;
  background: #af3929;
  color: white;
  cursor: pointer;
`

const AccesoriosAdd = ({ accesorios,arrayAccesorios, setArrayAccesorios }) => {
    const {register, getValues} = useForm()
  // AGRUPADO DE ACCESORIOS POR CATEGORIA PARA ORDENARLOS MEJOR
  const generateAccesorios = () => {
    const newArrayAccesorios = [...new Set(accesorios.map((a) => a.categoria))].map((group) => {
      return {
        categoria: group,
        items: accesorios.filter((i) => i.categoria === group),
      }
    })

    return newArrayAccesorios.map((grupos, i) => {
      return (
        <optgroup key={grupos.categoria + i} label={grupos.categoria} style={{ textTransform: 'capitalize' }}>
          {grupos.items.map((accesorio, index) => (
            <option key={index} value={accesorio.nombre}>
              {accesorio.codigo} | {accesorio.nombre}
            </option>
          ))}
        </optgroup>
      )
    })
  }

  const addAccesorio = () => {
    const newAccesorio = getValues('accesorio')
    const cantidad = getValues('cantidad')
    if(cantidad === '' || newAccesorio === '') return
    setArrayAccesorios([...arrayAccesorios, { nombre: newAccesorio, cantidad: cantidad }])
  }

  const deleteFunction = (nombre) => {
    setArrayAccesorios(arrayAccesorios.filter((acces) => acces.nombre !== nombre))
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
            {...register('accesorio')}
          >
            <option value=''>Sin Acessorios</option>
            {generateAccesorios()}
          </Select>
          <Input id='ancho' type='number' size='sm' step='any' placeholder='Cantidad' {...register('cantidad')}/>
          <ButtonAdd onClick={addAccesorio}>
            <AddIcon />
          </ButtonAdd>
        </WrapperSelect>
      </FormControl>
      <AreaAccesorios>
        {arrayAccesorios.map((acces, i) => {
          return (
            <WrapperItem key={i}>
              Nombre: {acces.nombre} | Cantidad: {acces.cantidad}
              <ButtonRemove>
              <DeleteIcon onClick={() => deleteFunction(acces.nombre)} />
              </ButtonRemove>
            </WrapperItem>
          )
        })}
      </AreaAccesorios>
    </>
  )
}

export default AccesoriosAdd
