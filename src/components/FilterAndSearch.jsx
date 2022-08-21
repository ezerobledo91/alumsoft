import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {  SearchIcon } from '@chakra-ui/icons'
import { FiltersContainer } from './Styled/StyledGenericLayout'

const FilterAndSearch = () => {
  return (
    <FiltersContainer>
    <InputGroup size='sm' style={{maxWidth:'30%'}}>
      <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
      <Input type='search' placeholder='Buscar' />
    </InputGroup>
  </FiltersContainer>
  )
}

export default FilterAndSearch