import { useEffect, useState, useContext } from 'react'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router-dom'
import { http } from '../../utils'

import { HiOutlineClock, HiOutlineArrowCircleDown, HiOutlineArrowCircleUp } from 'react-icons/hi'
import Header from "../../components/Header"
import { 
    Button,
    Checkbox,
    FormControl, FormHelperText, Input,
    Card, CardBody,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter,
    useDisclosure
 } from '@chakra-ui/react'
import AbsensiCard from '../../components/AbsensiCard'
import { ToastContext } from '../../context/ToastContext'

function HomePage(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLembur, setIsLembur] = useState(0)
    const [currentTime, setCurrentTime] = useState(DateTime.local())
    const { fireToast } = useContext(ToastContext)

    const [overview, setOverview] = useState({
        jamMasuk: '06:55',
        jamKeluar: '14:09',
        jamKerja: '07:14',
    })
    const [riwayat, setRiwayat] = useState([
        {
            jam: '06:55:00',
            alamat: 'Jalan Tenggilis 135B',
            kota: 'Surabaya',
            status: 1
        },
        {
            jam: '10:15:00',
            alamat: 'Tunjungan Plaza',
            kota: 'Surabaya',
            status: 0
        },
        {
            jam: '14:09:00',
            alamat: 'Jalan Tenggilis 135B',
            kota: 'Surabaya',
            status: 1
        },
    ])

    const fetchOverview = async () => {
        const res = await http.get('/absensi/overview')
        setOverview(res.data.overview)
    }

    const fetchRiwayat = async () => {
        const res = await http.get('/absensi/riwayat')
        setRiwayat(res.data.riwayat)
    }

    const handleCheckboxChange = (e) => {
        const target = e.target;
        if(target.checked){
            setIsLembur(1)
        }
        else{
            setIsLembur(0)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)

        const data = {
            is_lembur: isLembur,
            keterangan: formData.get('keterangan'),
            coord: {
                lat:0,
                lng:0,
            }
        }

        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        data.coord.lng = position.coords.longitude
        data.coord.lat = position.coords.latitude
        console.log(data)

        try{
            const res = await http.post('/absensi', data)
            if(res.status==201){
                fireToast('success', 'Berhasil absen')
                onClose()
                fetchOverview()
                fetchRiwayat()
            }
            else{
                fireToast('error', res.data.message)
            }
        }
        catch(err){
            fireToast('error', err.response.data.message)
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))==null){
            navigate('/')
        }
        else{
            setIsLoggedIn(true)
            fetchOverview()
            fetchRiwayat()
        }

        const interval = setInterval(() => {
            setCurrentTime(DateTime.local());
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return(
        <div className="w-screen h-full min-h-screen bg-gray">
            {
                isLoggedIn &&
                <Header title={currentTime.toFormat('HH:mm:ss')} subtitle={currentTime.setLocale('id-ID').toFormat('cccc, dd MMM yyyy')} />
            }
            <div className="content p-10 text-left">
                <p className="text-xl font-semibold text-primary mb-3">Absensi</p>
                <Card>
                    <CardBody className='flex flex-col'>
                        <div className="flex flex-row gap-x-14 mx-auto">
                            <div className="flex flex-col text-center">
                                <HiOutlineArrowCircleDown className='text-3xl text-primary mx-auto' />
                                <p className="text-2xl font-bold">{overview.jamMasuk}</p>
                                <p className="text-sm text-primary">Absen Masuk</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <HiOutlineArrowCircleUp className='text-3xl text-primary mx-auto' />
                                <p className="text-2xl font-bold">{overview.jamKeluar}</p>
                                <p className="text-sm text-primary">Absen Keluar</p>
                            </div>
                            <div className="flex flex-col text-center">
                                <HiOutlineClock className='text-3xl text-primary mx-auto' />
                                <p className="text-2xl font-bold">{overview.jamKerja}</p>
                                <p className="text-sm text-primary">Jam Kerja</p>
                            </div>
                        </div>
                        <Button colorScheme='primary' className='bg-primary mt-8 w-full' onClick={onOpen}>Absen</Button>
                    </CardBody>
                    
                </Card>
                <p className="text-xl font-semibold text-primary mt-10 mb-3">Riwayat Absensi Hari Ini</p>
                <Card>
                    <CardBody className='flex flex-col gap-y-2'>
                        {
                            riwayat.map((r,index)=>{
                                return(
                                    <AbsensiCard jam={r.jam} alamat={r.alamat} kota={r.kota} status={r.status} key={index} />
                                )
                            })
                        }
                    </CardBody>
                </Card>
                <Button colorScheme='primary' className='bg-primary mt-8 w-full' onClick={()=>{ navigate('/absensi/laporan/periode') }} >Lihat Laporan Absensi Periode Ini</Button>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size={'xs'} isCentered>
                <ModalOverlay className='z-10' />
                <ModalContent>
                    <ModalHeader>Absen</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody className='mb-5'>
                        <form method='post' onSubmit={handleSubmit}>
                            <FormControl>
                                <Input type='text' name='keterangan' _placeholder={'Keterangan absensi'} />
                                <FormHelperText>*hanya isi jika diperlukan</FormHelperText>
                            </FormControl>
                            <Checkbox className='mt-3' name='is_lembur' onChange={handleCheckboxChange}>Lembur</Checkbox>
                            <Button type='submit' colorScheme='primary' className='bg-primary mt-5 w-full'>Absen</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default HomePage