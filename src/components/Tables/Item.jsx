import React from 'react'
import { Td, Tooltip, Tr } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {  setEditModal, updateStateModal } from '../../reducer/UiSlice'
const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const Item = ({ item, claves }) => {
  const dispatch = useDispatch()

  const updateAction = (item) => {
    dispatch(setEditModal({edit:true,edit_object:item}))
    dispatch(updateStateModal(true))
  }

  return (
    <Tr>
      {claves.map((clave, index) => (
        <Td key={index}>{item[clave]}</Td>
      ))}

      <Td>
        {/* Panel de Edicion */}
        <IconWrapper>
          <Tooltip label={'Editar'} fontSize='xs'>
            <EditIcon
              focusable='true'
              cursor={'pointer'}
              onClick={() => {
                updateAction(item)
              }}
            />
          </Tooltip>
        </IconWrapper>
      </Td>
    </Tr>
  )
}

export default Item
