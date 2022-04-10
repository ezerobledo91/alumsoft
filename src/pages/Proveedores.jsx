import React from 'react'
import HeadTable from '../components/HeadTable'
import Navbar from '../components/Navbar'
import NewProveedor from '../components/NewProveedorModal'
import Tables from '../components/Tables'

function Proveedores() {
  return (
    <div>
      <Navbar />
      <HeadTable />
      <Tables />
      <NewProveedor />
    </div>
  )
}

export default Proveedores
