import React from 'react'
import { Divider, IconButton, Input, InputGroup, InputLeftElement, Tooltip } from '@chakra-ui/react'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { updateStateModal } from '../reducer/UiSlice'

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
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Title>{title}</Title>
      <FiltersContainer>
        <InputGroup size='sm'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input type='search' placeholder='Buscar' />
        </InputGroup>
        <Tooltip label={'Añadir ' + title} fontSize='xs'>
          <IconButton
            aria-label={'Añadir ' + title}
            icon={<AddIcon />}
            size='sm'
            onClick={() => {
              dispatch(updateStateModal(true))
            }}
          />
        </Tooltip>
      </FiltersContainer>
      <Divider />
    </Wrapper>
  )
}

export default Header
