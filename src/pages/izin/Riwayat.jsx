import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'

import Header from '../../components/Header'
import IzinCard from '../../components/IzinCard'

function RiwayatPage(){
    const navigate = useNavigate()
    const [izin, setIzin] = useState([
        {
            tanggalMulai: '10 Maret 2023',
            tanggalSelesai: '10 Maret 2023',
            jenis: 'Cuti',
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 'Ditolak'
        },
        {
            tanggalMulai: '15 Maret 2023',
            tanggalSelesai: '17 Maret 2023',
            jenis: 'MCU',
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 'Disetujui'
        },
        {
            tanggalMulai: '20 Maret 2023',
            tanggalSelesai: '20 Maret 2023',
            jenis: 'Cuti',
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 'Menunggu'
        },
    ])

    return(
        <div className="w-screen h-full bg-gray">
            <Header user='MIKHAEL CHRIS' title='Riwayat Pengajuan Izin' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <Menu className='ml-auto'>
                    <MenuButton as={Button} leftIcon={<HiPlus className='text-white' />} className='bg-primary text-white ml-auto' colorScheme='primary'>
                        Ajukan Izin
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={()=>{ navigate('/izin/mcu') }}>Tugas MCU</MenuItem>
                        <MenuItem onClick={()=>{ navigate('/izin/cuti') }}>Izin Cuti</MenuItem>
                    </MenuList>
                </Menu>
                <div className="mt-5 flex flex-col cards gap-y-3">
                    {
                        izin.map((i, index)=>{
                            return(
                                <IzinCard key={index} tanggalMulai={i.tanggalMulai} tanggalSelesai={i.tanggalSelesai} jenis={i.jenis} keterangan={i.keterangan} status={i.status} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RiwayatPage