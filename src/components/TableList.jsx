import { Editable, EditableInput, EditablePreview, Input, Td, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import TableControls from './TableControls'

const TableList = ({ type, entidad }) => {
  const { _id, nombre, categoria, telefono, email, descripcion } = entidad

  const [edit, setEditing] = useState(false)

  const new_value = {}
  const handleNewValue = (value, element) => {
    new_value[element] = value
  }

  return (
    <Tr bg={edit ? '#EDF2F7' : ''}>
      <Td>
        <Editable defaultValue={nombre} isPreviewFocusable={edit} onSubmit={(value) => handleNewValue(value, 'nombre')}>
          <EditablePreview />
          <Input as={EditableInput} size='sm' />
        </Editable>
      </Td>
      <Td>
        <Editable
          defaultValue={type === 'proveedor' ? categoria : descripcion}
          isPreviewFocusable={edit}
          onSubmit={(value) => handleNewValue(value, type === 'proveedor' ? 'categoria' : 'descripcion')}
        >
          <EditablePreview />
          <Input as={EditableInput} size='sm' />
        </Editable>
      </Td>
      <Td>
        <Editable
          defaultValue={telefono}
          isPreviewFocusable={edit}
          onSubmit={(value) => handleNewValue(value, 'telefono')}
        >
          <EditablePreview />
          <Input as={EditableInput} size='sm' />
        </Editable>
      </Td>
      <Td>
        <Editable defaultValue={email} isPreviewFocusable={edit} onSubmit={(value) => handleNewValue(value, 'email')}>
          <EditablePreview />
          <Input as={EditableInput} size='sm' />
        </Editable>
      </Td>
      <Td>
        <TableControls edit={edit} setEditing={setEditing} _id={_id} new_value={new_value} type={type}/>
      </Td>
    </Tr>
  )
}

export default TableList
