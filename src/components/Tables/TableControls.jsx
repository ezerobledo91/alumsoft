import React from 'react'
import styled from 'styled-components'
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Tooltip, useToast } from '@chakra-ui/react'
import { open } from '../../reducer/alertConfirmSlice'
import { updateDataAsync } from '../../reducer/newDataProveedorSlice'
import { updateDataAsyncCliente } from '../../reducer/newDataClienteSlice'
import { updateDataAsyncPerfil } from '../../reducer/newDataPerfilSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateDataAsyncPieza } from '../../reducer/newDataPiezaSlice'
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
    } else if (type.entity === 'cliente') {
      await dispatch(updateDataAsyncCliente(new_value))
      toast({
        title: `Cliente Actualizado Correctamente`,
        status: 'success',
        isClosable: true,
      })
    } else if (type.entity === 'perfil') {
      await dispatch(updateDataAsyncPerfil(new_value))
      toast({
        title: `Perfil Actualizado Correctamente`,
        status: 'success',
        isClosable: true,
      })
    } else if (type.entity === 'pieza') {
      await dispatch(updateDataAsyncPieza(new_value))
      toast({
        title: `Pieza Actualizado Correctamente`,
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
