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
import EditPresupuestos from './Forms/Presupuestos/EditPresupuesto'
const ModalPresupuestosEdit = ({ open, setOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    open && onOpen()
  }, [open, onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => setOpen(false)} size={'xxl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Presupuesto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         <EditPresupuestos/>
        </ModalBody>
        <ModalFooter style={{gap:'10px'}}>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalPresupuestosEdit
