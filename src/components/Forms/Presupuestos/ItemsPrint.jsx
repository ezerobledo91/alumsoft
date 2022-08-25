import { Td, Tr } from '@chakra-ui/react'
import React from 'react'


const ItemsPrint = ({data, index}) => {
  return (
    <Tr key={index} >
        <Td  textAlign="center" >{data.abertura}</Td>
        <Td  textAlign="center"> ancho: {data.medidas.ancho}m alto: {data.medidas.alto} m </Td>
        <Td  textAlign="center">${(data.precio_total + data.precio_vidrio + data.precio_accesorios + data.precio_revestimiento_al).toFixed(2)}</Td>
        <Td  textAlign="center">{data.cantidad}</Td>
        <Td  textAlign="center">${((data.precio_total + data.precio_vidrio + data.precio_accesorios  + data.precio_revestimiento_al) * data.cantidad).toFixed(2)}</Td>
        
   </Tr>
  )
}

export default ItemsPrint
