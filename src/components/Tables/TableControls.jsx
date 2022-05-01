import React from 'react'
import styled from 'styled-components'
import { CheckIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Tooltip, useToast } from '@chakra-ui/react'
import { open } from '../../reducer/alertConfirmSlice'
import { updateDataAsync } from '../../reducer/newDataProveedorSlice'
import { updateDataAsyncCliente } from '../../reducer/newDataClienteSlice'
import { useDispatch, useSelector } from 'react-redux'
const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`
const TableControls = ({ _id, edit, setEditing, new_value }) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const deleteAction = () => {
    dispatch(open({ name: 'ALERT_CONFIRM', id: _id }))
  }

  const type = useSelector((state) => state.entityContext)

  const saveAction = async () => {
    setEditing(false)
    new_value._id = _id
    if (type.entity === 'proveedor') {
      await dispatch(updateDataAsync(new_value))
      toast({
        title: `Proveedor Actualizado Correctamente`,
        status: 'success',
        isClosable: true,
      })
    } else {
      await dispatch(updateDataAsyncCliente(new_value))
      toast({
        title: `Cliente Actualizado Correctamente`,
        status: 'success',
        isClosable: true,
      })
    }
  }

  return (
    <IconWrapper>
      <Tooltip label={edit ? 'Guardar' : 'Editar'} fontSize='xs'>
        {edit ? (
          <CheckIcon focusable='true' cursor={'pointer'} onClick={() => saveAction()} />
        ) : (
          <EditIcon focusable='true' cursor={'pointer'} onClick={() => setEditing(true)} />
        )}
      </Tooltip>
      <Tooltip label='Eliminar' fontSize='xs'>
        <DeleteIcon focusable='true' cursor={'pointer'} onClick={() => deleteAction()} />
      </Tooltip>
    </IconWrapper>
  )
}

export default TableControls
