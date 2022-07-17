import { Divider, Stat, StatHelpText, StatLabel, StatNumber, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Items from '../components/Forms/Presupuestos/Items'
import NewPresupuesto from '../components/Forms/Presupuestos/NewPresupuesto'
import Navbar from '../components/Navbar'

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

const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let currentDate = `${day}-${month}-${year}`

const Presupuestos = () => {
  const data_preview = useSelector((state) => state.UiSlice.previewPres.data) // Los items de Presupuestos.
  let precio = 0 // precio total de los items
  
  // Cliente
  const [cliente, setCliente]= useState('Consumidor Final')
  // Observaciones
  let [textObservacion, setObservacion] = useState('')

  data_preview.forEach((item) => {
    precio = precio + item.precio_total * item.cantidad // Precio total.
  })

  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>Nuevo Presupuesto</Title> 
      </Wrapper>
      <Divider />
      <Container>
        <ContainerForm>
          <NewPresupuesto setCliente={setCliente}  setObservacion={setObservacion}/>
        </ContainerForm>
        <ContainerPre>
          <Title>Previsualizacion</Title> 
          <WrapperTop>
             <div>Cliente: {cliente === '' ? 'Consumidor Final' : cliente} </div> <Stat style={{flex:'none'}}> <StatHelpText>{currentDate}</StatHelpText></Stat>
          </WrapperTop>
          <Divider/>
          <Wrapper>
            <TableContainer overflowY="auto" height="450px">
              <Table variant='simple' size='sm'>
                <TableCaption>Presupuesto N° </TableCaption>
                <Thead position="sticky" top={0} bgColor="white">
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
                  {data_preview.map((data, index) => (
                    <Items data={data} index={index} ></Items>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Wrapper>
          <Divider/>
          <Stat style={{flex:'none',marginTop:'10px'}}>
            <StatLabel>Total</StatLabel>
            <StatNumber>$ {Math.round(precio * 100) / 100}</StatNumber>
            <FooterTextObs>{textObservacion}</FooterTextObs>
          </Stat>
        </ContainerPre>
      </Container>
    </>
  )
}
export default Presupuestos
