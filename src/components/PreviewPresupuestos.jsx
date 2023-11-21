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
  @media print {
    overflow: hidden;
  }
`
const Print = styled.div`
  display: flex;
  flex-direction: column;
  border: solid #979797 1px;
  padding: 10px;
  border-radius: 5px;
  @media print {
    size: A4 horizontal;
    overflow: 'hidden';
    margin: 20px;

    table {
      font-size: 10px;
      border-collapse: collapse;
      max-width: 100%;
      overflow-x: hidden;
    }
    td,
    th {
      border: 1px solid lightgray;
      padding: 8px;
      /* Ajusta el alto de las filas automáticamente */
      height: auto;
      max-height: 100px; /* Opcional: establece un máximo alto */
      // Evita el salto de línea en las celdas
    }
  }
`

const WrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
`
const FooterTextObs = styled.div`
  display: flex;
  font-weight: 300;
  font-size: 10px;
  padding: 10px;
  max-width: 90vw;
  justify-content: flex-end;
  word-break: normal;
`
const WrapperFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const WrapperData = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
`
const TitleName = styled.div`
  font-size: 18px;
  font-weight: 700;
`

const WrapperX = styled.div`
  display: flex;
  flex: 1;
  justify-content: top;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
`
const X = styled.div`
  font-size: 30px;
  font-weight: 900;
`
const PrintableBodyWrapper = styled.div`
  @media print {
    height: auto;
    width: auto;
    overflow: 'hidden';
  }
`

const PreviewPresupuestos = React.forwardRef((props, ref) => {
  const { cliente, fecha, numero, observaciones, precio, aberturas, cliente_telefono, cliente_direccion } = props.data
  return (
    <Print ref={ref} id='toPDF'>
      <ContainerPre>
        <WrapperTop>
          <WrapperData>
            <TitleName>ABERTURAS RECONQUISTA</TitleName>
            <p>de Ballaben Claudia Rosana</p>
            <p>Rivadavia 1485 Reconquista Santa Fe 3560</p>
            <p>Tel: 3482-588659</p>
            <p>RESPONSABLE INSCRIPTO</p>
          </WrapperData>
          <WrapperX>
            <X>X</X>
            Documento No Valido como Factura
          </WrapperX>
          <Stat style={{ flex: 'none', textAlign: 'right', flex: '1' }}>
            <StatHelpText style={{ marginBottom: '0' }}>Presupuesto N°: {numero}</StatHelpText>
            <StatHelpText style={{ marginBottom: '0' }}>Fecha: {fecha}</StatHelpText>
            <StatHelpText style={{ marginBottom: '0' }}>CUIT: 27-21420625-6 </StatHelpText>
            <StatHelpText style={{ marginBottom: '0' }}>Ing.Brutos: 141-017090-5</StatHelpText>
            <StatHelpText style={{ marginBottom: '0' }}>D.R.I: 7934/5</StatHelpText>
            <StatHelpText style={{ marginBottom: '0' }}>F.Inc.Act: 01/06/2006</StatHelpText>
          </Stat>
        </WrapperTop>
        <Divider />
        <Wrapper>
          <div style={{ margin: '5px 0', borderBottom: 'solid 1px lightgray' }}>
            <p style={{ display: 'flex', gap: '5px' }}>
              <span>Cliente: {cliente} </span>-<span>Teléfono: {cliente_telefono || 'Sin Información'} </span> -
              <span>Dirección: {cliente_direccion || 'Sin Información'}</span>
            </p>
          </div>
          <PrintableBodyWrapper>
            <TableContainer>
              <Table variant='simple' size='xs' width='100%'>
                <Thead position='sticky' top={0} bgColor='white'>
                  <Tr>
                    <Th textAlign='center'>Abertura</Th>
                    <Th textAlign='center'>Medidas</Th>
                    <Th textAlign='center'>Vidrios</Th>
                    <Th textAlign='center'>P.Unitario</Th>
                    <Th textAlign='center'>Cantidad</Th>
                    <Th textAlign='center'>P.Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {aberturas.map((data, index) => (
                    <ItemsPrint data={data} index={`${index}a`} key={index}></ItemsPrint>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </PrintableBodyWrapper>
        </Wrapper>
        <Divider />
      </ContainerPre>
      <WrapperFooter>
        <Stat style={{ flex: 'none', marginTop: '10px', textAlign: 'right' }}>
          <StatLabel>Total</StatLabel>
          <StatNumber>$ {precio}</StatNumber>
          <FooterTextObs>{observaciones}</FooterTextObs>
        </Stat>
      </WrapperFooter>
    </Print>
  )
})

export default PreviewPresupuestos
