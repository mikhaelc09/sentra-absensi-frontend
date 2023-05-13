import { Card, CardBody } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

function IzinCard(props){
    const navigate = useNavigate()
    const izin = props.izin

    return(
        <Card className="w-full text-left" onClick={()=>{ navigate(`/izin/${izin.id}`) }}>
            <CardBody>
                <div className="flex w-full">
                    <div className="tanggal my-auto">
                        <p className="font-medium text-lg">
                            {izin.waktu_mulai}{izin.waktu_selesai!=izin.waktu_mulai && (' - '+izin.waktu_selesai)}
                        </p>
                    </div>
                    <div className="badge ml-auto">
                        {
                            izin.jenis==1 && 
                            <p className="bg-rose-100 text-primary font-medium rounded-full px-4 py-1">Cuti</p>
                        }
                        {
                            izin.jenis==2 && 
                            <p className="bg-sky-100 text-primary font-medium rounded-full px-4 py-1">MCU</p>
                        }
                    </div>
                </div>
                <p className="text-slate-500 mb-4 w-5/6">
                    {izin.keterangan}
                </p>
                {
                    izin.status==1 && 
                    <p className="text-primary font-semibold">Menunggu</p>
                }
                {
                    izin.status==2 && 
                    <p className="text-green-700 font-semibold">Disetujui</p>
                }
                {
                    izin.status==3 && 
                    <p className="text-red-700 font-semibold">Ditolak</p>
                }
            </CardBody>
        </Card>
    )
}

export default IzinCard