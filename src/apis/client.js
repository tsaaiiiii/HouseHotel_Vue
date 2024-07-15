import request from './request.js'

const apiGetAllRoomInfos = () => {
  return request.get('rooms')
}
const apiGetRoomInfos = (id) => {
  return request.get(`room/${id}`)
}
const apiPostReservation = (id, info) => {
  return request.post(`room/${id}`, info)
}
const apiDeleteAll = () => {
  return request.delete('rooms')
}

export { apiGetAllRoomInfos, apiGetRoomInfos, apiPostReservation, apiDeleteAll }
