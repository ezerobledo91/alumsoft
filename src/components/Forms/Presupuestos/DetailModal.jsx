import { ListItem, UnorderedList, Divider } from '@chakra-ui/react'
import React from 'react'
import { ColumnFlexItems } from '../../Styled/StyledGenericLayout'

const DetailModal = ({ detalles }) => {
  return (
    <UnorderedList style={{ fontWeight: '300', maxHeight: '500px', overflow: 'auto', fontSize: '14px' }}>
      <ListItem>
        <strong>Nombre: </strong> {detalles.abertura}
      </ListItem>
      <ListItem>
        <strong>Precio Kg Aluminio: </strong> $ {detalles.precio_aluminio}
      </ListItem>
      <ListItem>
        <strong>Porcentaje: </strong> {detalles.porcentaje_aplicado}%
      </ListItem>
      <ListItem>
        <strong>Cantidad: </strong> {detalles.cantidad} u
      </ListItem>
      <ListItem>
        <strong>Perfiles: </strong>
        <UnorderedList>
          {detalles.data.map((perfil, key) => {
            return (
              <ColumnFlexItems key={key}>
                <p>Nombre: {perfil.nombre_pieza}</p>
                <p>Longitud Total: {perfil.total_aluminio_long} m</p>
                <p>Peso Total: {perfil.total_aluminio_peso}Kg</p>
                <Divider />
              </ColumnFlexItems>
            )
          })}
          <p>Peso Total Perfiles: {detalles.peso_total} Kg</p>
          <p>Costo Total Perfiles: $ {Math.round(detalles.peso_total * detalles.precio_aluminio * 100) / 100}</p>
        </UnorderedList>
      </ListItem>
      <ListItem>
        <strong>Vidrio: </strong> {detalles.vidrio}
      </ListItem>
      <UnorderedList>
        <p>Total de Vidrio: {detalles.vidrio_mt} m2</p>
        <p>Precio Vidrio: $ {detalles.precio_vidrio}</p>
      </UnorderedList>
      <Divider />
      <ListItem>
        <strong>Revestimiento Aluminio: </strong> {detalles.revestimiento_al}
      </ListItem>
      <UnorderedList>
        <p>Total de Revestimiento Aluminio: {detalles.revestimiento_al_mt} m</p>
        <p>Precio Revestimiento Aluminio: $ {detalles.precio_revestimiento_al}</p>
      </UnorderedList>
      <Divider />
      <ListItem>
        <strong>Accesorios:</strong>
        <UnorderedList>
          {detalles.accesorios.map((accesorio) => {
            return (
              <ColumnFlexItems key={accesorio.nombre}>
                <p>Nombre: {accesorio.nombre}</p>
                {accesorio.unidad === 'unidades' ? '' : <p>Colocacion: {accesorio.colocacion}</p>}
                <p>Cantidad: {accesorio.cantidad}</p>
                <Divider />
              </ColumnFlexItems>
            )
          })}
          <p>Precio Total Accesorios: $ {detalles.precio_accesorios}</p>
        </UnorderedList>
      </ListItem>
    </UnorderedList>
  )
}

export default DetailModal
