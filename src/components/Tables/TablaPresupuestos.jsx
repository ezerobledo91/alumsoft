import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Tfoot, Th, Thead, Tooltip, Tr, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { removeDataPresupuesto } from '../../reducer/DataTablesSlice'
import { setDataEditPresupuesto } from '../../reducer/UiSlice'
import ModalPresupuestosEdit from '../ModalPresupuestosEdit'
import ModalPresupuestosViewer from '../ModalPresupuestosViewer'

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
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [data_view, setData] = useState()
  const dispatch = useDispatch()
  const toast = useToast()
  const deletePresupuesto = (id) => {
    dispatch(removeDataPresupuesto(id))
    toast({
      title: `Presupuesto Borrado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const editPresupuesto = (pres) => {
    dispatch(setDataEditPresupuesto(pres))
    setOpenEdit(true)
  }

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
            item.visible && <Tr key={index}>
              <Td>{item.numero}</Td>
              <Td>{item.cliente}</Td>
              <Td>{item.observaciones}</Td>
              <Td>$ {item.precio}</Td>
              <Td> {item.fecha}</Td>
              <Td>
                <IconWrapper>
                  <Tooltip label={'Ver e Imprimir'} fontSize='xs'>
                    <ViewIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        setOpen(true)
                        setData(item)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Editar'} fontSize='xs'>
                    <EditIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        editPresupuesto(item)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Borrar'} fontSize='xs'>
                    <DeleteIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        deletePresupuesto(item._id)
                      }}
                    />
                  </Tooltip>
                </IconWrapper>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
      <ModalPresupuestosViewer data={data_view} open={open} setOpen={setOpen} />
      <ModalPresupuestosEdit open={openEdit} setOpen={setOpenEdit} />
    </Container>
  )
}

export default TablaPresupuestos
