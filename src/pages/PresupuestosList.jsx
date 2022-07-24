import { NotAllowedIcon } from '@chakra-ui/icons'
import { Divider } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import TablaPresupuestos from '../components/Tables/TablaPresupuestos'
import { getDataPresupuesto } from '../reducer/DataTablesSlice'

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
const NoData = styled.div`
  padding: 10px 20px;
`
const PresupuestosList = () => {
  const presupuestos = useSelector((state) => state.DataTables.presupuestos)
    const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataPresupuesto())
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>
          <FaFileInvoiceDollar /> Presupuestos
        </Title>
      </Wrapper>
      <Divider />
      {presupuestos.length > 0 ? (
        <TablaPresupuestos data={presupuestos}/>
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default PresupuestosList
