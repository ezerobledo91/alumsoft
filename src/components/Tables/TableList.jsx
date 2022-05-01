import { Editable, EditableInput, EditablePreview, Input, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import TableControls from './TableControls'

const TableList = ({ items }) => {
  const { _id, __v, ...others } = items
  const [edit, setEditing] = useState(false)

  const new_value = {} // Los valos a enviar cuando se edita
  const handleNewValue = (value, element) => {
    new_value[element] = value
  }

  // Claves del objeto para mostar en listado con Map
  const keyList = []
  for (const key in others) {
    keyList.push(key)
  }

  return (
    <Tr bg={edit ? '#EDF2F7' : ''}>
      {keyList.map((item, index) => (
        <Td key={index}>
          <Editable
            defaultValue={others[item]}
            isPreviewFocusable={edit}
            onSubmit={(value) => handleNewValue(value, item)}
          >
            <EditablePreview />
            <Input as={EditableInput} size='sm' />
          </Editable>
        </Td>
      ))}
      <Td>
        <TableControls edit={edit} setEditing={setEditing} _id={_id} new_value={new_value} />
      </Td>
    </Tr>
  )
}

export default TableList
