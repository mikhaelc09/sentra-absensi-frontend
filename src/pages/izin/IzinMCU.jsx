import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
    Input, Textarea,
    FormControl, FormLabel,
    Button,
} from '@chakra-ui/react'
import SignatureCanvas from 'react-signature-canvas'

import Header from "../../components/Header"
import { http } from "../../utils"
import { ToastContext } from '../../context/ToastContext'

function IzinMCU(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const today = new Date().toISOString().split('T')[0]
    const { fireToast } = useContext(ToastContext)
    let sigCanvas = {}

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            waktu_mulai: formData.get('waktu_mulai'),
            waktu_selesai: formData.get('waktu_selesai'),
            keterangan: formData.get('keterangan'),
            lokasi: formData.get('lokasi'),
            jenis: formData.get('jenis')
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
            console.log(err)
            fireToast('error', err.response.data.message)
        }
        
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
        }
    })

    return(
        <div className="w-screen h-full bg-gray">
            {
                isLoggedIn &&
                <Header title='Pengajuan MCU' subtitle='' />
            }
            <div className="content p-10 text-left flex flex-col">
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
                        <input type="hidden" name="jenis" value={2} />
                        <FormControl   FormControl className='mb-2'>
                            <FormLabel>Lokasi MCU</FormLabel>
                            <div className="bg-white rounded-lg">
                                <Input type='text' name="lokasi" required />
                            </div>
                        </FormControl>
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
                                <Textarea name="keterangan" />
                            </div>
                        </FormControl>
                        <FormControl className='mb-2'>
                            <FormLabel>Tanda Tangan Atasan</FormLabel>
                            <div className="bg-white rounded-lg w-72">
                                <SignatureCanvas 
                                    ref={(ref) => { sigCanvas = ref }} 
                                    canvasProps={{width: 280, height: 150}}
                                />
                            </div>
                            <button colorScheme="primary" variants='solid' className='ml-auto mt-2 px-2 py-1 bg-primary text-white' onClick={()=>{sigCanvas.clear()}}>
                                Clear
                            </button>
                        </FormControl>
                        <div className="buttons flex gap-x-2 mt-5">
                            <Button colorScheme="primary" variant='outline' className="w-1/2" onClick={ ()=>{navigate('/izin')} }>Batal</Button>
                            <Button colorScheme="primary" type="submit" variant='solid' className="bg-primary w-1/2">Ajukan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IzinMCU