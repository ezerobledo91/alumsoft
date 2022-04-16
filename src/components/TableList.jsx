import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Td, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { open } from '../reducer/alertConfirmSlice'

const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const TableList = ({ type, entidad }) => {
  const { _id, nombre, categoria, telefono, email, razon_social } = entidad

  const dispatch = useDispatch()

  const deleteAction = () => {
    dispatch(open({ name: 'ALERT_CONFIRM', id: _id }))
  }

  return (
    <Tr>
      <Td>{nombre}</Td>
      <Td>{type === 'proveedor' ? categoria : razon_social}</Td>
      <Td>{telefono}</Td>
      <Td>{email}</Td>
      <Td>
        <IconWrapper>
          <Tooltip label='Editar' fontSize='xs'>
            <EditIcon focusable='true' cursor={'pointer'} />
          </Tooltip>
          <Tooltip label='Eliminar' fontSize='xs'>
            <DeleteIcon focusable='true' cursor={'pointer'} onClick={() => deleteAction()} />
          </Tooltip>
          <Tooltip label='Ver Detalles' fontSize='xs'>
            <ViewIcon focusable='true' cursor={'pointer'} />
          </Tooltip>
        </IconWrapper>
      </Td>
    </Tr>
  )
}

export default TableList
