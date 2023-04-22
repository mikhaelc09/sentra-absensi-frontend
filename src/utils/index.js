import axios from 'axios'

const getCookie = (cookieName) => {
    let cookie = {}
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=')
      cookie[key.trim()] = value
    })
    return cookie[cookieName]
}

const http = axios.create({
    baseURL:"http://localhost:3000/api/v1",
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-auth-token': getCookie('token')
    }
})

export {
    http
}