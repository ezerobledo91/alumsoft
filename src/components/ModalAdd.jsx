import { NotAllowedIcon } from '@chakra-ui/icons'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getDataAsync } from '../reducer/newDataPiezaSlice'
import Tables from './Tables/Tables'

const NoData = styled.div`
  padding: 10px 20px;
`

function ModalAdd({ open, updateOnClose }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      onOpen()
      return
    }
    onClose()
  }, [open, onOpen, onClose])

  // GET DATA FROM PIEZAS
  const newDataPieza = useSelector((state) => state.newDataPieza)
  useEffect(() => {
    dispatch(getDataAsync())
  }, [dispatch])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={'5xl'} onCloseComplete={() => updateOnClose(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buscar Piezas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {newDataPieza.length > 0 ? (
              <Tables list={newDataPieza} controls={false} addOption = {true} />
            ) : (
              <NoData>
                <NotAllowedIcon /> No existen Datos
              </NoData>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ModalAdd
