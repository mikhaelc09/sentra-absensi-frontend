import {
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { HiMenuAlt2, HiUserCircle, HiHome, HiDocumentText, HiCalendar, HiLogout } from 'react-icons/hi'
import { RiBillFill } from 'react-icons/ri'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { http } from '../utils'

function Header(props){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('user'))

    const logout = async () => {
        await http.post('/auth/logout')
        localStorage.clear()
        navigate('/')
    }

    return(
        <div className="w-screen bg-primary text-white p-5">
            <div className="flex align-top">
                <HiMenuAlt2 className="w-1/8 text-white text-3xl" onClick={onOpen} />
                <div className="w-7/8 ml-3 text-left">
                    <p className="text-lg">Selamat datang,</p>
                    <p className="font-semibold text-xl">{user.nama}</p>
                </div>
            </div>
            <div className="h-24 mt-3 flex flex-col">
                <div className="my-auto">
                    <p className="font-semibold text-2xl">{props.title}</p>
                    <p className="font-medium text-lg">{props.subtitle}</p>
                </div>
                
            </div>
            <Drawer onClose={onClose} isOpen={isOpen} size={'xs'} placement='left' className='bg-primary text-white'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton className="text-white" />
                    <DrawerHeader className="flex py-auto bg-primary text-white hover:cursor-pointer" onClick={ ()=>{ navigate('/profil') } }>
                        <HiUserCircle className="text-3xl" />
                        <p className="ml-3">{user.nama}</p>
                    </DrawerHeader>
                    <DrawerBody className="bg-primary text-white">
                        <div className="flex my-4 hover:cursor-pointer" onClick={ ()=>{ navigate('/absensi') } }>
                            <HiHome className="text-3xl" />
                            <p className="ml-3 my-auto">Beranda</p>
                        </div>
                        <div className="flex my-4 hover:cursor-pointer" onClick={ ()=>{ navigate('/absensi/laporan/kehadiran') } }>
                            <HiDocumentText className="text-3xl" />
                            <p className="ml-3 my-auto">Laporan Kehadiran</p>
                        </div>
                        <div className="flex my-4 hover:cursor-pointer" onClick={ ()=>{ navigate('/izin') } }>
                            <HiCalendar className="text-3xl" />
                            <p className="ml-3 my-auto">Pengajuan Izin</p>
                        </div>
                        {/* <div className="flex my-4 hover:cursor-pointer" onClick={ ()=>{ navigate('/') } }>
                            <RiBillFill className="text-3xl" />
                            <p className="ml-3 my-auto">Slip Gaji</p>
                        </div> */}
                        <div className="flex my-4 hover:cursor-pointer" onClick={ logout }>
                            <HiLogout className="text-3xl" />
                            <p className="ml-3 my-auto">Logout</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Header