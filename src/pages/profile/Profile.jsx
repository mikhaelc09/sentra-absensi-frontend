import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import { Card, CardBody, Button } from "@chakra-ui/react"

function ProfilePage(){
    const navigate = useNavigate()

    const [user, setUser] = useState({
        nama: 'Mikhael Chris',
        divisi: 'Admin',
        jabatan: 'Staff Admin',
        nik: '12345',
        email: 'mikhaelc@gmail.com',
        telp: '08123456789',
        alamat: 'Jalan Ngagel Jaya Tengah, Surabaya',
        tglLahir: '1 Januari 1999'
    })

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            <Header user='MIKHAEL CHRIS' title='Profil Saya' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <Card>
                    <CardBody>
                        <table>
                            <tr>
                                <td className="py-2 pr-2">Nama</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.nama}</td>
                            </tr>
                            <tr>
                                <td className="py-2">Divisi</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.divisi}</td>
                            </tr>
                            <tr>
                                <td className="py-2">Jabatan</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.jabatan}</td>
                            </tr>
                            <tr>
                                <td className="py-2">NIK</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.nik}</td>
                            </tr>
                            <tr>
                                <td className="py-2">Email</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.email}</td>
                            </tr>
                            <tr>
                                <td className="py-2">No. Telepon</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.telp}</td>
                            </tr>
                            <tr>
                                <td className="py-2">Alamat</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.alamat}</td>
                            </tr>
                            <tr>
                                <td className="py-2">Tanggal Lahir</td>
                                <td className="p-2">:</td>
                                <td className="p-2">{user.tglLahir}</td>
                            </tr>
                        </table>
                    </CardBody>
                </Card>
                <div className="flex mt-5">
                    <Button colorScheme="primary" className="bg-primary ml-auto" onClick={ ()=>{navigate('/profil/password')} }>Ubah Password</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage