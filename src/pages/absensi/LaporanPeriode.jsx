import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Header from "../../components/Header"
import { Table, Thead, Tbody, Tr, Th, Td, Card, CardBody } from "@chakra-ui/react"
import { http } from '../../utils'

function LaporanPeriode(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [laporan, setLaporan] = useState([
        {
            tanggal: 'Senin, 3 April 2023',
            absen_masuk: '06:55',
            absen_keluar: '14:15',
            jam_kerja: '07:00',
            waktu_kurang: '00:00',
            waktu_lebih: '00:20',
        },
        {
            tanggal: 'Selasa, 4 April 2023',
            absen_masuk: '07:00',
            absen_keluar: '14:05',
            jam_kerja: '07:00',
            waktu_kurang: '00:00',
            waktu_lebih: '00:05',
        },
        {
            tanggal: 'Rabu, 5 April 2023',
            absen_masuk: '07:10',
            absen_keluar: '14:15',
            jam_kerja: '06:50',
            waktu_kurang: '00:10',
            waktu_lebih: '00:15',
        },
    ])

    const fetchLaporan = async () => {
        const res = await http.get('/absensi/laporan/periode')
        setLaporan(res.data.laporan)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchLaporan()
        }
    }, [])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn && 
                <Header title='Laporan Absensi' subtitle='Periode 26 Maret - 25 April 2023' />
            }
            <div className="content p-10 text-left flex flex-col">
                <Card className="p-2">
                    <Table className="w-full">
                        <Thead>
                            <Tr>
                                <Th className="w-1/5 align-middle text-center">Tanggal</Th>
                                <Th className="w-1/5 align-middle text-center">Absensi</Th>
                                <Th className="w-1/5 align-middle text-center">Jam Kerja</Th>
                                <Th className="w-1/5 align-middle text-center">Waktu Kurang</Th>
                                <Th className="w-1/5 align-middle text-center">Waktu Lebih</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                laporan.map((a, index) => {
                                    return(
                                        <>
                                            <Tr>
                                                <Td rowSpan='2' className="align-middle text-center w-1/5">{a.tanggal}</Td>
                                                <Td className="w-1/5 text-center align-middle">{a.absen_masuk}</Td>
                                                <Td rowSpan='2' className="align-middle text-center w-1/5">{a.jam_kerja}</Td>
                                                <Td rowSpan='2' className="align-middle text-center w-1/5">{a.waktu_kurang}</Td>
                                                <Td rowSpan='2' className="align-middle text-center w-1/5">{a.waktu_lebih}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>{a.absen_keluar}</Td>
                                            </Tr>
                                        </>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </Card>
            </div>
        </div>
    )
}

export default LaporanPeriode