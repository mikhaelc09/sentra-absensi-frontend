import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Input, Textarea, Select,
    FormControl, FormLabel,
    Button,
} from '@chakra-ui/react'
import SignatureCanvas from 'react-signature-canvas'

import Header from "../../components/Header"
import { http } from "../../utils"
import { ToastContext } from '../../context/ToastContext'

function IzinCuti(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [sisaCuti, setSisaCuti] = useState(8)
    const user = JSON.parse(localStorage.getItem('user'))
    const today = new Date().toISOString().split('T')[0]
    const { fireToast } = useContext(ToastContext)
    let sigCanvas = {}

    const [pengganti, setPengganti] = useState([
        // {
        //     nama: 'Michael Kevin',
        //     nik: 2
        // },
        // {
        //     nama: 'Alexander Kevin',
        //     nik: 3
        // },
    ])

    const fetchPengganti = async () => {
        const res = await http.get('/izin/pengganti')
        setPengganti(res.data.karyawan)
    }

    const fetchSisaCuti = async () => {
        const res = await http.get('/izin/sisa-cuti')
        setSisaCuti(res.data.sisa_cuti)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            waktu_mulai: formData.get('waktu_mulai'),
            waktu_selesai: formData.get('waktu_selesai'),
            keterangan: formData.get('keterangan'),
            pengganti: formData.get('pengganti'),
            jenis: formData.get('jenis'),
            ttd: sigCanvas.toDataURL('image/png')
        }

        try{
            const res = await http.post('/izin', data)

            if(res.status==201){
                fireToast('success', 'Berhasil mengajukan izin')
                navigate('/izin')
            }
            else{
                fireToast('error', res.data.message)
            }
        }
        catch(err){
            fireToast('error', err.response.data.message)
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchPengganti()
            fetchSisaCuti()
        }
    })

    return(
        <div className="w-screen h-full bg-gray">
            {
                isLoggedIn && 
                <Header title='Pengajuan Izin Cuti' subtitle='' />
            }
            <div className="content p-10 text-left flex flex-col">
                <div className="bg-primary px-4 py-1 rounded-full m-auto">
                    <p className="text-white text-center">Sisa cuti Anda tahun ini: { sisaCuti } hari</p>
                </div>
                <div className="nama mt-5 font-medium -ml-2">
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
                                    <td className="px-2">Divisi</td>
                                    <td className="px-1">:</td>
                                    <td className="px-2">{user.divisi}</td>
                                </tr>
                            </tbody>
                        </table>
                    }
                </div>
                <div className="forms mt-5">
                    <form method="post" onSubmit={handleSubmit}>
                        <input type="hidden" name="jenis" value={1} />
                        <FormControl className='mb-2'>
                            <FormLabel>Tanggal Mulai</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Input type='date' name="waktu_mulai" min={today} required />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Tanggal Selesai</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Input type='date' name="waktu_selesai" min={today} required />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Keterangan</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Textarea name="keterangan" required />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Pengganti</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Select name="pengganti">
                                    <option value={0}>-</option>
                                    {
                                        pengganti.map((p,index)=>{
                                            return(
                                                <option value={p.nik} key={index}>{p.nama}</option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Tanda Tangan Atasan</FormLabel>
                            <div className="bg-white rounded-lg w-72 mb-3">
                                <SignatureCanvas 
                                    ref={(ref) => { sigCanvas = ref }} 
                                    canvasProps={{width: 280, height: 150}}
                                />
                            </div>
                            <span className='px-2 py-1 bg-primary text-white rounded' onClick={()=>{sigCanvas.clear()}}>
                                Clear
                            </span>
                        </FormControl>
                        <div className="buttons flex gap-x-2 mt-5">
                            <Button colorScheme="primary" variant='outline' className="w-1/2" onClick={ ()=>{navigate('/izin')} }>Batal</Button>
                            <Button colorScheme="primary" variant='solid' type="submit" className="bg-primary w-1/2">Ajukan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IzinCuti