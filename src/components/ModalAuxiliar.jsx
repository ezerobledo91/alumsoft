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
import { setDataInfo} from '../reducer/UiSlice'

const ModalComponentAuxiliar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { modalAux } = useSelector((state) => state.UiSlice) // Estados de la Interfaz de usuario.
  const dispatch = useDispatch()

  useEffect(() => {
    modalAux.open ? onOpen() : onClose()
  }, [modalAux, onOpen, onClose])

  const onCloseModal = () => {
    dispatch(setDataInfo({ open: false, data_info: [] }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => onCloseModal()} size={'xxl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {props.title}</ModalHeader>
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

export default ModalComponentAuxiliar
