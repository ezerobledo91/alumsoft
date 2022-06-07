import { Editable, EditableInput, EditablePreview, Input, Tag, TagLabel, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setObject } from '../../reducer/entityEditContextSlice'
import { open } from '../../reducer/modalSlice'
import { remove, setPiezas } from '../../reducer/selectedPiezasSlice'
import TableControls from './TableControls'

const TableList = ({ items, controls = true, addOption = false }) => {
  const { _id, __v, ...others } = items
  const [edit, setEditing] = useState(false)
  const entity = useSelector((state) => state.entityContext)
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
      return item._id === items._id && entity === 'piezas' ? setSelected(true) : null
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

  const textStyle = {
    width: '60px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginRight: '10px',
  }

  function renderValue(item) {
    if (others[item].length > 0 && others[item][0].hasOwnProperty('_id')) {
      // VER ESTO SACAR LOS TAGS Y EDITABLE PARA OTRO COMPONENTE
      return others[item].map((u) => (
        <Tag style={textStyle} key={u._id} size='sm' borderRadius='full' variant='solid' colorScheme='cyan'>
          <TagLabel>{u.nombre}</TagLabel>
        </Tag>
      ))
    } else if (others[item].hasOwnProperty('_id')) {
      return others[item].nombre
    } else {
      return others[item]
    }
  }

  function openModalEdit(object) {
    dispatch(setObject(object))
    dispatch(open({ name: entity }))
  }

  return (
    <Tr bg={edit ? '#EDF2F7' : ''} onClick={() => addOptionFunction()} style={selectStyle}>
      {keyList.map((item, index) => (
        <Td key={index}>
          <Editable
            defaultValue={renderValue(item)} // Valor render segun el listado
            isPreviewFocusable={edit}
            onSubmit={(value) => handleNewValue(value, item)}
          >
            <EditablePreview />
            <Input as={EditableInput} size='sm' />
          </Editable>
        </Td>
      ))}
      {controls ? (
        <Td>
          <TableControls edit={edit} setEditing={setEditing} _id={_id} new_value={new_value} />
          <div
            onClick={() => {
              openModalEdit(items)
            }}
          >
            EDIT
          </div>
        </Td>
      ) : (
        ''
      )}
    </Tr>
  )
}

export default TableList
