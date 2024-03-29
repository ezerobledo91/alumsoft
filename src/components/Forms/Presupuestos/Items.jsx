import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Td, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeDataEditPresupuesto, removeDataPreview } from '../../../reducer/UiSlice'

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
const Wrapper= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
gap: 10px;
`


const Items = ({data, index, remove=true,setDetailModal, edit=false, actualizacion_porcentajes = {aluminio:1,vidrio: 1, accesorios: 1 }}) => {
const dispatch = useDispatch()

  return (
    <Tr key={index} >
        <Td  textAlign="center" >{data.abertura}</Td>
        <Td  textAlign="center"> ancho: {data.medidas.ancho}m alto: {data.medidas.alto} m </Td>
        {/* <Td  textAlign="center">{data.vidrio}</Td>
        <Td  textAlign="center">{data.vidrio_mt} m2</Td>
        <Td  textAlign="center">{data.revestimiento_al}</Td>
        <Td  textAlign="center">{data.revestimiento_al_mt} m</Td> */}
        <Td  textAlign="center">${(data.precio_total * actualizacion_porcentajes?.aluminio + data.precio_vidrio * actualizacion_porcentajes.vidrio + data.precio_accesorios * actualizacion_porcentajes?.accesorios + data.precio_revestimiento_al  * actualizacion_porcentajes?.aluminio).toFixed(2)}</Td>
        <Td  textAlign="center">{data.cantidad}</Td>
        <Td  textAlign="center">${((data.precio_total * actualizacion_porcentajes?.aluminio + data.precio_vidrio * actualizacion_porcentajes.vidrio + data.precio_accesorios * actualizacion_porcentajes?.accesorios + data.precio_revestimiento_al  * actualizacion_porcentajes?.aluminio) * data.cantidad).toFixed(2)}</Td>
        {remove && <Td >
        <Wrapper>
        <RemoveLine onClick={() => dispatch(edit ? removeDataEditPresupuesto(data) : removeDataPreview(data))}><DeleteIcon /></RemoveLine>
        <RemoveLine onClick={() => setDetailModal(data)}><ViewIcon /></RemoveLine>
        </Wrapper>
        </Td>}
        
   </Tr>
  )
}

export default Items
