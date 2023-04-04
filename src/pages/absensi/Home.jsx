import { useState } from 'react'
import { HiOutlineClock, HiOutlineArrowCircleDown, HiOutlineArrowCircleUp } from 'react-icons/hi'

import Header from "../../components/Header"
import { 
    Button,
    Card, CardBody,
 } from '@chakra-ui/react'
import AbsensiCard from '../../components/AbsensiCard'

function HomePage(){
    const [jamMasuk, setJamMasuk] = useState('06:55')
    const [jamPulang, setJamPulang] = useState('14:09')
    const [jamKerja, setJamKerja] = useState('07:14')
    const [riwayat, setRiwayat] = useState([
        {
            jam: '06:55:00',
            alamat: 'Jalan Tenggilis 135B',
            kota: 'Surabaya',
            valid: true
        },
        {
            jam: '10:15:00',
            alamat: 'Tunjungan Plaza',
            kota: 'Surabaya',
            valid: false
        },
        {
            jam: '14:09:00',
            alamat: 'Jalan Tenggilis 135B',
            kota: 'Surabaya',
            valid: true
        },
    ])

    return(
        <div className="w-screen h-full bg-gray">
            <Header user='MIKHAEL CHRIS' title='14:09:16' subtitle='Senin, 3 April 2023' />
            <div className="content p-10 text-left">
                <p className="text-xl font-semibold text-primary mb-3">Absensi</p>
                <Card>
                    <CardBody className='flex'>
                        <div className="flex flex-row gap-x-10 mx-auto">
                            <div className="flex flex-col text-center">
                                <HiOutlineArrowCircleDown className='text-2xl text-primary mx-auto' />
                                <p className="text-xl font-bold">{jamMasuk}</p>
                                <p className="text-sm text-primary">Absen Masuk</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <HiOutlineArrowCircleUp className='text-2xl text-primary mx-auto' />
                                <p className="text-xl font-bold">{jamPulang}</p>
                                <p className="text-sm text-primary">Absen Keluar</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <HiOutlineClock className='text-2xl text-primary mx-auto' />
                                <p className="text-xl font-bold">{jamKerja}</p>
                                <p className="text-sm text-primary">Jam Kerja</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <p className="text-xl font-semibold text-primary mt-10 mb-3">Riwayat Absensi Hari Ini</p>
                <Card>
                    <CardBody className='flex flex-col gap-y-2'>
                        {
                            riwayat.map((r,index)=>{
                                return(
                                    <AbsensiCard jam={r.jam} alamat={r.alamat} kota={r.kota} valid={r.valid} key={index} />
                                )
                            })
                        }
                    </CardBody>
                </Card>
                <Button colorScheme='primary' className='bg-primary mt-8 w-full'>Lihat Laporan Absensi Periode Ini</Button>
            </div>
        </div>
    )
}

export default HomePage