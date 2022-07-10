import { Divider, ListItem, Stat, StatHelpText, StatLabel, StatNumber, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import NewPresupuesto from '../components/Forms/Presupuestos/NewPresupuesto'

import Navbar from '../components/Navbar'

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
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
`
const ContainerForm = styled.div`
  flex: 1;
`
const ContainerPre = styled.div`
  flex: 1;
  border: solid #979797 1px;
  padding: 10px;
  border-radius: 5px;
`
const WrapperItems = styled.div`
  display: flex;
  flex-direction: column;
  gap:30px;
  max-height: 500px;
  overflow: auto;
`
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;


const Presupuestos = () => {
  const data_preview = useSelector((state) => state.UiSlice.previewPres.data)
  let precio = 0 // precio total de los items
  data_preview.forEach((item)=>{
    precio = precio + item.precio_total
  })



  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>Presupuesto</Title>
      </Wrapper>
      <Divider />
      <Container>
        <ContainerForm>
          <NewPresupuesto></NewPresupuesto>
        </ContainerForm>
        <ContainerPre>
         <Title>Previsualizacion</Title>
           <Wrapper>
             <WrapperItems>
            {data_preview.map((data, index) => (
              <div key={index}>
              <div>{data.abertura} | Ancho: {data.medidas.ancho}m Alto: {data.medidas.alto} m | Peso total: {data.peso_total}Kg
              <p>Precio: ${data.precio_total}</p></div>
               <p>Piezas</p>
               <UnorderedList>
                  {data.data.map((pieza,index)=> <ListItem key={index}> {pieza.nombre_pieza} | Total Aluminio Longitud: {pieza.total_aluminio_long} | Total Peso: {pieza.total_aluminio_peso}</ListItem>)}            
              </UnorderedList>
             
              </div>
            ))}
            </WrapperItems>
        </Wrapper>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>${Math.round(precio *100)/100}</StatNumber>
            <StatHelpText>{currentDate}</StatHelpText>
          </Stat>
        </ContainerPre>
      </Container>
    </>
  )
}
export default Presupuestos
