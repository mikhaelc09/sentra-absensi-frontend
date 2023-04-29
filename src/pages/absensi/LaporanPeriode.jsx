import { useEffect, useState } from "react"

import Header from "../../components/Header"
import { Table, Thead, Tbody, Tr, Th, Td, Card, CardBody } from "@chakra-ui/react"

function LaporanPeriode(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [absensi, setAbsensi] = useState([
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

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
        }
    })

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
                            <div>
                                <Tr>
                                    <Th className="w-1/5 align-middle">Tanggal</Th>
                                    <Th className="w-1/5 align-middle">Absensi</Th>
                                    <Th className="w-1/5 align-middle">Jam Kerja</Th>
                                    <Th className="w-1/5 align-middle">Waktu Kurang</Th>
                                    <Th className="w-1/5 align-middle">Waktu Lebih</Th>
                                </Tr>
                            </div>
                        </Thead>
                        <Tbody>
                            {
                                absensi.map((a, index) => {
                                    return(
                                        <div>
                                            <Tr key={index}>
                                                <Td rowspan='2' className="align-middle w-1/5">{a.tanggal}</Td>
                                                <Td className="w-1/5 text-center align-middle">{a.absen_masuk}</Td>
                                                <Td rowspan='2' className="align-middle w-1/5">{a.jam_kerja}</Td>
                                                <Td rowspan='2' className="align-middle w-1/5">{a.waktu_kurang}</Td>
                                                <Td rowspan='2' className="align-middle w-1/5">{a.waktu_lebih}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>{a.absen_keluar}</Td>
                                            </Tr>
                                        </div>
                                        
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