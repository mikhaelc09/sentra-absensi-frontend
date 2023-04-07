import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from './pages/Login';
import ResetPassPage from './pages/ResetPass';
import HomePage from './pages/absensi/Home';
import RiwayatPage from './pages/izin/Riwayat';
import IzinCuti from './pages/izin/IzinCuti';
import IzinMCU from './pages/izin/IzinMCU';
import ProfilePage from './pages/profile/Profile';
import UbahPass from './pages/profile/UbahPass';

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
        <Route exact path="/izin" element={<RiwayatPage /> } />
        <Route exact path="/izin/cuti" element={<IzinCuti /> } />
        <Route exact path="/izin/mcu" element={<IzinMCU /> } />
        <Route exact path="/profil" element={<ProfilePage /> } />
        <Route exact path="/profil/password" element={<UbahPass /> } />
      </Routes>
    </ChakraProvider>
    
  )
  
}

export default App
