<template>
  <div>
    <swiper
      :modules="modules"
      :loop="true"
      :slides-per-view="1"
      :space-between="50"
      :autoplay="{ delay: 4000, disableOnInteraction: false }"
      :navigation="navigation"
      :pagination="{ el: '.my-pagination', type: 'bullets', clickable: true }"
      :scrollbar="{ draggable: false }"
      class="h-[100vh] md:h-[135vh] xl:h-[100vh]"
    >
      <swiper-slide
        class="bg-[url('@/assets/images/house/homeCarouselFirst.jpeg')] bg-cover bg-no-repeat"
      ></swiper-slide>
      <swiper-slide
        class="bg-[url('@/assets/images/house/homeCarouselSecond.jpeg')] bg-cover bg-center bg-no-repeat"
      ></swiper-slide>
      <swiper-slide
        class="bg-[url('@/assets/images/house/homeCarouselThird.jpeg')] bg-cover bg-no-repeat"
      ></swiper-slide>
      <swiper-slide
        class="bg-[url('@/assets/images/house/homeCarouselFourth.jpeg')] bg-cover bg-no-repeat"
      ></swiper-slide>
      <div class="my-pagination home-carousel"></div>
      <div
        class="pointer-events-none absolute top-0 z-10 h-[100vh] w-full bg-black opacity-60 md:h-[160vh] lg:h-[135vh] xl:h-[100vh]"
      ></div>
    </swiper>
  </div>
</template>

<script setup>
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/bundle'

const navigation = ref({
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
})
const modules = [Autoplay, Pagination, Navigation, Scrollbar]
</script>

<style>
.my-pagination {
  position: absolute;
  transform: translate(200px, -20px);
  z-index: 999;

  @media screen and (min-width: 768px) {
    transform: translate(60px, -20px);
  }
  @media screen and (min-width: 1024px) {
    transform: translate(120px, -50px);
  }
  @media screen and (min-width: 1280px) {
    transform: translate(200px, -20px);
  }
}

.my-pagination span {
  border-color: #fff;
  width: 12px;
  height: 12px;
}

.my-pagination span.swiper-pagination-bullet-active {
  background-color: #fff;
  width: 12px;
  height: 12px;
}
</style>
