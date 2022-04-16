import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Divider, IconButton, Input, InputGroup, InputLeftElement, Select, Tooltip } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { open } from '../reducer/modalSlice'

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
`

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  max-width: 50%;
  padding: 10px 0px;
`

function HeadTable({ name }) {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Title>{name}</Title>
      <FiltersContainer>
        <Select placeholder='Categoría' size='sm'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <InputGroup size='sm'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input type='search' placeholder='Buscar' />
        </InputGroup>
        <Tooltip label={'Añadir ' + name} fontSize='xs'>
          <IconButton aria-label={'Añadir ' + name} icon={<AddIcon />} size='sm' onClick={() => dispatch(open({name:name}))} />
        </Tooltip>
      </FiltersContainer>
      <Divider />
    </Wrapper>
  )
}

export default HeadTable
