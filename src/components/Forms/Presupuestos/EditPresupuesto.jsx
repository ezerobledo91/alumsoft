import {
  Button,
  Divider,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Items from './Items'
import { getDataPresupuesto, saveDataPresupuesto, updateDataPresupuesto } from '../../../reducer/DataTablesSlice'
import {  setDataEditPresupuesto } from '../../../reducer/UiSlice'
import ModalComponent from '../../Modal'
import DetailModal from './DetailModal'
import NewItemEditPresupuesto from './NewItemEditPresupuesto'

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  height: -webkit-fill-available;
`
const Title = styled.h1`
  text-align: left;
  font-size: 1.2rem;
  text-transform: capitalize;
  display: flex;
  gap: 10px;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px;
  height: 80vh;
`
const ContainerForm = styled.div`
  flex: 1;
`
const ContainerPre = styled.div`
  flex: 1;
  border: solid #979797 1px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: fit-content;
  width:60%;
`
const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const FooterTextObs = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 12px;
  padding: 10px;
`
const WrapperFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
// VISIBILIDAD !!!
const EditPresupuestos = ({ data_edit, setDataEdit }) => {
  const data_preview = useSelector((state) => state.UiSlice.editPresupuesto.data) // Los items de Presupuestos.
  const presupuestos = useSelector((state) => state.DataTables.presupuestos)
  // Cliente
  const [cliente, setCliente] = useState(data_edit?.cliente)
  // Observaciones
  let [textObservacion, setObservacion] = useState(data_edit?.observaciones)
  // Reset Form
  const [reset, setReset] = useState(false)

  // Modal Detalles
  const [detailModal, setDetailModal] = useState(false)

  let precio = 0 // precio total de los items.
  let numero = data_edit.numero // numero de presupuestos.
  data_preview.forEach((item) => {
    precio =
      precio +
      (item.precio_total + item.precio_vidrio + item.precio_accesorios + item.precio_revestimiento_al) * item.cantidad // Precio total.
  })

  // GUARDAR PRESUPUESTO
  const [isLoading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  // On Submit Presupuesto.
  const onSubmit = async () => {
    const data = {
      precio: Math.round(precio * 100) / 100,
      aberturas: data_preview,
      observaciones: textObservacion,
      cliente: cliente,
      numero: numero,
      fecha: data_edit.fecha,
      _id: data_edit._id,
    }

    if (data.aberturas.length === 0) {
      toast({
        title: `Error Presupuesto vacio.`,
        status: 'error',
        isClosable: true,
      })
      return
    }

    setLoading(true)
    await dispatch(updateDataPresupuesto(data))
    setLoading(false)
    toast({
      title: `Presupuesto Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    dispatch(setDataEditPresupuesto([]))
    setReset(true)
    setTimeout(() => setReset(false), 1000)
    setCliente('Consumidor Final')
    setObservacion('')
    setDataEdit(false)
  }

  useEffect(() => {
    dispatch(getDataPresupuesto())
  }, [dispatch])

  // COPIA
  const guardarCopia = async (e) => {
    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = `${day}-${month}-${year}`
    let numero_new = presupuestos.at(-1)?.numero + 1 
    const data = {
      precio: Math.round(precio * 100) / 100,
      aberturas: data_preview,
      observaciones: textObservacion,
      cliente: cliente,
      numero: numero_new,
      fecha: currentDate,
    }

    if (data.aberturas.length === 0) {
      toast({
        title: `Error Presupuesto vacio.`,
        status: 'error',
        isClosable: true,
      })
      return
    }

    setLoading(true)
    await dispatch(saveDataPresupuesto(data))
    setLoading(false)
    toast({
      title: `Presupuesto Copiado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    dispatch(setDataEditPresupuesto([]))
    setReset(true)
    setTimeout(() => setReset(false), 1000)
    setCliente('Consumidor Final')
    setObservacion('')
    setDataEdit(false)
  }

  return (
    <>
      <Container>
        <ContainerForm>
          <NewItemEditPresupuesto
            data_edit={data_edit}
            setCliente={setCliente}
            setObservacion={setObservacion}
            resetForm={reset}
          />
        </ContainerForm>
        <ContainerPre>
          <Title>Previsualización</Title>
          <WrapperTop>
            <div>Cliente: {cliente} </div>
            <Stat style={{ flex: 'none', textAlign: 'right' }}>
              <StatHelpText>Presupuesto N°: {data_edit?.numero}</StatHelpText>
              <StatHelpText>Fecha: {data_edit?.fecha}</StatHelpText>
            </Stat>
          </WrapperTop>
          <Divider />
          <Wrapper>
            <TableContainer overflowY='auto' height='440px' overflowX='auto'>
              <Table variant='simple' size='sm'>
                <Thead position='sticky' top={0} bgColor='white'>
                  <Tr>
                    <Th textAlign='center'>Abertura</Th>
                    <Th textAlign='center'>Medidas</Th>
                    <Th textAlign='center'>Vidrio</Th>
                    <Th textAlign='center'>M2</Th>
                    <Th textAlign='center'>Revestimiento Aluminio</Th>
                    <Th textAlign='center'>M</Th>
                    <Th textAlign='center'>P.Unitario</Th>
                    <Th textAlign='center'>Cantidad</Th>
                    <Th textAlign='center'>P.Total</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data_preview.map((data, index) => (
                    <Items data={data} index={index} key={index} setDetailModal={setDetailModal} edit={true}></Items>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Wrapper>
          <Divider />
          <WrapperFooter>
            <Stat style={{ flex: 'none', marginTop: '10px' }}>
              <StatLabel>Total</StatLabel>
              <StatNumber>$ {Math.round(precio * 100) / 100}</StatNumber>
              <FooterTextObs>{textObservacion}</FooterTextObs>
            </Stat>
            <Stack direction='row' spacing={4} align='center'>
              <Button type='submit' isLoading={isLoading} colorScheme='teal' onClick={() => onSubmit()}>
                Guardar Cambios
              </Button>
              <Button isLoading={isLoading} colorScheme='blue' onClick={(e) => guardarCopia(e)}>
                Guardar Copia
              </Button>
            </Stack>
          </WrapperFooter>
        </ContainerPre>
      </Container>
      <ModalComponent title='Detalles' open={detailModal} setState={setDetailModal}>
        {detailModal && <DetailModal detalles={detailModal} />}
      </ModalComponent>
    </>
  )
}
export default EditPresupuestos
