import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaPrint } from 'react-icons/fa'
import styled from 'styled-components'

const Container = styled.div`
  margin: 10px 20px;
  border: solid 0.5px lightgray;
  border-radius: 10px 10px;
  padding: 10px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
const IconWrapper = styled.div`
  display: flex;
  gap: 5px;
`

const TablaPresupuestos = ({ data }) => {
  return (
    <Container>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>
              <Wrapper>Numero</Wrapper>
            </Th>
            <Th>
              <Wrapper>Cliente</Wrapper>
            </Th>
            <Th>
              <Wrapper>Observación</Wrapper>
            </Th>
            <Th>
              <Wrapper>Precio</Wrapper>
            </Th>
            <Th>
              <Wrapper>Fecha</Wrapper>
            </Th>
            <Th>
              <Wrapper>Opciones</Wrapper>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.numero}</Td>
              <Td>{item.cliente}</Td>
              <Td>{item.observaciones}</Td>
              <Td>$ {item.precio}</Td>
              <Td> {item.fecha}</Td>
              <Td>
                <IconWrapper>
                    <ViewIcon/>
                  <Tooltip label={'Editar'} fontSize='xs'>
                    <EditIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                       console.log(item._id)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Borrar'} fontSize='xs'>
                    < DeleteIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                       console.log(item._id)
                      }}
                    />
                  </Tooltip>
                
                    <FaPrint
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                       console.log(item._id)
                      }}
                    />
                    </IconWrapper>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </Container>
  )
}

export default TablaPresupuestos
