import axios from 'axios'

/*
*    json-server --watch -d 180 --host 192.168.1.113 db.json
*/

export const api = axios.create({
    baseURL: 'http://192.168.1.113:3000/',
})