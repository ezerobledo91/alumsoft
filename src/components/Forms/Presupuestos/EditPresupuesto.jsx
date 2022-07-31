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
import { FaFileInvoiceDollar, FaRegSave } from 'react-icons/fa'
import { getDataPresupuesto, updateDataPresupuesto } from '../../../reducer/DataTablesSlice'
import ItemEdit from './ItemEdit'
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
const EditPresupuestos = () => {
  const data_preview = useSelector((state) => state.UiSlice.editPresupuesto) // Los items de Presupuestos.
  const [observacion, setObservacion] = useState('')
  const [reset,setReset] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  useEffect(() => {
    dispatch(getDataPresupuesto())
   setObservacion(data_preview.observaciones)
  }, [dispatch])

  let precio = 0 // precio total de los items.
  data_preview.aberturas.forEach((item) => {
    precio = precio + item.precio_total * item.cantidad // Precio total.
  })

  const onSubmit = () =>{
    const new_data  = {...data_preview}
    new_data.observaciones = observacion
    new_data.precio = Math.round(precio * 100) / 100
    // NO VACIO
    if(new_data.aberturas.length === 0) {
      toast({
        title: `Error Presupuesto vacio.`,
        status: 'error',
        isClosable: true,
      })
      return
    }
  
    dispatch(updateDataPresupuesto(new_data))

    toast({
      title: `Prespuesto Actualizado Correctamente`,
      status: 'success',
      isClosable: true,
    })
    setReset(true)
    setTimeout(()=> setReset(false), 1000)
    setTimeout(()=>dispatch(getDataPresupuesto()), 500)
    

  }

  

  return (
    <>
      <Wrapper>
        <Title>
          <FaFileInvoiceDollar /> Editar Presupuesto
        </Title>
      </Wrapper>
      <Divider />
      <Container>
        <ContainerForm>
          <NewItemEditPresupuesto ID={data_preview.aberturas.length} observacion={observacion} setObservacion={setObservacion} resetForm={reset}/>
        </ContainerForm>
        <ContainerPre>
          <Title>Previsualizacion</Title>
          <WrapperTop>
            <div>Cliente: {data_preview.cliente} </div>
            <Stat style={{ flex: 'none', textAlign: 'right' }}>
              <StatHelpText>Presupuesto N°: {data_preview.numero}</StatHelpText>
              <StatHelpText>Fecha: {data_preview.fecha}</StatHelpText>
            </Stat>
          </WrapperTop>
          <Divider />
          <Wrapper>
            <TableContainer overflowY='auto' height='440px'>
              <Table variant='simple' size='sm'>
                <Thead position='sticky' top={0} bgColor='white'>
                  <Tr>
                    <Th textAlign='center'>Abertura</Th>
                    <Th textAlign='center'>Medidas</Th>
                    <Th textAlign='center'>Cantidad</Th>
                    <Th textAlign='center'>P.Unitario</Th>
                    <Th textAlign='center'>P.Total</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data_preview.aberturas.map((data, index) => (
                    <ItemEdit data={data} index={index}></ItemEdit>
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
              <FooterTextObs>{observacion}</FooterTextObs>
            </Stat>
            <Button onClick={onSubmit}>
              <FaRegSave />
            </Button>
          </WrapperFooter>
        </ContainerPre>
      </Container>
    </>
  )
}
export default EditPresupuestos
