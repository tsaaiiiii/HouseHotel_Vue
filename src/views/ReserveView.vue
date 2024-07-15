<template>
  <div
    class="flex flex-col justify-between lg:h-[100vh] lg:flex-row lg:overflow-hidden"
    id="reserveView"
    @click="reserveFormWindow(false)"
  >
    <LoadingItem :is-loading="isLoading" />
    <RoomCarousel :src="roomInfo" @window-event="reserveFormWindow"></RoomCarousel>
    <div
      class="flex w-full flex-col overflow-scroll px-[40px] pt-[107px] lg:w-[58%] lg:items-start lg:pl-[30px] lg:pr-[128px]"
      @click="reserveFormWindow(false)"
    >
      <RoomInfo v-if="roomInfo.descriptionShort" :room-service="roomInfo" />
      <CalendarItem :booked-date="roomBooked" />
    </div>
  </div>
  <div
    class="absolute left-1/2 top-[130%] z-20 w-[85%] -translate-x-1/2 -translate-y-1/2 bg-transparent sm:top-full sm:w-[75%] md:top-[80%] md:w-[80%] lg:top-[90%] xl:top-1/2"
    v-show="receivedBoolean"
  >
    <ReserveForm
      @window-event="reserveFormWindow"
      v-if="roomInfo.descriptionShort"
      :src="roomInfo"
      :room-service="roomInfo"
      :booked-date="roomBooked"
    >
    </ReserveForm>
  </div>
  <OrderStatus />
</template>
<script setup>
import RoomCarousel from '../components/RoomCarousel.vue'
import RoomInfo from '../components/RoomInfo.vue'
import CalendarItem from '../components/CalendarItem.vue'
import LoadingItem from '../components/LoadingItem.vue'
import ReserveForm from '../components/ReserveForm.vue'
import OrderStatus from '../components/OrderStatus.vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { apiGetRoomInfos } from '@/apis/client.js'

const route = useRoute()
const roomInfo = ref([])
const roomBooked = ref([])
const isLoading = ref(false)
const receivedBoolean = ref()

const reserveFormWindow = (value) => {
  receivedBoolean.value = value
  console.log(receivedBoolean.value)
}

const getRoomInfos = async () => {
  try {
    isLoading.value = true
    const roomId = route.params.id
    const res = await apiGetRoomInfos(roomId)
    roomInfo.value = res.data.room[0]
    roomBooked.value = res.data.booking
    isLoading.value = false
  } catch (err) {
    console.log(err)
  }
}

watch(
  receivedBoolean,
  () => {
    getRoomInfos()
  },
  { immediate: true }
)
</script>
