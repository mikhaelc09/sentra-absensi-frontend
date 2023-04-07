import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    Input, Textarea, Select,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Button,
} from '@chakra-ui/react'

import Header from "../../components/Header"

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

    return(
        <div className="w-screen h-full bg-gray">
            <Header user='MIKHAEL CHRIS' title='Pengajuan Izin Cuti' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <div className="bg-primary px-4 py-1 rounded-full m-auto">
                    <p className="text-white text-center">Sisa cuti Anda tahun ini: {cuti} hari</p>
                </div>
                <div className="nama mt-5 font-medium -ml-2">
                    <table>
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
                    </table>
                </div>
                <div className="forms mt-5">
                    <FormControl className='mb-2'>
                        <FormLabel>Tanggal Mulai</FormLabel>
                        <div className="bg-white rounded-lg">
                            <Input type='date' />
                        </div>
                    </FormControl>
                    <FormControl className='mb-2'>
                        <FormLabel>Tanggal Selesai</FormLabel>
                        <div className="bg-white rounded-lg">
                            <Input type='date' />
                        </div>
                    </FormControl>
                    <FormControl className='mb-2'>
                        <FormLabel>Keterangan</FormLabel>
                        <div className="bg-white rounded-lg">
                            <Textarea />
                        </div>
                    </FormControl>
                    <FormControl className='mb-2'>
                        <FormLabel>Pengganti</FormLabel>
                        <div className="bg-white rounded-lg">
                            <Select>
                                {
                                    karyawan.map((k,index)=>{
                                        return(
                                            <option value="">{k}</option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </FormControl>
                    <div className="buttons flex gap-x-2 mt-5">
                        <Button colorScheme="primary" variant='outline' className="w-1/2" onClick={ ()=>{navigate('/izin')} }>Batal</Button>
                        <Button colorScheme="primary" variant='solid' className="bg-primary w-1/2">Ajukan</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IzinCuti