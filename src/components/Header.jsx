import React from 'react'
import { Divider} from '@chakra-ui/react'
import styled from 'styled-components'
import { Title } from './Styled/StyledGenericLayout'

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`



const Header = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Divider />
    </Wrapper>
  )
}

export default Header
