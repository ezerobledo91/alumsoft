import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
})

const PDFdownload = ({ data }) => {
  const { cliente, fecha, numero, observaciones, precio, aberturas, cliente_telefono, cliente_direccion } = data

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>ABERTURAS RECONQUISTA</Text>
          <Text style={styles.paragraph}>de Ballaben Claudia Rosana</Text>
          <Text style={styles.paragraph}>Rivadavia 1485 Reconquista Santa Fe 3560</Text>
          <Text style={styles.paragraph}>Tel: 3482-588659</Text>
          <Text style={styles.paragraph}>RESPONSABLE INSCRIPTO</Text>
        </View>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text>Presupuesto N°: {numero}</Text>
              <Text>Fecha: {fecha}</Text>
              <Text>CUIT: 27-21420625-6</Text>
              <Text>Ing.Brutos: 141-017090-5</Text>
              <Text>D.R.I: 7934/5</Text>
              <Text>F.Inc.Act: 01/06/2006</Text>
            </View>
            <View>
              <Text>X</Text>
              <Text>Documento No Valido como Factura</Text>
            </View>
          </View>
          {/* ... Otros elementos */}
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Cliente</Text>
          <Text>Nombre: {cliente}</Text>
          <Text>Teléfono: {cliente_telefono || 'Sin Información'}</Text>
          <Text>Dirección: {cliente_direccion || 'Sin Información'}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Detalle de Aberturas</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Abertura</Text>
              <Text style={styles.tableCell}>Medidas</Text>
              <Text style={styles.tableCell}>P.Unitario</Text>
              <Text style={styles.tableCell}>Cantidad</Text>
              <Text style={styles.tableCell}>P.Total</Text>
            </View>
            {/* Mapea aquí los datos de aberturas */}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Total</Text>
          <Text>Total: ${precio}</Text>
          <Text>{observaciones}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDFdownload
