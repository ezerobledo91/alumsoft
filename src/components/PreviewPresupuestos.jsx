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
import ItemsPrint from './Forms/Presupuestos/ItemsPrint'



const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  height: -webkit-fill-available;
`
const ContainerPre = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  height: fit-content;

`
const Print = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
  border: solid #979797 1px;
  padding: 10px;
  border-radius: 5px;
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
const WrapperData = styled.div`
 display :flex ;
 flex-direction: column;
 gap: 5px;
 padding: 5px;
`
const TitleName = styled.div`
  font-size: 20px;
  font-weight: 700;
`

const WrapperX = styled.div`
  display: flex;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
`
const X = styled.div`
    font-size: 30px;
    font-weight: 900;
`
const PrintableBodyWrapper = styled.div`
  @media print {
    height:auto;
    width:100%;
    }
`;


const PreviewPresupuestos = React.forwardRef((props, ref) => {

    const {cliente, fecha, numero, observaciones, precio, aberturas} = props.data
    document.title=`Presupuesto ${numero} - Cliente ${cliente}`
  return (
    <Print ref={ref}>
      <ContainerPre>
        <WrapperTop>
        <WrapperData>
            <TitleName>ABERTURAS RECONQUISTA</TitleName>
            <p>de Bellaben Claudia Rosana</p>
            <p>Rivadavia 1485 Reconquista Santa Fe 3560</p>
            <p>Tel: 3482-588659</p>
        </WrapperData>
        <WrapperX>
          <X>X</X>
          Documento No Valido como Factura
        </WrapperX>
        <Stat style={{ flex: 'none', textAlign: 'right' }}>
          <StatHelpText>Presupuesto N°: {numero}</StatHelpText>
          <StatHelpText>Fecha: {fecha}</StatHelpText>
          <StatHelpText>Cliente: {cliente} </StatHelpText>
        </Stat> 
        
      </WrapperTop>
     <Divider />
      <Wrapper>
      <PrintableBodyWrapper>
        <TableContainer>
          <Table variant='simple' size='sm'>
            <Thead position='sticky' top={0} bgColor='white'>
              <Tr>
                <Th textAlign='center'>Abertura</Th>
                <Th textAlign='center'>Medidas</Th>
                <Th textAlign='center'>P.Unitario</Th>
                <Th textAlign='center'>Cantidad</Th>
                <Th textAlign='center'>P.Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
                {aberturas.map((data, index) => (
                    <ItemsPrint data={data} index={index} key={index}></ItemsPrint>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        </PrintableBodyWrapper>
      </Wrapper>
      <Divider />

    </ContainerPre>   
       <WrapperFooter>
        <Stat style={{ flex: 'none', marginTop: '10px' }}>
          <StatLabel>Total</StatLabel>
          <StatNumber>$ {precio}</StatNumber>
          <FooterTextObs>{observaciones}</FooterTextObs>
        </Stat>
      </WrapperFooter>
      </Print>
  )
})

export default PreviewPresupuestos
