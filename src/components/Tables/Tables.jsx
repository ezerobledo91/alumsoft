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

function Tables({ list, controls = true, addOption = false }) {
  const keyList = []
  if (list.length > 0) {
    for (const key in list[0]) {
      if (key === '_id' || key === '__v') continue

      keyList.push(key)
    }
  }
  return (
    <Container>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              {keyList.map((title, index) => (
                <Th key={index}>
                  <Wrapper>{title}</Wrapper>
                </Th>
              ))}
            { controls ? <Th><Wrapper>Accion</Wrapper></Th> : ''}
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item, index) => (
              <TableList key={index} items={item} controls={controls} addOption = {addOption}/>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Tables
