import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

import { apiPostReservation } from '@/apis/client.js'

export const useOrderStore = defineStore('order', () => {
  const today = ref(new Date(new Date().valueOf() + 1000 * 3600 * 24))
  const firstDay = ref(new Date())
  const lastDay = ref(new Date())
  const userInfo = reactive({
    name: '',
    tel: '',
    date: []
  })
  const orderRange = ref({ start: firstDay.value, end: lastDay.value })
  const roomStatus = ref()
  const statusPageActive = ref(false)

  const changeDateFormat = (orderDay) => {
    const date = new Date(orderDay)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }

  const apiDateFormat = () => {
    const pointer = new Date(orderRange.value.start)
    userInfo.date = []
    while (pointer <= new Date(orderRange.value.end)) {
      let dates = changeDateFormat(pointer)
      userInfo.date.push(dates)
      pointer.setDate(pointer.getDate() + 1)
    }
  }

  const totalNight = computed(() => {
    if (orderRange.value === null) {
      return 1
    }
    return Math.floor((orderRange.value.end - orderRange.value.start) / (3600 * 24 * 1000))
  })

  const checkWeek = (normalDayPrice, holidayPrice) => {
    if (orderRange.value === null) {
      return normalDayPrice
    }
    const dayOfWeek = new Date(orderRange.value.start).getDay()
    const total = dayOfWeek + totalNight.value
    let weekdays = 0
    let weekends = 0

    for (let i = dayOfWeek; i < total; i++) {
      let pointer = i % 7
      if (pointer === 5 || pointer === 6) {
        weekends++
      } else {
        weekdays++
      }
    }
    return normalDayPrice * weekdays + holidayPrice * weekends
  }

  const totalPrice = (normalDayPrice, holidayPrice) => {
    return normalDayPrice * checkWeek.value[0] + holidayPrice * checkWeek.value[1]
  }

  const resetOrderRange = () => {
    orderRange.value = null
  }

  const postReservation = async (roomId, userInfo) => {
    try {
      const res = await apiPostReservation(roomId, userInfo)
      roomStatus.value = await res.data.success
      statusPageActive.value = true
    } catch (err) {
      console.log(err)
      roomStatus.value = false
      statusPageActive.value = true
    }
    console.log('roomStatus', roomStatus.value)
  }

  return {
    today,
    orderRange,
    userInfo,
    apiDateFormat,
    totalNight,
    checkWeek,
    totalPrice,
    resetOrderRange,
    postReservation,
    changeDateFormat,
    roomStatus,
    statusPageActive
  }
})
