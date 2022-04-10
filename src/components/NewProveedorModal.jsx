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
import NewProveedorForm from './NewProveedorForm'

function NewProveedorModal({ open, setModal }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  //Manejo el estado del open desde modal recibiendo al funcion setModal.
  useEffect(() => {
    if (open) {
      onOpen()
      setModal(false)
    }
  })

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Añadir Proveedor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewProveedorForm close={onClose} />
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

export default NewProveedorModal
