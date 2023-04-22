import { useState } from "react"
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
    const [nama, setNama] = useState('Mikhael Chris')
    const [divisi, setDivisi] = useState('Admin')

    const [karyawan, setKaryawan] = useState([
        'Michael Kevin',
        'Alexander Kevin',
        'Ignatius Odi'
    ])

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
    }

    return(
        <div className="w-screen h-full bg-gray">
            <Header user='MIKHAEL CHRIS' title='Pengajuan Izin Cuti' subtitle='' />
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
                                <td className="px-2">{nama}</td>
                            </tr>
                            <tr>
                                <td className="px-2">Divisi</td>
                                <td className="px-1">:</td>
                                <td className="px-2">{divisi}</td>
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
                                        karyawan.map((k,index)=>{
                                            return(
                                                <option value={2} key={index}>{k}</option>
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