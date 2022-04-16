import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Clientes from './pages/Clientes';

import Home from './pages/Home'
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
