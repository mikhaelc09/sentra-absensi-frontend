import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Button
} from '@chakra-ui/react'

import Header from "../../components/Header"
import InputPassword from "../../components/InputPassword"

function UbahPass(){
    const navigate = useNavigate()

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            <Header user='MIKHAEL CHRIS' title='Ubah Password' subtitle='' />
            <div className="content p-10 text-left flex flex-col">
                <FormControl className='mb-2'>
                    <FormLabel>Password Lama</FormLabel>
                    <div className="bg-white rounded-lg">
                        <InputPassword />
                    </div>
                </FormControl>
                <FormControl className='mb-2'>
                    <FormLabel>Password Baru</FormLabel>
                    <div className="bg-white rounded-lg">
                        <InputPassword />
                    </div>
                </FormControl>
                <FormControl>
                    <FormLabel>Konfirmasi Password Baru</FormLabel>
                    <div className="bg-white rounded-lg">
                        <InputPassword />
                    </div>
                </FormControl>
                <div className="buttons flex gap-x-2 mt-5">
                    <Button colorScheme="primary" variant='outline' className="w-1/2" onClick={ ()=>{navigate('/profil')} } >Batal</Button>
                    <Button colorScheme="primary" variant='solid' className="bg-primary w-1/2">Ubah</Button>
                </div>
            </div>
        </div>
    )
}

export default UbahPass