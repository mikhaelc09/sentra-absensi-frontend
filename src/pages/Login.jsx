import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {
    Input,
    FormControl, FormLabel, FormErrorMessage, FormHelperText,
    Card, CardBody,
    Button,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter,
    useDisclosure
} from '@chakra-ui/react'
import Logo from '../assets/images/logo_white.png'
  
function LoginPage(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const login = () => {
        navigate('/absensi')
    }

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
                        <p className='text-2xl text-primary font-medium mb-5'>Login</p>
                        <FormControl className='mb-2'>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' />
                            <FormHelperText 
                                className='text-right' 
                                onClick={onOpen}
                            >Lupa password?</FormHelperText>
                        </FormControl>
                        <Button colorScheme='primary' className='bg-primary mt-5 w-full' onClick={login}>Login</Button>
                    </CardBody>
                </Card>
                <p className='text-sm text-primary mt-3'>©️ Sentra Medika Surabaya</p>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size={'xs'} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Lupa Password?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='mb-5'>
                        <FormControl>
                            <Input type='email' _placeholder={'Masukkan email'} />
                            <FormHelperText>Link reset password akan dikirimkan ke email yang diberikan</FormHelperText>
                        </FormControl>
                        <Button colorScheme='primary' className='bg-primary mt-5 w-full'>Kirim Email</Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LoginPage