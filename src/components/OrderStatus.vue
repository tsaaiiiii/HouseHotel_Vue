<template>
  <teleport to="#reserveView">
    <div
      class="fixed left-0 right-0 top-0 z-50 flex h-[100vh] cursor-pointer flex-row justify-center bg-white bg-opacity-20 px-[30px] py-[60px] backdrop-blur-md md:px-[128px] md:py-[84px]"
      @click="isActive"
      v-if="statusPageActive"
    >
      <div
        class="relative mx-auto flex flex-grow cursor-default flex-col items-center justify-center gap-[41px] bg-home-green-100 px-[20px] text-white"
        @click.stop
      >
        <button type="button" @click="isActive" class="absolute right-[38.86px] top-[38.86px]">
          <img src="@/assets/images/icons8-cancel-white.png" alt="" />
        </button>
        <div>
          <slot name="status-icon">
            <img :src="renderData.img" alt="" />
          </slot>
        </div>
        <h3>
          <slot name="status-header">{{ renderData.header }}</slot>
        </h3>
        <p class="text-center text-[18px] font-light md:w-[468px]">
          <slot name="status-content">{{ renderData.content }}</slot>
        </p>
      </div>
    </div>
  </teleport>
</template>
<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useOrderStore } from '../stores/order'
const orderStatus = useOrderStore()
const { statusPageActive, roomStatus } = storeToRefs(orderStatus)

const statusData = {
  true: {
    img: '/src/assets/images/amenities/icon_booking_success.svg',
    header: '預約成功',
    content: '請留意簡訊發送訂房通知，入住當日務必出示此訂房通知， 若未收到簡訊請來電確認，謝謝您'
  },
  false: {
    img: '/src/assets/images/amenities/icon_booking_fail.svg',
    header: '預約失敗',
    content: '哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧'
  }
}
const renderData = ref(statusData.false)

const isActive = () => {
  statusPageActive.value = !statusPageActive.value
}

watch(
  roomStatus,
  (newValue) => {
    renderData.value = statusData[newValue]
  },
  { immediate: true }
)
</script>
<style></style>
