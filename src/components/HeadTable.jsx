import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { Divider, IconButton, Input, InputGroup, InputLeftElement, Select, Tooltip } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
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
  text-transform: capitalize;
`
const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  max-width: 50%;
  padding: 10px 0px;
`

function HeadTable() {
  const { entity } = useSelector((state) => state.entityContext)

  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Title>{entity}</Title>
      <FiltersContainer>
        {entity === 'proveedor' ? (
          <Select placeholder='Categoría' size='sm'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
        ) : (
          <></>
        )}
        <InputGroup size='sm'>
          <InputLeftElement pointerEvents='none' children={<SearchIcon color='gray.300' />} />
          <Input type='search' placeholder='Buscar' />
        </InputGroup>
        <Tooltip label={'Añadir ' + entity} fontSize='xs'>
          <IconButton
            aria-label={'Añadir ' + entity}
            icon={<AddIcon />}
            size='sm'
            onClick={() => dispatch(open({ name: entity, type: 'new', }))}
          />
        </Tooltip>
      </FiltersContainer>
      <Divider />
    </Wrapper>
  )
}

export default HeadTable
