import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/Login';
import ResetPassPage from './pages/ResetPass';
import HomePage from './pages/absensi/Home';

const theme = extendTheme({
  colors: {
    primary: {
      500: "#0A3964"
    }
  }
})

function App() {
  return(
    <ChakraProvider>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/reset-password" element={<ResetPassPage />} />
        <Route exact path="/absensi" element={<HomePage />} />
      </Routes>
    </ChakraProvider>
    
  )
  
}

export default App
