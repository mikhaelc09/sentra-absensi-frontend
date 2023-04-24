import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody } from '@chakra-ui/react'

import Header from '../../components/Header'
import { http } from '../../utils/index'

function DetailIzinPage(){
    const navigate = useNavigate()
    const { id_izin } = useParams()
    const [izin, setIzin] = useState({
        id: 1,
        waktu_mulai: '10 Maret 2023',
        waktu_selesai: '10 Maret 2023',
        jenis: 'Cuti',
        keterangan: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, ipsa.',
        status: 'Ditolak',
        pengganti: 'Michael Kevin',
        lokasi: null
    })

    const fetchIzin = async () => {
        const res = await http.get(`/izin/${id_izin}`)
        setIzin(res.data.izin)
    }

    // useEffect(() => {
    //     fetchIzin()
    // }, [])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            <Header title={`Detail Izin ${izin.jenis}`} subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <Card>
                    <CardBody>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="py-2 pr-2 align-top max-w-full whitespace-nowrap">Tanggal Mulai</td>
                                    <td className="p-2 align-top">:</td>
                                    <td className="p-2 align-top">{izin.waktu_mulai}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 align-top max-w-full whitespace-nowrap">Tanggal Selesai</td>
                                    <td className="p-2 align-top">:</td>
                                    <td className="p-2 align-top">{izin.waktu_selesai}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 align-top max-w-full whitespace-nowrap">Keterangan</td>
                                    <td className="p-2 align-top">:</td>
                                    <td className="p-2 align-top">{izin.keterangan}</td>
                                </tr>
                                {
                                    izin.pengganti!=null && 
                                    <tr>
                                        <td className="py-2 align-top max-w-full whitespace-nowrap">Pengganti</td>
                                        <td className="p-2 align-top">:</td>
                                        <td className="p-2 align-top">{izin.pengganti}</td>
                                    </tr>
                                }
                                {
                                    izin.lokasi!=null && 
                                    <tr>
                                        <td className="py-2 align-top max-w-full whitespace-nowrap">Lokasi</td>
                                        <td className="p-2 align-top">:</td>
                                        <td className="p-2 align-top">{izin.lokasi}</td>
                                    </tr>
                                }
                                <tr>
                                    <td className="py-2 align-top max-w-full whitespace-nowrap">Status</td>
                                    <td className="p-2 align-top">:</td>
                                    <td className="p-2 align-top">{izin.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default DetailIzinPage