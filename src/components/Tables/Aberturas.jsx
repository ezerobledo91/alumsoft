import { Table,TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Tooltip } from '@chakra-ui/react'
import React from 'react'
import { CopyIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { IconWrapper } from '../Styled/StyledGenericLayout'

const AberturasTable = ({ titles, data, setDataEdit }) => {

  const editFunction = (item) => {
   setDataEdit(item)
  }

  return (
    <TableContainer display='block' maxHeight='60vh' overflowY='auto'>
      <Table variant='striped' colorScheme='gray' size='sm'>
        <Thead>
          <Tr>
            {titles.map((title, k) => (
              <Th key={k}>{title}</Th>
            ))}
            <Th isNumeric>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item._id}>
              {titles.map((title, k) => (
                <Td key={k}> {title === 'accesorios' || title === 'piezas' ? item[title].length : item[title]} </Td>
              ))}
              <Td isNumeric>
                <IconWrapper>
                  <Tooltip label={'Editar'} fontSize='xs'>
                    <EditIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        editFunction(item)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Detalles'} fontSize='xs'>
                    <ViewIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        editFunction(item)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Copiar'} fontSize='xs'>
                    <CopyIcon />
                  </Tooltip>
                  <Tooltip label={'Borrar'} fontSize='xs'>
                    <DeleteIcon />
                  </Tooltip>
                </IconWrapper>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            {titles.map((title, k) => (
              <Th key={k}>{title}</Th>
            ))}
            <Th isNumeric>Acciones</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default AberturasTable
