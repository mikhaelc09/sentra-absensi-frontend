import { useState } from "react"
import { Card, Select } from '@chakra-ui/react'

import Header from "../../components/Header"

function LaporanTahunan(){
    const [tahun, setTahun] = useState([2020, 2021, 2022, 2023, 2024, 2025])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            <Header title='Laporan Absensi Tahunan' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <div className="flex gap-x-3">
                    <div className="bg-white rounded-lg w-2/3">
                        <Select>
                            <option value='1'>Januari - Juni</option>
                            <option value='1'>Juli - Desember</option>
                        </Select>
                    </div>
                    <div className="bg-white rounded-lg w-1/3">
                        <Select>
                            {
                                tahun.map((t, index)=>{
                                    return(
                                        <option value={t} key={index}>{t}</option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </div>
                <Card>
                    
                </Card>
            </div>
        </div>
    )
}

export default LaporanTahunan