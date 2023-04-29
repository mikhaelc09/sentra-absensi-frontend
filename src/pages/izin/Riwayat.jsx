import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { HiPlus } from 'react-icons/hi'

import Header from '../../components/Header'
import IzinCard from '../../components/IzinCard'
import { http } from '../../utils/index'

function RiwayatPage(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [izin, setIzin] = useState([
        {
            id: 1,
            waktu_mulai: '10 Maret 2023',
            waktu_selesai: '10 Maret 2023',
            jenis: 2,
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 3
        },
        {
            id: 2,
            waktu_mulai: '15 Maret 2023',
            waktu_selesai: '17 Maret 2023',
            jenis: 1,
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 2
        },
        {
            id: 3,
            waktu_mulai: '20 Maret 2023',
            waktu_selesai: '20 Maret 2023',
            jenis: 2,
            keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
            status: 1
        },
    ])

    const fetchIzin = async () => {
        const res = await http.get(`/izin`)
        setIzin(res.data.izin)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchIzin()
        }
    }, [])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn &&
                <Header title='Riwayat Pengajuan Izin' subtitle='' />
            }
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
                                <IzinCard key={index} izin={i} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default RiwayatPage