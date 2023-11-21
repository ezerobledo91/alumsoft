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
        <ModalFooter style={{ gap: '10px', justifyContent: 'space-between' }}>
          <div>
            <ul style={{ listStyle: 'none' }}>
              <li>Demora: {data?.fecha_entrega ? `${data.fecha_entrega} días` : 'Sin Fecha'}</li>
              <li>Notas para fabrica: {data?.notas || 'Sin Notas'}</li>
              <li>Estado: {data?.estado || 'Sin Estado'}</li>
            </ul>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button onClick={handlePrint}>
              <FaPrint />
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalPresupuestosViewer
