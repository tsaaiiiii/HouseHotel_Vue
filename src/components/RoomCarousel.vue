<template>
  <div v-if="isFullScreen">
    <LoadingItem :isLoading="isLoading" />
    <teleport to="#reserveView">
      <div
        class="absolute left-0 right-0 top-0 z-30 bg-black bg-opacity-50 backdrop-blur-lg"
        @click="toggleFullScreen"
      >
        <div class="container relative mx-auto overflow-hidden">
          <swiper
            :slides-per-view="1"
            :modules="modules"
            speed="1000"
            loop="true"
            :navigation="{ nextEl: '.nextArrow', prevEl: '.prevArrow', clickable: true }"
          >
            <swiper-slide v-for="(url, key) in props.src.imageUrl" :key="key">
              <div class="flex h-[100vh] items-center justify-center">
                <img :src="url" alt="" class="h-[90%] object-cover sm:w-[50%]" @click.stop />
              </div>
            </swiper-slide>
          </swiper>
          <div
            class="prevArrow absolute left-0 top-[50%] z-30 h-[57px] w-[30px] translate-y-[-50%] cursor-pointer"
            @click.stop
          >
            <img src="../assets/images/albumleft.svg" alt="" />
          </div>
          <div
            class="nextArrow absolute right-0 top-[50%] z-30 h-[57px] w-[30px] translate-y-[-50%] cursor-pointer"
            @click.stop
          >
            <img src="../assets/images/albumright.svg" alt="" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
  <div class="relative h-[100vh] w-full text-home-green-100 lg:w-[573px]">
    <swiper
      :slides-per-view="1"
      :modules="modules"
      :loop="true"
      :pagination="{
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false
      }"
      :speed="1000"
      class="h-full"
    >
      <swiper-slide
        v-for="(url, key) in props.src.imageUrl"
        :key="key"
        @click="toggleFullScreen"
        class="h-full"
      >
        <div class="mask"></div>
        <img :src="url" alt="" class="h-full w-full object-cover" />
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
    <div class="pointer-events-none absolute left-0 right-0 top-0 z-10 text-center">
      <button
        type="button"
        @click="backToHome"
        class="pointer-events-auto mb-[449px] ml-[50px] mt-[50px] flex flex-row items-center gap-[10px] sm:ml-[128px] sm:mt-[87px]"
      >
        <img src="../assets/images/backhome.png" alt="" /> 查看其它房型
      </button>
      <div
        v-if="orderDate.totalNight === 0"
        class="flex flex-row items-center justify-center gap-[19px] font-normal"
      >
        <p class="text-[36px]">$ {{ src.normalDayPrice }}</p>
        <p class="text-[20px]">/ 1 晚</p>
      </div>
      <div
        v-if="orderDate.totalNight !== 0"
        class="flex flex-row items-center justify-center gap-[19px] font-normal"
      >
        <p class="text-[36px]">$ {{ checkWeek(src.normalDayPrice, src.holidayPrice) }}</p>
        <p class="text-[20px]">/ {{ orderDate.totalNight }}晚</p>
      </div>
      <button
        type="button"
        class="pointer-events-auto mb-[10px] bg-home-green-100 py-[8.5px] pl-[68.3px] pr-[58.6px] text-xl text-white hover:bg-home-green-50"
        @click.stop="bookingEvents(true)"
      >
        Booking now
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Pagination, Navigation, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useOrderStore } from '@/stores/order.js'
import LoadingItem from '@/components/LoadingItem.vue'

import 'swiper/css'
import 'swiper/css/bundle'

const router = useRouter()
const orderDate = useOrderStore()
const { checkWeek, apiDateFormat } = orderDate
const modules = [Pagination, Navigation, Autoplay]
const emit = defineEmits(['window-event'])
const isLoading = ref(false)

const props = defineProps({
  src: {
    required: true
  }
})
const bookingEvents = (value) => {
  apiDateFormat()
  emit('window-event', value)
}

const isFullScreen = ref(false)

const toggleFullScreen = () => {
  isFullScreen.value = isFullScreen.value ? false : true
}

const backToHome = () => {
  isLoading.value = true
  router.push({ name: 'home' }).then(() => {
    isLoading.value = false
  })
}
</script>
<style>
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  background: transparent linear-gradient(180deg, #ffffff00 0%, #ffffff 100%) 0% 0% no-repeat
    padding-box;
}

.swiper-pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #38470b;
  width: auto;
  margin-bottom: 47px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border: 2px solid #38470b;
  background-color: transparent;
}
.swiper-pagination-bullet-active {
  background-color: #38470b;
}
</style>
