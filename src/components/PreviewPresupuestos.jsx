import React from 'react'
import styled from 'styled-components'
import {
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
  } from '@chakra-ui/react'
import Items from './Forms/Presupuestos/Items'



const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  height: -webkit-fill-available;
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
  @media print {
    margin: 20px;
    height: calc(100vh - 40px);
    }
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


const PreviewPresupuestos = React.forwardRef((props, ref) => {

    const {cliente, fecha, numero, observaciones, precio, aberturas} = props.data
    document.title=`Presupuesto ${numero} - Cliente ${cliente}`
  return (
    <ContainerPre  ref={ref}>
      <WrapperTop>
        <div>Cliente: {cliente} </div>
        <Stat style={{ flex: 'none', textAlign: 'right' }}>
          <StatHelpText>Presupuesto N°: {numero}</StatHelpText>
          <StatHelpText>Fecha: {fecha}</StatHelpText>
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
                <Th textAlign='center'>Vidrio</Th>
                <Th textAlign='center'>M2</Th>
                <Th textAlign='center'>P.Unitario</Th>
                <Th textAlign='center'>Cantidad</Th>
                <Th textAlign='center'>P.Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
                {aberturas.map((data, index) => (
                    <Items key={index} remove={false} data={data} index={index}></Items>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Wrapper>
      <Divider />
      <WrapperFooter>
        <Stat style={{ flex: 'none', marginTop: '10px' }}>
          <StatLabel>Total</StatLabel>
          <StatNumber>$ {precio}</StatNumber>
          <FooterTextObs>{observaciones}</FooterTextObs>
        </Stat>
      </WrapperFooter>
    </ContainerPre>
  )
})

export default PreviewPresupuestos
