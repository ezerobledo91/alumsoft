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

function NewModal({ name, form }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  //Manejo del Estado con Redux Open o Close
  const stateModal = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    if (stateModal.name) {
      onOpen()
      return
    }
    onClose()
  }, [stateModal, dispatch, onOpen, onClose])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir {name}</ModalHeader>
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
