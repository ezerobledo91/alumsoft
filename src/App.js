import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Clientes from './pages/Clientes';

import Home from './pages/Home'
import Perfiles from './pages/Perfiles';
import Proveedores from './pages/Proveedores';
import Piezas from './pages/Piezas';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/perfiles" element={<Perfiles />} />
          <Route path="/piezas" element={<Piezas />} />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
