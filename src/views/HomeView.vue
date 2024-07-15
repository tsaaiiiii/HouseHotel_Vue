<template>
  <div>
    <LoadingItem :isLoading="isLoading" @loading-event="loadingEvent" />
  </div>

  <div class="relative">
    <HomeCarousel />

    <div
      class="absolute left-1/2 top-1/2 z-10 flex h-auto w-full -translate-x-1/2 -translate-y-1/2 flex-wrap items-center md:px-6 lg:px-24 xl:px-0"
    >
      <div class="block w-full items-center justify-center sm:block md:flex md:gap-6 lg:gap-32">
        <div class="flex items-center justify-center gap-8 py-10 md:block md:py-0">
          <img
            src="@/assets/images/logo.svg"
            alt=""
            class="md:w-100% sm:max-w-100% md:mb-48 md:max-w-none"
          />
          <div class="inline-block text-xs text-white">
            <p class="mb-4">好室旅店。HOUSE HOTEL</p>
            <p class="mb-1.5 font-light">花蓮縣花蓮市國聯一路1號</p>
            <p class="mb-1.5 font-light">03-8321155</p>
            <p class="font-light">HOUSE@HOTEL.COM</p>
          </div>
        </div>
        <HomeCards>
          <!-- <p>Loading 狀態：{{ isLoading }}</p> -->
        </HomeCards>
      </div>
    </div>
  </div>
</template>

<script setup>
import HomeCards from '@/components/HomeCards.vue'
import HomeCarousel from '@/components/HomeCarousel.vue'
import LoadingItem from '@/components/LoadingItem.vue'
// import { ref } from 'vue'

// const isLoading = ref()

// const handleLoadingEvent = (value) => {
//   isLoading.value = value
// }
</script>
<style>
.relative::-webkit-scrollbar {
  display: none;
}
</style>
