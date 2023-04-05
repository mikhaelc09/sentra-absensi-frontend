import { Card, CardBody } from "@chakra-ui/react"

function IzinCard(props){
    return(
        <Card className="w-full text-left">
            <CardBody>
                <div className="flex w-full">
                    <div className="tanggal my-auto">
                        <p className="font-medium text-lg">
                            {props.tanggalMulai}{props.tanggalSelesai!=props.tanggalMulai && (' - '+props.tanggalSelesai)}
                        </p>
                    </div>
                    <div className="badge ml-auto">
                        {
                            props.jenis=='MCU' && 
                            <p className="bg-sky-100 text-primary font-medium rounded-full px-4 py-1">MCU</p>
                        }
                        {
                            props.jenis=='Cuti' && 
                            <p className="bg-rose-100 text-primary font-medium rounded-full px-4 py-1">Cuti</p>
                        }
                    </div>
                </div>
                <p className="text-slate-500 mb-4 w-5/6">
                    {props.keterangan}
                </p>
                {
                    props.status=='Menunggu' && 
                    <p className="text-primary font-semibold">Menunggu</p>
                }
                {
                    props.status=='Disetujui' && 
                    <p className="text-green-700 font-semibold">Disetujui</p>
                }
                {
                    props.status=='Ditolak' && 
                    <p className="text-red-700 font-semibold">Ditolak</p>
                }
            </CardBody>
        </Card>
    )
}

export default IzinCard