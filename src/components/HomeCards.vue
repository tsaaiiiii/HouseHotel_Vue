<template>
  <div class="relative flex flex-wrap overflow-x-auto object-contain md:overflow-hidden">
    <ul
      class="m-0 flex min-w-[550px] max-w-full list-none object-contain p-0 md:max-w-[825px] md:flex-wrap"
    >
      <li
        @click="clickCards(item.id)"
        v-for="item in data"
        :key="item.id"
        class="h-[275px] w-[275px]"
      >
        <div
          class="group absolute h-[275px] w-[275px] cursor-pointer bg-transparent opacity-60 hover:bg-home-green-100"
        >
          <span
            class="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            {{ item.name }}
          </span>
        </div>
        <div class="max-h-full w-[275px] max-w-full">
          <img :src="item.imageUrl" alt="" class="h-[275px] w-full object-cover" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { apiGetAllRoomInfos } from '@/apis/client.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { alertError } from '../alert'

const data = ref([])
const router = useRouter()
// const isLoading = ref(false)
const emit = defineEmits(['loading-event'])

const loadingEvent = (value) => {
  emit('loading-event', value)
}

const getRequest = async () => {
  try {
    // isLoading.value = true
    const res = await apiGetAllRoomInfos()
    data.value = res.data.items
    // isLoading.value = false
    loadingEvent(false)
  } catch (err) {
    alertError(err)
  }
}
onMounted(() => {
  getRequest()
})
// watch(isLoading, (newValue) => {
//   loadingEvent(newValue)
// })

const clickCards = (id) => {
  router.push({ name: 'reserve', params: { id: `${id}` } })
}
</script>

<style></style>
