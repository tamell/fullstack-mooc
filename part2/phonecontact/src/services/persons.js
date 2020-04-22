import React from 'react'
import axios from 'axios'

const baseurl = '/api/persons'

const getAll = () => {
  const req = axios.get(baseurl)
  return req.then(response => response.data)
}
const create = (newObj) => {
    console.log(newObj)
    const request = axios.post(baseurl, newObj)
    return request.then(response => response.data)
}
const delPerson = (personID) => {
    const req = axios.delete(baseurl+'/'+ personID)
    return req.then(response => response.data)
}
const updateObj = (newObj) => {
    const req = axios.put(baseurl+'/'+newObj.id, newObj)
    return req.then(response => response.data)
}
export default {create, getAll, delPerson, updateObj}