import { AtSignIcon, EditIcon, InfoIcon, LinkIcon, PhoneIcon } from '@chakra-ui/icons'
import { Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import TableList from './TableList'

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

function Tables({ list, type }) {
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
                  <LinkIcon /> {type === 'proveedor' ? 'Categoria' : 'Razon Social'}
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
            {list.map((item, index) => (
              <TableList key={index} entidad={item} type={type} />
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Tables
