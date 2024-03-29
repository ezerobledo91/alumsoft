import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Proveedores from './pages/Proveedores';
import Clientes from './pages/Clientes';
import Perfiles from './pages/Perfiles';
import Aberturas from './pages/Aberturas';
import PresupuestosList from './pages/PresupuestosList';
import Vidrios from './pages/Vidrios';
import Accesorios from './pages/Accesorio';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/perfiles" element={<Perfiles />} />
          <Route path="/aberturas" element={<Aberturas />} />
          <Route path="/presupuestos/" element={<PresupuestosList />} />
          <Route path="/vidrios/" element={<Vidrios />} />
          <Route path="/accesorios/" element={<Accesorios />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
