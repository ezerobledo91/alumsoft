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


const ModalComponent = ({close=true, ...props}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    props.open ? onOpen() : onClose()
  }, [props.open, onOpen, onClose])


  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody> {props.children}</ModalBody>
        <ModalFooter>
         {close && <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cerrar
          </Button>}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalComponent
