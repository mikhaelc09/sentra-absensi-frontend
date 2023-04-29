import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Input, Textarea, Select,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Button,
} from '@chakra-ui/react'

import Header from "../../components/Header"
import { http } from "../../utils"

function IzinCuti(){
    const navigate = useNavigate()
    const [cuti, setCuti] = useState(8)
    const user = JSON.parse(localStorage.getItem('user'))

    const [pengganti, setPengganti] = useState([
        {
            nama: 'Michael Kevin',
            nik: 2
        },
        {
            nama: 'Alexander Kevin',
            nik: 3
        },
    ])

    const fetchPengganti = async () => {
        const res = await http.get('/izin/pengganti')
        console.log(res)
        setPengganti(res.data.karyawan)
    }

    useEffect(() => {
        fetchPengganti()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            waktu_mulai: formData.get('waktu_mulai'),
            waktu_selesai: formData.get('waktu_selesai'),
            keterangan: formData.get('keterangan'),
            pengganti: formData.get('pengganti'),
            jenis: formData.get('jenis')
        }
        console.log(data)

        const res = await http.post('/izin', data)
        console.log(res.data.izin)

        if(res.status==201){
            navigate('/izin')
        }
    }

    return(
        <div className="w-screen h-full bg-gray">
            <Header title='Pengajuan Izin Cuti' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <div className="bg-primary px-4 py-1 rounded-full m-auto">
                    <p className="text-white text-center">Sisa cuti Anda tahun ini: {cuti} hari</p>
                </div>
                <div className="nama mt-5 font-medium -ml-2">
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
                </div>
                <div className="forms mt-5">
                    <form method="post" onSubmit={handleSubmit}>
                        <input type="hidden" name="jenis" value={1} />
                        <FormControl className='mb-2'>
                            <FormLabel>Tanggal Mulai</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Input type='date' name="waktu_mulai" />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Tanggal Selesai</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Input type='date' name="waktu_selesai" />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Keterangan</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Textarea name="keterangan" />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Pengganti</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Select name="pengganti">
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