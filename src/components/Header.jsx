import { useState } from "react"
import {
    Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { HiMenuAlt2, HiUserCircle, HiHome, HiDocumentText, HiCalendar, HiLogout } from 'react-icons/hi'

function Header(props){
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <div className="w-screen bg-primary text-white p-5">
            <div className="flex align-top">
                <HiMenuAlt2 className="w-1/8 text-white text-3xl" onClick={onOpen} />
                <div className="w-7/8 ml-3 text-left">
                    <p className="text-lg">Selamat datang,</p>
                    <p className="font-semibold text-xl">{props.user}</p>
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
                    <DrawerCloseButton />
                    <DrawerHeader className="flex py-auto">
                        <HiUserCircle className="text-3xl" />
                        <p className="ml-3">{props.user}</p>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className="flex my-4">
                            <HiHome className="text-3xl" />
                            <p className="ml-3">Beranda</p>
                        </div>
                        <div className="flex my-4">
                            <HiDocumentText className="text-3xl" />
                            <p className="ml-3">Laporan Kehadiran</p>
                        </div>
                        <div className="flex my-4">
                            <HiCalendar className="text-3xl" />
                            <p className="ml-3">Pengajuan Izin</p>
                        </div>
                        <div className="flex my-4">
                            <HiLogout className="text-3xl" />
                            <p className="ml-3">Logout</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default Header