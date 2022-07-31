import { DeleteIcon } from '@chakra-ui/icons'
import { Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeDataEditPresupuesto } from '../../../reducer/UiSlice'


const RemoveLine = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  font-size: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: black;
  color: white;
  cursor: pointer;
  margin: 0 auto;
`


const ItemEdit = ({index,data, remove=true}) => {
const dispatch = useDispatch()


  return (
    <Tr key={index} >
    <Td  textAlign="center" >{data.abertura}</Td>
    <Td  textAlign="center"> ancho: {data.medidas.ancho}m alto: {data.medidas.alto} m </Td>
    <Td  textAlign="center">{data.cantidad}</Td>
    <Td  textAlign="center">${data.precio_total.toFixed(2)}</Td>
    <Td  textAlign="center">${(data.precio_total * data.cantidad).toFixed(2)}</Td>
    {remove && <Td ><RemoveLine onClick={() => dispatch(removeDataEditPresupuesto(data))}><DeleteIcon /></RemoveLine></Td>}
    </Tr>   
  )
}

export default ItemEdit