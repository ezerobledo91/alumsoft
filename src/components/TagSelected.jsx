import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeDataSelected } from '../reducer/UiSlice'

const TagSelected = () => {
  const selected = useSelector((state) => state.UiSlice.modalAux.data_selected) //Estado de la app en todo momento
  const dispatch = useDispatch()
  return (
    <HStack spacing={4}>
      {selected.map((item) => {
        return (
          <Tag size='lg' key={item._id} borderRadius='full' variant='solid' colorScheme='cyan'>
            <TagLabel>{item.nombre}</TagLabel>
            <TagCloseButton onClick={() => dispatch(removeDataSelected(item._id))} />
          </Tag>
        )
      })}
    </HStack>
  )
}

export default TagSelected
