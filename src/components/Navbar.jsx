import { AddIcon, ArrowBackIcon, HamburgerIcon, ViewIcon } from '@chakra-ui/icons'
import { IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'

import React from 'react'
import { Link } from 'react-router-dom'
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
              <Link to='/presupuestos/nuevo'>
                <MenuItem icon={<AddIcon />}>Nuevo</MenuItem>
              </Link>
              <Link to='/presupuestos'>
                <MenuItem icon={<ViewIcon />}>Ver Todos</MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
            <Link to='/proveedores'>
              <MenuItem>Proveedores</MenuItem>
            </Link>
            <Link to='/clientes'>
              <MenuItem>Clientes</MenuItem>
            </Link>
            <MenuDivider />
            <MenuGroup title='Componentes' textAlign={'left'}>
              <Link to='/aberturas'>
                <MenuItem>Aberturas</MenuItem>
              </Link>
              <Link to='/piezas'>
                <MenuItem>Piezas</MenuItem>
              </Link>
              <Link to='/perfiles'>
                <MenuItem>Perfiles</MenuItem>
              </Link>
              <MenuItem>Vidrios</MenuItem>
              <MenuItem>Accesorios</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Cuenta' textAlign={'left'}>
              <MenuItem icon={<ArrowBackIcon />}>Salir</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Wrapper>
    </Container>
  )
}

export default Navbar
