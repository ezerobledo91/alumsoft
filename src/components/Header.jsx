import React from 'react'
import { Divider, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {  SearchIcon } from '@chakra-ui/icons'
import styled from 'styled-components'

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
const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  max-width: 50%;
  padding: 10px 0px;
`

const Header = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <FiltersContainer>
        <InputGroup size='sm'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input type='search' placeholder='Buscar' />
        </InputGroup>
        </FiltersContainer>
      <Divider />
    </Wrapper>
  )
}

export default Header
