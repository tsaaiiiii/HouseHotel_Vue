import axios from 'axios'

// import.meta.env.VITE_API_URL
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    Authorization: import.meta.env.VITE_API_TOKEN
  }
})

request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 404) {
      console.log('Not Found')
    }
    return Promise.reject(error)
  }
)

export default request
