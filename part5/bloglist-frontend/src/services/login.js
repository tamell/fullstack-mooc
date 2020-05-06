import axios from 'axios'

const baseurl = 'localhost:3001/api/login'

const login = async credentials => {
    console.log(credentials)
    const res = await axios.post(baseurl, credentials)
    console.log(res.data)
    return res.data
}

export default { login }