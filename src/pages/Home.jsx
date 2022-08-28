import { Grid, GridItem } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import {
  MdReceipt,
  MdSupervisorAccount,
  MdOutlineBusiness,
  MdSensorDoor,
  MdBorderVertical,
  MdDashboard,
  MdOutlineViewInAr,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
const BoxIcon = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #34a19a;
  border-radius: 10px;
  color: white;
`
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`
const WrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const Home = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <WrapperColumn>
          <h1>Negocio</h1>
          <Grid templateColumns='repeat(5, 1fr)' gap={6}>
            <GridItem w='100%'>
              <Link to='/presupuestos/'>
                <BoxIcon>
                  <MdReceipt fontSize={70} />
                  Presupuestos
                </BoxIcon>
              </Link>
            </GridItem>
            <GridItem w='100%'>
              <Link to='/clientes/'>
                <BoxIcon>
                  <MdSupervisorAccount fontSize={70} />
                  Clientes
                </BoxIcon>
              </Link>
            </GridItem>
            <GridItem w='100%'>
              <Link to='/proveedores/'>
                <BoxIcon>
                  <MdOutlineBusiness fontSize={70} />
                  Proveedores
                </BoxIcon>
              </Link>
            </GridItem>
          </Grid>
        </WrapperColumn>
      </Container>
      <Container>
        <WrapperColumn>
          <h1>Fabrica</h1>
          <Grid templateColumns='repeat(5, 1fr)' gap={6}>
            <GridItem w='100%'>
              <Link to='/aberturas/'>
                <BoxIcon>
                  <MdSensorDoor fontSize={70} />
                  Aberturas
                </BoxIcon>
              </Link>
            </GridItem>
            <GridItem w='100%'>
              <Link to='/perfiles/'>
                <BoxIcon>
                  <MdBorderVertical fontSize={70} />
                  Perfiles
                </BoxIcon>
              </Link>
            </GridItem>
            <GridItem w='100%'>
              <Link to='/vidrios/'>
                <BoxIcon>
                  <MdDashboard fontSize={70} />
                  Vidrios
                </BoxIcon>
              </Link>
            </GridItem>
            <GridItem w='100%'>
              <Link to='/accesorios/'>
                <BoxIcon>
                  <MdOutlineViewInAr fontSize={70} /> Accesorios
                </BoxIcon>
              </Link>
            </GridItem>
          </Grid>
        </WrapperColumn>
      </Container>
    </div>
  )
}

export default Home
