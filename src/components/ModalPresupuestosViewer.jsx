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
import React, { useEffect, useRef } from 'react'
import PreviewPresupuestos from './PreviewPresupuestos'
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

const ModalPresupuestosViewer = ({ data, open, setOpen }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    open && onOpen()
  }, [open])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} onCloseComplete={() => setOpen(false)} size={'xxl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Presupuesto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PreviewPresupuestos data={data} ref={componentRef} />
        </ModalBody>
        <ModalFooter style={{gap:'10px'}}>
          <Button onClick={handlePrint}>
            <FaPrint />
          </Button>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalPresupuestosViewer
