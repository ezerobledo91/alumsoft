import { AddIcon, EditIcon, HamburgerIcon, ViewIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'

import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
const Container = styled.div`
  height: '60px';
  background-color: #292929;
  ${mobile({
    height: '50px',
  })};
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    padding: '10px 0px',
  })}
`

const Logo = styled.div`
  font-weight: 500;
  color: white;
`

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Logo>Alum Soft</Logo>
        <Menu>
          <MenuButton as={IconButton} aria-label='Options' icon={<HamburgerIcon />} />
          <MenuList>
            <MenuGroup title='Presupuestos' textAlign={'left'}>
              <MenuItem icon={<AddIcon />}>Añadir</MenuItem>
              <MenuItem icon={<ViewIcon />}>Ver Todos</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Clientes' textAlign={'left'}>
              <MenuItem icon={<AddIcon />}>Añadir</MenuItem>
            </MenuGroup>
            <MenuDivider />

            <MenuGroup title='Proveedores' textAlign={'left'}>
              <MenuItem icon={<AddIcon />}>Añadir</MenuItem>
            </MenuGroup>
            <MenuDivider />

            <MenuGroup title='Cuenta' textAlign={'left'}>
              <MenuItem icon={<EditIcon />}>Salir</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Wrapper>
    </Container>
  )
}

export default Navbar
