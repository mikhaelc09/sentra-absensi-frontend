import Logo from '../../assets/images/logo_white.png'
  
function NotFound(){
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
                    <p className='text-2xl font-bold text-primary'>404 NOT FOUND</p>
                    <p className='text-lg text-primary mt-3'>Halaman yang anda cari tidak ada</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound