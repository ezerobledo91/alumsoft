import { Editable, EditableInput, EditablePreview, Input, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, setPiezas } from '../../reducer/selectedPiezasSlice'
import TableControls from './TableControls'

const TableList = ({ items, controls = true, addOption = false }) => {
  const { _id, __v, ...others } = items
  const [edit, setEditing] = useState(false)
  const dispatch = useDispatch()
  const new_value = {} // Los valores a enviar cuando se edita
  const handleNewValue = (value, element) => {
    new_value[element] = value
  }

  // Claves del objeto para mostar en listado con Map
  const keyList = []
  for (const key in others) {
    keyList.push(key)
  }

  // Seleccion Activada para seleccionar en modales ESTO VER DE SEPARAR EN OTRO FUNCION U OTRO COMPONENTE
  const [selected, setSelected] = useState(false)
  const selectedPiezas = useSelector((state) => state.selectedPiezasSlice)
  useEffect(() => {
    selectedPiezas.piezas.map((item) => {
      return item._id === items._id ? setSelected(true) : null
    })
  })

  const addOptionFunction = () => {
    if (addOption) {
      if (selected) {
        dispatch(remove(items._id))
        setSelected(false)
        return
      }
      dispatch(setPiezas(items))
      setSelected(true)
    } else {
      return
    }
  }

  //Select Style
  const selectStyle = {
    background: selected ? '#a9e2ec' : '',
    cursor: 'pointer',
  }

  return (
    <Tr bg={edit ? '#EDF2F7' : ''} onClick={() => addOptionFunction()} style={selectStyle}>
      {keyList.map((item, index) => (
        <Td key={index}>
          <Editable defaultValue={others[item]} isPreviewFocusable={edit} onSubmit={(value) => handleNewValue(value, item)}>
            <EditablePreview />
            <Input as={EditableInput} size='sm' />
          </Editable>
        </Td>
      ))}
      {controls ? (
        <Td>
          <TableControls edit={edit} setEditing={setEditing} _id={_id} new_value={new_value} />
        </Td>
      ) : (
        ''
      )}
    </Tr>
  )
}

export default TableList
