import {
  Button,
  Divider,
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
import NewPresupuesto from './NewPresupuesto'
import { FaRegSave } from 'react-icons/fa'
import { getDataPresupuesto, saveDataPresupuesto } from '../../../reducer/DataTablesSlice'
import { removeAllDataPreview } from '../../../reducer/UiSlice'
import ModalComponent from '../../Modal'
import DetailModal from './DetailModal'

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

const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let currentDate = `${day}-${month}-${year}`

const Presupuestos = () => {
  const data_preview = useSelector((state) => state.UiSlice.previewPres.data) // Los items de Presupuestos.
  const presupuestos = useSelector((state) => state.DataTables.presupuestos)
  // Cliente
  const [cliente, setCliente] = useState('Consumidor Final')
  // Observaciones
  let [textObservacion, setObservacion] = useState('')
  // Reset Form
  const [reset, setReset] = useState(false)

  // Modal Detalles 
  const [detailModal, setDetailModal] = useState(false)

  let precio = 0 // precio total de los items.
  let numero = presupuestos.at(-1)?.numero === undefined ? 1 : presupuestos.at(-1)?.numero + 1 // numero de presupuestos.
  data_preview.forEach((item) => {
    precio = precio + ( item.precio_total + item.precio_vidrio + item.precio_accesorios + item.precio_revestimiento_al) * item.cantidad  // Precio total.
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
      fecha:currentDate,
    }
    
    if(data.aberturas.length === 0) {
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
      title: `Prespuesto Guardado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    dispatch(removeAllDataPreview())
    setReset(true)
    setTimeout(()=> setReset(false), 1000)
    setCliente('Consumidor Final')
    setObservacion('')
    }

  useEffect(() => {
    dispatch(getDataPresupuesto())
  }, [dispatch])
  return (
    <>
      <Container>
        <ContainerForm>
          <NewPresupuesto setCliente={setCliente} setObservacion={setObservacion} resetForm={reset} />
        </ContainerForm>
        <ContainerPre>
          <Title>Previsualización</Title>
          <WrapperTop>
            <div>Cliente: {cliente === '' ? 'Consumidor Final' : cliente} </div>
            <Stat style={{ flex: 'none', textAlign:'right' }}>
              <StatHelpText>Presupuesto N°: {numero}</StatHelpText>
              <StatHelpText>Fecha: {currentDate}</StatHelpText>
            </Stat>
          </WrapperTop>
          <Divider />
          <Wrapper>
            <TableContainer overflowY='auto' height='440px' width={'100%'} overflowX='auto'>
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
                    <Items data={data} index={index} key={index} setDetailModal={setDetailModal}></Items>
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
            <Button onClick={onSubmit} isLoading={isLoading}>
              <FaRegSave />
            </Button>
          </WrapperFooter>
        </ContainerPre>
      </Container>
      <ModalComponent title='Detalles' open={detailModal} setState={setDetailModal} >
        {detailModal && <DetailModal detalles={detailModal} />}
      </ModalComponent>
    </>
  )
}
export default Presupuestos
