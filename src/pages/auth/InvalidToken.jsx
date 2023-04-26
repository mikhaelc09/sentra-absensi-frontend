import { useState } from 'react'
import {
    Card, CardBody,
    Button
} from '@chakra-ui/react'
import Logo from '../../assets/images/logo_white.png'
import { useNavigate } from 'react-router-dom'
  
function InvalidToken(){
    const navigate = useNavigate()

    return(
        <div className='h-screen w-screen relative'>
            <div className="h-1/2 bg-primary" />
            <div className="h-1/2 bg-gray" />
            <div className="base absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                    className="object-cover mx-auto mb-3"
                    style={{ width: "80px" }}
                    src={Logo}
                    alt=""
                />
                <p className='text-white font-semibold text-2xl'>ABSENSI</p>
                <p className='text-white font-semibold text-2xl'>SENTRA MEDIKA <br/> SURABAYA</p>
                <Card className='mt-4 w-80'>
                    <CardBody>
                        <p className='text-lg text-primary'>Link reset password sudah tidak dapat digunakan. Mohon melakukan permintaan reset password baru.</p>
                        <Button type='submit' colorScheme='primary' className='bg-primary mt-5 w-full' onClick={ ()=>{ navigate('/') } }>Kembali ke Login</Button>
                    </CardBody>
                </Card>
                <p className='text-sm text-primary mt-3'>©️ Sentra Medika Surabaya</p>
            </div>
        </div>
    )
}

export default InvalidToken