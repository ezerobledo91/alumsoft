import React from 'react'
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
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEditModal, updateStateModal } from '../reducer/UiSlice'

const ModalComponent = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { modalState } = useSelector((state) => state.UiSlice) // Estados de la Interfaz de usuario.
  const dispatch = useDispatch()

  useEffect(() => {
    modalState.open ? onOpen() : onClose()
  }, [modalState, onOpen, onClose])

  const onCloseModal = () => {
    dispatch(updateStateModal(false))
    dispatch(setEditModal({edit:false,edit_object:{}}))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => onCloseModal()} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {modalState.edit ? 'Editar' : 'Añadir'} {props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody> {props.children}</ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalComponent
