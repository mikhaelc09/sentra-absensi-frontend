import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Button
} from '@chakra-ui/react'

import Header from "../../components/Header"
import InputPassword from "../../components/InputPassword"
import { http } from "../../utils"

function UbahPass(){
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            oldpass: formData.get('oldpass'),
            newpass: formData.get('newpass'),
            confpass: formData.get('confpass'),
        }
        console.log(data)

        navigate('/profil')

        const res = await http.post('/profile/change-password', data)
        console.log(res.data)

        if(res.status==200){
            navigate('/profil')
        }
    }

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
        }
    })

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn && 
                <Header title='Ubah Password' subtitle='' />
            }
            <div className="content p-10 text-left flex flex-col">
                <form method="post" onSubmit={handleSubmit}>
                    <FormControl className='mb-2'>
                        <FormLabel>Password Lama</FormLabel>
                        <div className="bg-white rounded-lg">
                            <InputPassword name={'oldpass'} />
                        </div>
                    </FormControl>
                    <FormControl className='mb-2'>
                        <FormLabel>Password Baru</FormLabel>
                        <div className="bg-white rounded-lg">
                            <InputPassword name={'newpass'} />
                        </div>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <div className="bg-white rounded-lg">
                            <InputPassword name={'confpass'} />
                        </div>
                    </FormControl>
                    <div className="buttons flex gap-x-2 mt-5">
                        <Button colorScheme="primary" variant='outline' className="w-1/2" onClick={ ()=>{navigate('/profil')} } >Batal</Button>
                        <Button type="submit" colorScheme="primary" variant='solid' className="bg-primary w-1/2">Ubah</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UbahPass