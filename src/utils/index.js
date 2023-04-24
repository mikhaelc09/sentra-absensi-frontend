import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
    withCredentials: true,
    baseURL:"http://localhost:3000/api/v1",
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'x-auth-token': Cookies.get('token')
    }
})

export {
    http
}