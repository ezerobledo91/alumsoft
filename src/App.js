import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Clientes from './pages/Clientes';

import Home from './pages/Home'
import Proveedores from './pages/Proveedores';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
          <Proveedores />
          {/* <Clientes /> */}
      </div>
    </ChakraProvider>
  );
}

export default App;
