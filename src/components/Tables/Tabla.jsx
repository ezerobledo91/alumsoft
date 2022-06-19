import React from 'react'
import styled from 'styled-components'
import { Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import Item from './Item'

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

// header array de titulos de la tabla o datos a mostrar
const Tabla = ({ header, data, title}) => {

  return (
    <Container>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              {header.map((title, index) => (
                <Th key={title}>
                  <Wrapper>{title}</Wrapper>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Item key={index} item={item} claves={header} title={title} />
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Tabla
