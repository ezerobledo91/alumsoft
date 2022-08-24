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
  ListItem,
  UnorderedList,
  Divider,
  Button,
  useToast,
} from '@chakra-ui/react'
import React from 'react'
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { ColumnFlexItems, IconWrapper, WrapperFlexRow } from '../Styled/StyledGenericLayout'
import ModalComponent from '../Modal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeDataAbertura } from '../../reducer/DataTablesSlice'

// TABLA ABERTURAS, FUNCIONES BORRAR, VER DETALLES, COPIAR. 
const AberturasTable = ({ titles, data, setDataEdit }) => {
  const [detailModal, setDetailModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const dispatch = useDispatch()
  const toast = useToast()

  const editFunction = (item) => {
    setDataEdit(item)
  }

  const viewDetails = (item) => {
    setDetailModal(item)
  }

  const borrarAbertura = (item) =>{
    setDeleteConfirm(item)
  }

  const confirmDelete = (item) => {
    dispatch(removeDataAbertura(item._id))
    setDeleteConfirm(false)
    toast({
      title: `Abertura Borrada Correctamente`,
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
                          viewDetails(item)
                        }}
                      />
                    </Tooltip>
                    <Tooltip label={'Borrar'} fontSize='xs'>
                      <DeleteIcon  focusable='true'
                        cursor={'pointer'}  onClick={() => {
                          borrarAbertura(item)
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
      <ModalComponent title='Información' open={detailModal} setState={setDetailModal}>
        {detailModal && <DetailContainer detalles={detailModal} />}
      </ModalComponent>
      <ModalComponent title='Borrar Abertura' open={deleteConfirm} close={false} setState={setDeleteConfirm}>
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
export default AberturasTable

const DetailContainer = ({ detalles }) => {
  return (
    <UnorderedList style={{ fontWeight: '300', maxHeight: '500px', overflow: 'auto', fontSize:'14px' }}>
      <ListItem>
        <strong>Nombre:</strong> {detalles.nombre}
      </ListItem>
      <ListItem>
        <strong>Categoria:</strong> {detalles.categoria}
      </ListItem>
      <ListItem>
        <strong>Linea:</strong> {detalles.linea}
      </ListItem>
      <ListItem>
        <strong>Perfiles:</strong>
        <UnorderedList>
          {detalles.piezas.map((perfil) => {
            return (
              <ColumnFlexItems key={perfil.codigo}>
                <p>Codigo: {perfil.codigo}</p>
                <p>Nombre: {perfil.nombre}</p>
                <p>Variable: {perfil.variable}</p>
                {perfil.variable === 'fija' ? (
                  <>
                    <p>Cantidad: {perfil.cantidad} u</p>
                    <p>Medida: {perfil.medida} mm</p>
                  </>
                ) : (
                  <>
                    <p>Cortes: {perfil.cortes} u</p>
                    <p>Descuento:{perfil.descuento} mm </p>
                  </>
                )}
                <Divider />
              </ColumnFlexItems>
            )
          })}
        </UnorderedList>
      </ListItem>
      <ListItem>
        <strong>Accesorios:</strong>
        <UnorderedList>
          {detalles.accesorios.map((accesorio) => {
            return (
              <ColumnFlexItems key={accesorio.nombre}>
                <p>Nombre: {accesorio.nombre}</p>
                {accesorio.unidad === 'unidades' ? '' : <p>Colocacion: {accesorio.colocacion}</p>}
                <p>Cantidad: {accesorio.cantidad}</p>
                <Divider />
              </ColumnFlexItems>
            )
          })}
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  )
}
