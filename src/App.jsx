import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/Login';

function App() {
  return(
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </ChakraProvider>
    
  )
  
}

export default App
