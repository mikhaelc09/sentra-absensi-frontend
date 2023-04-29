import { useEffect } from 'react'
import Logo from '../../assets/images/logo_white.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { http } from '../../utils'
  
function CheckToken(){
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get('token')

    const data = {
        token: token
    }

    const checkResetToken = async () => {
        const res = await http.post('/auth/check-reset-token', data)
        
        if(res.status==200){
            navigate(`/reset-password/${res.data.nik}`)
        }
        else{
            navigate('/invalid-token')
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))!=null){
            navigate('/absensi')
        }
        else{
            checkResetToken()
        }
    }, [])

    return(
        <div className='h-screen w-screen relative'>
            <div className="h-1/2 bg-primary flex flex-col">
                <div className="m-auto">
                    <img
                        className="object-cover mx-auto mb-3"
                        style={{ width: "80px" }}
                        src={Logo}
                        alt=""
                    />
                    <p className='text-white font-semibold text-2xl'>ABSENSI</p>
                    <p className='text-white font-semibold text-2xl'>SENTRA MEDIKA <br/> SURABAYA</p>
                </div>
            </div>
            <div className="h-1/2 bg-gray flex flex-col">
                <div className="mx-auto mt-10">
                    <p className='text-lg text-primary'>Anda akan segera dialihkan ke halaman yang sesuai</p>
                    <p className='text-sm text-primary mt-3'>©️ Sentra Medika Surabaya</p>
                </div>
            </div>
        </div>
    )
}

export default CheckToken