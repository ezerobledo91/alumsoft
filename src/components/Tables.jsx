import { AtSignIcon, DeleteIcon, EditIcon, InfoIcon, LinkIcon, PhoneIcon, ViewIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const Container = styled.div`
  margin: 10px 20px;
  border: solid 0.5px lightgray;
  border-radius: 10px 10px;
  padding: 10px;
`

const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`

function Tables() {
  return (
    <Container>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>
                <Wrapper>
                  <InfoIcon /> Nombre
                </Wrapper>
              </Th>
              <Th>
                <Wrapper>
                  <LinkIcon /> Categoria
                </Wrapper>
              </Th>
              <Th>
                <Wrapper>
                  <PhoneIcon /> Telefono
                </Wrapper>
              </Th>
              <Th>
                <Wrapper>
                  <AtSignIcon /> Email
                </Wrapper>
              </Th>
              <Th>
                <Wrapper>
                  <EditIcon /> Accion
                </Wrapper>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Aluflex</Td>
              <Td>Perfiles</Td>
              <Td>3482-44333223</Td>
              <Td>aluflex@gmail.com</Td>
              <Td>
                <IconWrapper>
                  <Tooltip label='Editar' fontSize='xs'>
                    <EditIcon focusable='true' cursor={'pointer'} />
                  </Tooltip>
                  <Tooltip label='Eliminar' fontSize='xs'>
                    <DeleteIcon focusable='true' cursor={'pointer'} />
                  </Tooltip>
                  <Tooltip label='Ver Detalles' fontSize='xs'>
                    <ViewIcon focusable='true' cursor={'pointer'} />
                  </Tooltip>
                </IconWrapper>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Tables
