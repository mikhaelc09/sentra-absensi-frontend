import axios from 'axios'
import Cookies from 'js-cookie'

export const http = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BACKEND ?? "http://localhost:3000/api/v1",
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, X-Requested, Content-Type, Accept Authorization',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'x-auth-token': Cookies.get('token')
    }
})

export const toRupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number)
}