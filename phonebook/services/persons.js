import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'



//get all the database information you are looking for!!!
const getAll = () => {
    const request= axios.get(baseUrl)
    return request.then(response => response.data)

}
//create and post data you want to post now!
const create = newObject => {
    const request= axios.post(baseUrl, newObject)
    return request.then(response => response.data)

}

//Note:



const deleteEntry = (id)=>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}



const update = (id, newObject) => {
    const request= axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)

}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteEntry:deleteEntry
}