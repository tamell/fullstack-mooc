import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('Going to send blog to api')
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const putblog = async(newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(baseUrl+'/'+newObject.id, newObject, config)
  return response.data
}
export default { getAll, setToken, create, putblog }