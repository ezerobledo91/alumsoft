import { NotAllowedIcon, SearchIcon } from '@chakra-ui/icons'
import { Divider, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import TablaPresupuestos from '../components/Tables/TablaPresupuestos'
import { filterPresupuesto, getDataPresupuesto } from '../reducer/DataTablesSlice'

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
const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  max-width: 50%;
  padding: 10px 0px;
`
const PresupuestosList = () => {
  const presupuestos = useSelector((state) => state.DataTables.presupuestos)
  const dispatch = useDispatch()
  // const [dataPresupuesto, setDataPresupuesto] = useState([])


  useEffect(() => {
    dispatch(getDataPresupuesto())
   }, [])

   

  const filterData = (busqueda) =>{
      dispatch(filterPresupuesto(+busqueda))

  }


  return (
    <>
      <Navbar />
      <Wrapper>
        <Title>
          <FaFileInvoiceDollar /> Presupuestos
        </Title>
        <FiltersContainer>
          <InputGroup size='sm'>
            <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
            <Input type='search' placeholder='Buscar' onChange={(e)=>filterData(e.target.value)} />
          </InputGroup>
        </FiltersContainer>
      </Wrapper>
      <Divider />
      {presupuestos.length > 0 ? (
        <TablaPresupuestos data={presupuestos} />
      ) : (
        <NoData>
          <NotAllowedIcon /> No existen Datos
        </NoData>
      )}
    </>
  )
}

export default PresupuestosList
