import axios from 'axios'
const local = 'http://localhost:5000'
const production = 'https://multi-vendor-backend-lywh.onrender.com'

let api_url = local
let node = 'pro'

if (node === 'pro') {
    api_url = production

}else{
    api_url = local
}


const api = axios.create({
   baseURL: `${api_url}/api`,
   withCredentials: true
})
export default api