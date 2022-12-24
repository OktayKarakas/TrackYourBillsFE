import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://temp-bills-api.onrender.com',
})

export default customFetch
