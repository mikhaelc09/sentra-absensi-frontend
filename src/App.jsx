import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from 'react'

import LoginPage from './pages/auth/Login';
import ResetPassPage from './pages/auth/ResetPass';
import CheckToken from './pages/auth/CheckToken';
import InvalidToken from './pages/auth/InvalidToken';
import NotFound from './pages/auth/404Page';
import HomePage from './pages/absensi/Home';
import RiwayatPage from './pages/izin/Riwayat';
import IzinCuti from './pages/izin/IzinCuti';
import IzinMCU from './pages/izin/IzinMCU';
import ProfilePage from './pages/profile/Profile';
import UbahPass from './pages/profile/UbahPass';
import LaporanPeriode from './pages/absensi/LaporanPeriode';
import LaporanKehadiran from './pages/absensi/LaporanKehadiran';
import DetailIzinPage from './pages/izin/DetailIzin';
import { ToastProvider } from './context/ToastContext';

const theme = extendTheme({
  colors: {
    primary: {
      500: "#0A3964"
    }
  }
})

function App() {
  //TODO clear localstorage kl browser ditutup tp kl pake ini pas refresh jadi ke clear jg
  // useEffect(()=>{
  //   window.addEventListener('beforeunload', localStorage.clear())

  //   return () => {
  //     window.removeEventListener('beforeunload', localStorage.clear())
  //   }
  // }, [])

  return(
    <ChakraProvider>
      <ToastProvider>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/reset-password/:nik" element={<ResetPassPage />} />
          <Route exact path="/check-token" element={<CheckToken />} />
          <Route exact path="/invalid-token" element={<InvalidToken />} />
          <Route exact path="/absensi" element={<HomePage />} />
          <Route exact path="/absensi/laporan/periode" element={<LaporanPeriode />} />
          <Route exact path="/absensi/laporan/kehadiran" element={<LaporanKehadiran />} />
          <Route exact path="/izin" element={<RiwayatPage /> } />
          <Route exact path="/izin/:id_izin" element={<DetailIzinPage /> } />
          <Route exact path="/izin/cuti" element={<IzinCuti /> } />
          <Route exact path="/izin/mcu" element={<IzinMCU /> } />
          <Route exact path="/profil" element={<ProfilePage /> } />
          <Route exact path="/profil/password" element={<UbahPass /> } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </ChakraProvider>
    
  )
  
}

export default App
