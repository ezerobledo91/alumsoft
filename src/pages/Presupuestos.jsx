import { DeleteIcon } from '@chakra-ui/icons'
import { Divider, ListItem, Stat, StatHelpText, StatLabel, StatNumber, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import NewPresupuesto from '../components/Forms/Presupuestos/NewPresupuesto'

import Navbar from '../components/Navbar'
import { removeDataPreview } from '../reducer/UiSlice'

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
  gap: 30px;
  max-height: 500px;
  overflow: auto;
`
const RemoveLine = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  font-size: 10px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: black;
  color: white;
  cursor: pointer;
`
const WrapperLine = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let currentDate = `${day}-${month}-${year}`

const Presupuestos = () => {
  const data_preview = useSelector((state) => state.UiSlice.previewPres.data) // Los items de Presupuestos.
  let precio = 0 // precio total de los items
  data_preview.forEach((item) => {
    precio = precio + item.precio_total * item.cantidad // Precio total.
  })

  const dispatch = useDispatch()

  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>Presupuesto</Title>
      </Wrapper>
      <Divider />
      <Container>
        <ContainerForm>
          <NewPresupuesto />
        </ContainerForm>
        <ContainerPre>
          <Title>Previsualizacion</Title>
          <Wrapper>
            <WrapperItems>
              {data_preview.map((data, index) => (
                <div key={index}>
                  <div>
                    <WrapperLine>
                      <strong>{data.abertura}</strong> | Ancho: {data.medidas.ancho}m Alto: {data.medidas.alto} m 
                      | Peso total:
                      {data.peso_total}Kg
                      <RemoveLine onClick={() => dispatch(removeDataPreview(data))}>
                        <DeleteIcon />
                      </RemoveLine>
                    </WrapperLine>
                    <p>Precio Unitario: ${data.precio_total}</p>
                    <p>Cantidad: {data.cantidad}u</p>
                    <p>Precio Total: ${data.precio_total * data.cantidad}</p>
                  </div>
                  {/* <p>Piezas</p>
                  <UnorderedList>
                    {data.data.map((pieza, index) => (
                      <ListItem key={index}>
                        {pieza.nombre_pieza} | Total Aluminio Longitud: {pieza.total_aluminio_long}m | Total Peso:{' '}
                        {pieza.total_aluminio_peso}Kg
                      </ListItem>
                    ))}
                  </UnorderedList> */}

                  <Divider />
                </div>
              ))}
            </WrapperItems>
          </Wrapper>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>${Math.round(precio * 100) / 100}</StatNumber>
            <StatHelpText>{currentDate}</StatHelpText>
          </Stat>
        </ContainerPre>
      </Container>
    </>
  )
}
export default Presupuestos
