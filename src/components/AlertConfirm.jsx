import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { close } from '../reducer/alertConfirmSlice'

const AlertConfirm = ({ reducer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const alert = useSelector((state) => state.alertConfirm) // Recuperar el estado despachado desde otro componente
  const type = useSelector((state) => state.entityContext)
  useEffect(() => {
    if (alert.name) {
      onOpen()
      return
    }
  }, [alert, onOpen])

  const confirm = async () => {
    setLoading(true)
    await dispatch(reducer(alert.id))
    setLoading(false)
    onClose()
  }

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        onCloseComplete={() => dispatch(close())}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Borrar {type.entity}
            </AlertDialogHeader>

            <AlertDialogBody>Esta seguro que desea borrar el {type.entity}.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={confirm} ml={3} isLoading={isLoading}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default AlertConfirm
