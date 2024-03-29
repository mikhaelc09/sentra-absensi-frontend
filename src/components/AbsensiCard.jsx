import { useState } from "react"
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi"

function AbsensiCard(props){
    return(
        <div className="w-full p-3 bg-sky-100 rounded flex">
            <div className="text w-5/6 my-auto">
                <p className="text-lg font-medium mb-2">{props.jam}</p>
                <p className="font-medium">{props.alamat}</p>
                <p className="font-medium">{props.kota}</p>
            </div>
            <div className="icon w-1/6 my-auto ml-auto">
                {
                    props.status==1 && <HiOutlineCheckCircle className='text-3xl text-green-700' /> ||
                    props.status==0 && <HiOutlineXCircle className='text-3xl text-red-700' />
                }
            </div>
        </div>
    )
}

export default AbsensiCard