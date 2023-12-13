import { useEffect, useState } from "react"
import { Card, Select } from '@chakra-ui/react'
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Header from "../../components/Header"
import { http } from '../../utils'

function LaporanKehadiranOld(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [bulan, setBulan] = useState(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])
    const [tahun, setTahun] = useState([2020, 2021, 2022, 2023, 2024, 2025])

    const date = new Date()
    const [selectedBulan, setSelectedBulan] = useState(date.getMonth()+1)
    const [selectedTahun, setSelectedTahun] = useState(date.getFullYear())

    const [laporan, setLaporan] = useState([])
    const [labels, setLabels] = useState([])

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
    )

    const fetchLaporan = async () => {
        const res = await http.get(`/absensi/laporan/${selectedTahun}/${selectedBulan}`)
        setLaporan(res.data.laporan)
        setLabels(res.data.labels)
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
                <Card className="mt-10 p-10 w-full h-96">
                    {
                        laporan && (
                        <Line 
                            datasetIdKey="id" 
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    title: {
                                        display: true,
                                        text: `Grafik Kehadiran ${bulan[selectedBulan-1]}`,
                                    },
                                },
                            }} 
                            data={{
                                labels: labels,
                                datasets: [{
                                    fill: true,
                                    label: 'Persentase Kehadiran',
                                    data: laporan,
                                    lineTension: 0.4,
                                    borderColor: 'rgb(53, 162, 235)',
                                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    borderWidth: 1
                                }],
                            }} 
                        />)
                    }
                </Card>
            </div>
        </div>
    )
}

export default LaporanKehadiranOld