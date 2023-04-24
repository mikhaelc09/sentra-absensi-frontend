import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const { user } = useContext(UserContext)

const http = axios.create({
    withCredentials: true,
    baseURL:"http://localhost:3000/api/v1",
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'x-auth-token': user.token
    }
})

export {
    http
}