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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { IconWrapper, WrapperFlexRow } from '../Styled/StyledGenericLayout'
import ModalComponent from '../Modal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeDataAccesorio } from '../../reducer/DataTablesSlice'

// TABLA ABERTURAS, FUNCIONES BORRAR, VER DETALLES, COPIAR. 
const AccesoriosTable = ({ titles, data, setDataEdit }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const dispatch = useDispatch()
  const toast = useToast()

  const editFunction = (item) => {
    setDataEdit(item)
  }


  const borrarAccesorio = (item) =>{
    setDeleteConfirm(item)
  }

  const confirmDelete = (item) => {
    dispatch(removeDataAccesorio(item._id))
    setDeleteConfirm(false)
    toast({
      title: `Accesorio Borrado Correctamente`,
      status: 'success',
      isClosable: true,
    })
  }

 return (
    <>
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
                  <Td key={k}>  {typeof item[title] === 'number' ? Math.round(item[title] *100)/100 :  item[title] } </Td>
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
                    <Tooltip label={'Borrar'} fontSize='xs'>
                      <DeleteIcon  focusable='true'
                        cursor={'pointer'}  onClick={() => {
                          borrarAccesorio(item)
                        }}/>
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
      <ModalComponent title='Borrar Accesorio' open={deleteConfirm} close={false} setState={setDeleteConfirm}>
         <WrapperFlexRow>
         <span>{deleteConfirm?.nombre}</span>
          <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='solid' onClick={()=>confirmDelete(deleteConfirm)}>
            Confirmar
          </Button>
          </WrapperFlexRow>
      </ModalComponent>
    </>
  )
}
export default AccesoriosTable