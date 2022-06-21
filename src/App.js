import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'

import Presupuestos from './pages/Presupuestos';
import Proveedores from './pages/Proveedores';
import Clientes from './pages/Clientes';
import Perfiles from './pages/Perfiles';
import Piezas from './pages/Piezas';
import Aberturas from './pages/Aberturas';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/perfiles" element={<Perfiles />}/>
           <Route path="/piezas" element={<Piezas/>} />
          <Route path="/aberturas" element={<Aberturas/>} />
          <Route path="/presupuestos" element={<Presupuestos />} />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
