import { useState } from 'react'
import {
    Input,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Card, CardBody,
    Button
} from '@chakra-ui/react'
import Logo from '../assets/images/logo_white.png'
  
function ResetPassPage(){
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
                        <p className='text-2xl text-primary font-medium mb-5'>Reset Password</p>
                        <FormControl className='mb-2'>
                            <FormLabel>Password Baru</FormLabel>
                            <Input type='password' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Konfirmasi Password</FormLabel>
                            <Input type='password' />
                        </FormControl>
                        <Button colorScheme='primary' className='bg-primary mt-5 w-full'>Login</Button>
                    </CardBody>
                </Card>
                <p className='text-sm text-primary mt-3'>©️ Sentra Medika Surabaya</p>
            </div>
        </div>
    )
}

export default ResetPassPage