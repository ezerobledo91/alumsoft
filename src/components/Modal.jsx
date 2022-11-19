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


const ModalComponent = ({close=true ,setState, ...props}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
   if( props.open) {
       onOpen()
   }else{
     onClose() 
   }
    
  }, [props.open, onOpen, onClose])


  return (
    <Modal isOpen={isOpen} onClose={()=>setState(false)} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> {props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody> {props.children}</ModalBody>
       </ModalContent>
    </Modal>
  )
}

export default ModalComponent
