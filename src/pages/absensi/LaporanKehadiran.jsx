import { useEffect, useState } from "react"
import { Card, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import Header from "../../components/Header"
import { http } from '../../utils'

function LaporanKehadiran(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [bulan, setBulan] = useState(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])
    const [tahun, setTahun] = useState([])

    const date = new Date()
    const [selectedBulan, setSelectedBulan] = useState(date.getMonth()+1)
    const [selectedTahun, setSelectedTahun] = useState(date.getFullYear())

    const [laporan, setLaporan] = useState([])

    const setTahuns = () => {
        let tahuns = []
        for(let i=2023; i<=date.getFullYear(); i++){
            tahuns.push(i)
        }
        setTahun(tahuns)
    }

    const fetchLaporan = async () => {
        const res = await http.get(`/absensi/laporan/${selectedTahun}/${selectedBulan}`)
        setLaporan(res.data.laporan)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchLaporan()
            setTahuns()
        }
    }, [])

    useEffect(()=>{
        fetchLaporan()
    }, [selectedBulan, selectedTahun])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn &&
                <Header title='Grafik Kehadiran' subtitle={bulan[selectedBulan-1] + ' ' + selectedTahun} />
            }
            <div className="content p-10 text-left flex flex-col">
                <div className="flex gap-x-3">
                    <div className="bg-white rounded-lg w-2/3">
                        <Select name="cmbBulan" onChange={(e)=>{setSelectedBulan(e.target.value)}}>
                            {
                                bulan.map((b, index)=>{
                                    return(
                                        <option value={index+1} key={index} selected={index+1==selectedBulan}>{b}</option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                    <div className="bg-white rounded-lg w-1/3">
                        <Select name="cmbTahun" onChange={(e)=>{setSelectedTahun(e.target.value)}}>
                            {
                                tahun.map((t, index)=>{
                                    return(
                                        <option value={t} key={index} selected={t==selectedTahun}>{t}</option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </div>
                <Card className="p-2 mt-5 overflow-x-scroll">
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
                            { laporan.length > 0 &&
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

export default LaporanKehadiran