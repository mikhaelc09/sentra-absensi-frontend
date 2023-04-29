import { useEffect, useState } from 'react'
import {
    Input,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Card, CardBody,
    Button
} from '@chakra-ui/react'
import Logo from '../../assets/images/logo_white.png'
import InputPassword from '../../components/InputPassword'
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../../utils'
  
function ResetPassPage(){
    const navigate = useNavigate()
    const { nik } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            nik: nik,
            password: formData.get('password'),
            confpass: formData.get('confpass'),
        }
        console.log(data)

        const res = await http.post('/auth/reset-password', data)
        // console.log(res.data)

        if(res.status==200){
            navigate('/')
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            navigate('/absensi')
        }
    })

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
                        <form method='post' onSubmit={handleSubmit}>
                            <FormControl className='mb-2'>
                                <FormLabel>Password Baru</FormLabel>
                                <InputPassword name={'password'} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Konfirmasi Password</FormLabel>
                                <InputPassword name={'confpass'}  />
                            </FormControl>
                            <Button type='submit' colorScheme='primary' className='bg-primary mt-5 w-full'>Reset</Button>
                        </form>
                    </CardBody>
                </Card>
                <p className='text-sm text-primary mt-3'>©️ Sentra Medika Surabaya</p>
            </div>
        </div>
    )
}

export default ResetPassPage