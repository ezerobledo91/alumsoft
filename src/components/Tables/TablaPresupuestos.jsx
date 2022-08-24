import { removeDataPresupuesto } from '../../reducer/DataTablesSlice'
import ModalPresupuestosViewer from '../ModalPresupuestosViewer'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Tooltip,
  Button,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import {  IconWrapper, WrapperFlexRow } from '../Styled/StyledGenericLayout'
import ModalComponent from '../Modal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

const TablaPresupuestos = ({ titles, data, setDataEdit }) => {
  const [open, setOpen] = useState(false)
  const [data_view, setData] = useState()
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()



  const confirmDelete = (item) => {
    setDeleteConfirm(false)
    dispatch(removeDataPresupuesto(item.id))
    toast({
      title: `Presupuesto Borrado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

  const borrarPresupuesto = (item) =>{
    setDeleteConfirm(item)
  }

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
                        editFunction(item)
                      }}
                    />
                  </Tooltip>
                  <Tooltip label={'Borrar'} fontSize='xs'>
                    <DeleteIcon
                      focusable='true'
                      cursor={'pointer'}
                      onClick={() => {
                        borrarPresupuesto(item)
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
      <ModalComponent title='Borrar Presupuesto' open={deleteConfirm} close={false} setState={setDeleteConfirm}>
         <WrapperFlexRow>
         <span>Numero: {deleteConfirm?.numero}</span>
          <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='solid' onClick={()=>confirmDelete(deleteConfirm)}>
            Confirmar
          </Button>
          </WrapperFlexRow>
      </ModalComponent>
    </TableContainer>
  )
}

export default TablaPresupuestos
