import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../reducer/selectedPiezasSlice'

const TagSelected = () => {
  const selectedPiezas = useSelector((state) => state.selectedPiezasSlice) //Estado de la app en todo momento
  const dispatch = useDispatch()

  return (
    <HStack spacing={4}>
      {selectedPiezas.piezas.map((item) => {
        return (
          <Tag size='lg' key={item._id} borderRadius='full' variant='solid' colorScheme='cyan'>
            <TagLabel>{item.nombre}</TagLabel>
            <TagCloseButton onClick={() => dispatch(remove(item._id))} />
          </Tag>
        )
      })}
    </HStack>
  )
}

export default TagSelected
