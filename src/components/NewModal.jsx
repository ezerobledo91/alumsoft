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
import { useSelector, useDispatch } from 'react-redux'
import { close } from '../reducer/modalSlice'

function NewModal({ form }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  //Manejo del Estado con Redux Open o Close
  const stateModal = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const type = useSelector((state) => state.entityContext)
  useEffect(() => {
    if (stateModal.name) {
      onOpen()
      return
    }
    onClose()
  }, [stateModal, onOpen, onClose])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => dispatch(close())} size={'xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir {type.entity}</ModalHeader>
          <ModalCloseButton />
          <ModalBody> {form}</ModalBody>
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

export default NewModal
