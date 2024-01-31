import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Select } from '@chakra-ui/react'
import { toRupiah } from '../../utils/index'

import Header from '../../components/Header'
import { http } from '../../utils/index'

function SlipGaji(){
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [gaji, setGaji] = useState({
        // hpenggajian: {
        //     id: 1,
        //     nik: 123,
        //     tanggal: '2023-07-01',
        //     total: 1000000,
        // },
        // dpenggajian: [{
        //     id: 1,
        //     id_header: 1,
        //     judul: 'Gaji Pokok',
        //     jumlah: 1,
        //     nominal: 20000000,
        //     subtotal: 2000000
        // }]
    })
    const [totalPenghasilan, setTotalPenghasilan] = useState(0)
    const [totalPotongan, setTotalPotongan] = useState(0)

    const [bulan, setBulan] = useState(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])
    const [tahun, setTahun] = useState([2020, 2021, 2022, 2023, 2024, 2025])

    const date = new Date()
    const [selectedBulan, setSelectedBulan] = useState(date.getMonth()+1)
    const [selectedTahun, setSelectedTahun] = useState(date.getFullYear())
    const [periode, setPeriode] = useState(`26 ${bulan[selectedBulan-2]} - 25 ${bulan[selectedBulan-1]} ${selectedTahun}`)
    
    const fetchGaji = async () => {
        const res = await http.get(`/gaji/slip/${selectedTahun}/${selectedBulan}`)
        setGaji(res.data.gaji)

        res.data.totalPenghasilan ? setTotalPenghasilan(res.data.totalPenghasilan) : setTotalPenghasilan(0)
        res.data.totalPotongan ? setTotalPotongan(res.data.totalPotongan) : setTotalPotongan(0)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchGaji()
            console.log(gaji)
        }
    }, [])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn && 
                <Header title='Slip Gaji' subtitle={`Periode ${periode}`} />
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
                <Card className="nama mt-5 font-medium p-5">
                    <div className='nama font-medium -ml-2 mb-5'>
                        {
                            isLoggedIn && 
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="px-2">Nama</td>
                                        <td className="px-1">:</td>
                                        <td className="px-2">{user.nama}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2">NIK</td>
                                        <td className="px-1">:</td>
                                        <td className="px-2">{user.nik}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2">Divisi</td>
                                        <td className="px-1">:</td>
                                        <td className="px-2">{user.divisi}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                    <hr />
                    <div className="slipgaji mt-5">
                        <table>
                            <tbody>
                                <tr colspan={2}>
                                    <div className="font-bold text-lg">
                                        Penghasilan
                                    </div>
                                </tr>
                                { gaji &&
                                    gaji.dpenggajian.map((detail, idx)=>{
                                        if(detail.nominal > 0){
                                            return(
                                                <tr>
                                                    <td className="py-1 pr-2 align-top max-w-full whitespace-nowrap">{detail.judul}</td>
                                                    <td className="p-1 align-top">:</td>
                                                    <td className="p-1 align-top">{toRupiah(detail.subtotal)}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                <tr className='font-bold'>
                                    <td className="py-1 pr-2 align-top whitespace-nowrap">Total Penghasilan</td>
                                    <td className="p-1 align-top">:</td>
                                    <td className="p-1 align-top">{toRupiah(totalPenghasilan)}</td>
                                </tr>
                                <tr colspan={2}>
                                    <div className="font-bold text-lg mt-5">
                                        Potongan
                                    </div>
                                </tr>
                                {
                                    gaji &&
                                    gaji.dpenggajian.map((detail, idx)=>{
                                        if(detail.nominal <= 0){
                                            return(
                                                <tr>
                                                    <td className="py-1 pr-2 align-top whitespace-nowrap">{detail.judul}</td>
                                                    <td className="p-1 align-top">:</td>
                                                    <td className="p-1 align-top">{toRupiah(detail.subtotal < 0 ? detail.subtotal*-1 : detail.subtotal)}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                                <tr className='font-bold'>
                                    <td className="py-1 pr-2 align-top whitespace-nowrap">Total Potongan</td>
                                    <td className="p-1 align-top">:</td>
                                    <td className="p-1 align-top">{toRupiah(totalPotongan)}</td>
                                </tr>
                                <div className="h-5"></div>
                                <tr className="font-bold text-lg">
                                    <td className="py-1 pr-2 align-top whitespace-nowrap">Penerimaan Bersih</td>
                                    <td className="p-1 align-top">:</td>
                                    <td className="p-1 align-top">{ toRupiah(totalPenghasilan - totalPotongan)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SlipGaji