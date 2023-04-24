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
import LaporanPeriode from './pages/absensi/LaporanPeriode';
import LaporanTahunan from './pages/absensi/LaporanTahunan';
import DetailIzinPage from './pages/izin/DetailIzin';
import { UserContextProvider } from './context/UserContext';

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
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/reset-password" element={<ResetPassPage />} />
          <Route exact path="/absensi" element={<HomePage />} />
          <Route exact path="/absensi/laporan/periode" element={<LaporanPeriode />} />
          <Route exact path="/absensi/laporan/tahunan" element={<LaporanTahunan />} />
          <Route exact path="/izin" element={<RiwayatPage /> } />
          <Route exact path="/izin/:id_izin" element={<DetailIzinPage /> } />
          <Route exact path="/izin/cuti" element={<IzinCuti /> } />
          <Route exact path="/izin/mcu" element={<IzinMCU /> } />
          <Route exact path="/profil" element={<ProfilePage /> } />
          <Route exact path="/profil/password" element={<UbahPass /> } />
        </Routes>
      </UserContextProvider>
    </ChakraProvider>
    
  )
  
}

export default App
