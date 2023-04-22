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
    baseURL:"http://localhost:3000/api",
    headers:{
        'x-auth-token': getCookie('token')
    }
})

export {
    http
}